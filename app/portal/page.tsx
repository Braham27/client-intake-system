"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Calendar, Clock, CheckCircle, AlertCircle, Loader2, Mail, ShieldCheck, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface IntakeFormData {
  id: string;
  status: string;
  currentStep: number;
  businessName: string | null;
  resumeToken: string;
  createdAt: string;
  submittedAt: string | null;
  estimatedQuote: number | null;
}

interface ConsultationData {
  id: string;
  scheduledDate: string;
  status: string;
  meetingType: string;
  meetingLink: string | null;
  duration: number;
}

interface ClientData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string | null;
  intakeForms: IntakeFormData[];
  consultations: ConsultationData[];
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    draft: "bg-gray-100 text-gray-800",
    submitted: "bg-blue-100 text-blue-800",
    reviewed: "bg-purple-100 text-purple-800",
    approved: "bg-green-100 text-green-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    scheduled: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
    no_show: "bg-gray-100 text-gray-800",
  };

  const statusLabels: Record<string, string> = {
    draft: "Draft",
    submitted: "Submitted",
    reviewed: "Under Review",
    approved: "Approved",
    in_progress: "In Progress",
    completed: "Completed",
    scheduled: "Scheduled",
    cancelled: "Cancelled",
    no_show: "No Show",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || statusStyles.draft}`}>
      {statusLabels[status] || status}
    </span>
  );
}

type Step = "email" | "verify" | "dashboard";

export default function ClientPortalPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientData, setClientData] = useState<ClientData | null>(null);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action: "request" }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to find your records. Please check your email address.");
        return;
      }

      setStep("verify");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim() || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit verification code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Verify the code
      const verifyResponse = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode, action: "verify" }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        setError(verifyData.error || "Invalid verification code");
        return;
      }

      // Fetch client data
      const dataResponse = await fetch(`/api/portal?email=${encodeURIComponent(email)}&token=${verifyData.sessionToken}`);
      const clientDataResult = await dataResponse.json();

      if (!dataResponse.ok) {
        setError(clientDataResult.error || "Failed to load your data");
        return;
      }

      setClientData(clientDataResult);
      setStep("dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");
    setVerificationCode("");

    try {
      const response = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action: "request" }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to resend code");
        return;
      }

      alert("A new verification code has been sent to your email.");
    } catch {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <Link href="/" className="text-xl font-bold gradient-text">
              WebCraft
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Secure Client Portal</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {step === "email" && "Enter your email to access your project status and consultation history."}
            {step === "verify" && "Check your email for a verification code to continue."}
            {step === "dashboard" && "View your project status, intake forms, and upcoming consultations."}
          </p>
        </div>
      </section>

      {/* Email Step */}
      {step === "email" && (
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-md">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Enter Your Email
                </CardTitle>
                <CardDescription>
                  We&apos;ll send you a secure verification code to access your portal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRequestCode} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-destructive flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </p>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending Code...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Verification Code
                      </>
                    )}
                  </Button>
                </form>
            </CardContent>
          </Card>
        </div>
      </section>
      )}

      {/* Verification Step */}
      {step === "verify" && (
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-md">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <KeyRound className="h-5 w-5" />
                  Enter Verification Code
                </CardTitle>
                <CardDescription>
                  We sent a 6-digit code to <strong>{email}</strong>. Check your inbox (and spam folder).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="000000"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      disabled={isLoading}
                      className="text-center text-2xl tracking-widest"
                      maxLength={6}
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-destructive flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </p>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading || verificationCode.length !== 6}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Verify & Access Portal
                      </>
                    )}
                  </Button>
                  <div className="flex items-center justify-between text-sm">
                    <button
                      type="button"
                      onClick={() => setStep("email")}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ← Use different email
                    </button>
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={isLoading}
                      className="text-primary hover:underline"
                    >
                      Resend code
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <p className="text-center text-muted-foreground text-sm mt-6">
              Code expires in 10 minutes for your security.
            </p>
          </div>
        </section>
      )}

      {/* Dashboard Results */}
      {step === "dashboard" && clientData && (
        <section className="py-8 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Welcome */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {clientData.firstName}!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s an overview of your projects and consultations with WebCraft.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Intake Forms */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Intake Forms
                  </CardTitle>
                  <CardDescription>
                    Your project questionnaires
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {clientData.intakeForms.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">No intake forms found.</p>
                      <Button asChild size="sm">
                        <Link href="/intake">Start New Project</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {clientData.intakeForms.map((form) => (
                        <div key={form.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium">
                                {form.businessName || "Untitled Project"}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Started {formatDate(form.createdAt)}
                              </p>
                            </div>
                            <StatusBadge status={form.status} />
                          </div>
                          
                          {form.status === "draft" && (
                            <div className="mt-3">
                              <p className="text-sm text-muted-foreground mb-2">
                                Step {form.currentStep} of 11
                              </p>
                              <div className="w-full bg-muted rounded-full h-2 mb-3">
                                <div 
                                  className="bg-primary rounded-full h-2 transition-all" 
                                  style={{ width: `${(form.currentStep / 11) * 100}%` }}
                                />
                              </div>
                              <Button asChild size="sm" variant="outline" className="w-full">
                                <Link href={`/intake?resume=${form.resumeToken}`}>
                                  Continue Form
                                </Link>
                              </Button>
                            </div>
                          )}
                          
                          {form.status === "submitted" && form.submittedAt && (
                            <p className="text-sm text-muted-foreground mt-2">
                              Submitted on {formatDate(form.submittedAt)}
                            </p>
                          )}
                          
                          {form.estimatedQuote && (
                            <p className="text-sm font-medium text-primary mt-2">
                              Estimated Quote: ${form.estimatedQuote.toLocaleString()}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Consultations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Consultations
                  </CardTitle>
                  <CardDescription>
                    Your scheduled meetings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {clientData.consultations.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">No consultations scheduled.</p>
                      <Button asChild size="sm">
                        <Link href="/schedule">Book a Call</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {clientData.consultations.map((consultation) => {
                        const isUpcoming = new Date(consultation.scheduledDate) > new Date();
                        return (
                          <div key={consultation.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium flex items-center gap-2">
                                  {isUpcoming ? (
                                    <Clock className="h-4 w-4 text-blue-500" />
                                  ) : (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  )}
                                  {consultation.meetingType === "video" ? "Video Call" : "Phone Call"}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {formatDateTime(consultation.scheduledDate)}
                                </p>
                              </div>
                              <StatusBadge status={consultation.status} />
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              Duration: {consultation.duration} minutes
                            </p>
                            
                            {isUpcoming && consultation.status === "scheduled" && consultation.meetingLink && (
                              <Button asChild size="sm" className="w-full mt-3">
                                <a href={consultation.meetingLink} target="_blank" rel="noopener noreferrer">
                                  Join Meeting
                                </a>
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href="/intake">Start New Project</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/schedule">Schedule Consultation</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Help Section */}
      {step === "email" && (
        <section className="py-8 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you&apos;re having trouble accessing your portal:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Make sure you&apos;re using the same email address you used during sign-up</li>
                  <li>Check your spam folder for the verification code</li>
                  <li>If you haven&apos;t submitted an intake form yet, start a new one below</li>
                </ul>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild>
                    <Link href="/intake">Start Intake Form</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </main>
  );
}
