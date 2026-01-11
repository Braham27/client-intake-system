"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormTooltip } from "@/components/intake/form-tooltip";
import { 
  ArrowLeft, 
  CheckCircle, 
  FileText, 
  Send, 
  Calendar,
  User,
  Building,
  Target,
  Palette,
  Globe,
  Clock,
  DollarSign,
  Settings
} from "lucide-react";
import SignatureCanvas from "react-signature-canvas";
import type { IntakeFormData } from "@/hooks/use-intake-form";

interface StepProps {
  formData: IntakeFormData;
  updateFormData?: (data: Partial<IntakeFormData>) => void;
  nextStep?: () => void;
  prevStep: () => void;
}

interface ReviewSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function ReviewSection({ title, icon, children }: ReviewSectionProps) {
  return (
    <div className="border-b pb-4 last:border-b-0">
      <h4 className="font-medium flex items-center gap-2 mb-2">
        {icon}
        {title}
      </h4>
      <div className="text-sm text-muted-foreground space-y-1 ml-6">
        {children}
      </div>
    </div>
  );
}

export function Step10Review({ formData, prevStep }: StepProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [typedSignature, setTypedSignature] = useState("");
  const [useDrawnSignature, setUseDrawnSignature] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wantsConsultation, setWantsConsultation] = useState(false);
  const signatureRef = useRef<SignatureCanvas>(null);

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
    setTypedSignature("");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const signatureData = useDrawnSignature && signatureRef.current
        ? signatureRef.current.toDataURL()
        : typedSignature;

      const response = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          signature: signatureData,
          signatureType: useDrawnSignature ? "drawn" : "typed",
          agreedToTerms: true,
          agreedToPrivacy: true,
          submittedAt: new Date().toISOString(),
          wantsConsultation,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      setIsSubmitted(true);
    } catch {
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = agreedToTerms && agreedToPrivacy && 
    (typedSignature.length >= 2 || (useDrawnSignature && signatureRef.current && !signatureRef.current.isEmpty()));

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Your project questionnaire has been submitted successfully. We've sent a confirmation 
          email with a copy of your responses.
        </p>
        <div className="bg-muted/50 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="font-semibold mb-2">What happens next?</h3>
          <ol className="text-sm text-left space-y-2">
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
              <span>We'll review your requirements within 24-48 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
              <span>You'll receive a detailed proposal with pricing and timeline</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
              <span>We'll schedule a call to discuss and answer any questions</span>
            </li>
          </ol>
        </div>
        {wantsConsultation && (
          <div className="mt-6">
            <Button asChild size="lg">
              <a href="/schedule">Schedule Your Consultation Now</a>
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Review Your Submission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please review your information before submitting. You can go back to make changes if needed.
          </p>

          <div className="space-y-4">
            <ReviewSection title="Contact Information" icon={<User className="h-4 w-4 text-primary" />}>
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone || "Not provided"}</p>
            </ReviewSection>

            <ReviewSection title="Business Information" icon={<Building className="h-4 w-4 text-primary" />}>
              <p><strong>Business:</strong> {formData.businessName || "Not provided"}</p>
              <p><strong>Industry:</strong> {formData.industry || "Not specified"}</p>
            </ReviewSection>

            <ReviewSection title="Website Goals" icon={<Target className="h-4 w-4 text-primary" />}>
              <p><strong>Primary Purpose:</strong> {formData.websitePurpose || "Not specified"}</p>
              {formData.goals && <p><strong>Goals:</strong> {formData.goals}</p>}
            </ReviewSection>

            <ReviewSection title="Features & Functionality" icon={<Settings className="h-4 w-4 text-primary" />}>
              <p><strong>Selected Features:</strong> {(formData.features || []).join(", ") || "None selected"}</p>
              {formData.needsEcommerce === "yes" && <p>✅ E-commerce functionality required</p>}
              {formData.needsMembership === "yes" && <p>✅ Membership system required</p>}
            </ReviewSection>

            <ReviewSection title="Design Preferences" icon={<Palette className="h-4 w-4 text-primary" />}>
              <p><strong>Style:</strong> {formData.designStyle || "Not specified"}</p>
              <p><strong>Has Branding:</strong> {formData.hasBranding || "Not specified"}</p>
            </ReviewSection>

            <ReviewSection title="Technical Setup" icon={<Globe className="h-4 w-4 text-primary" />}>
              <p><strong>Domain:</strong> {formData.domainStatus === "have_domain" ? `Using existing: ${formData.existingDomain}` : formData.domainStatus === "need_domain" ? "Need new domain" : "TBD"}</p>
              <p><strong>Hosting:</strong> {formData.hostingStatus || "Not specified"}</p>
            </ReviewSection>

            <ReviewSection title="Timeline & Budget" icon={<Clock className="h-4 w-4 text-primary" />}>
              <p><strong>Timeline:</strong> {formData.timeline || "Not specified"}</p>
              <p><strong>Budget Range:</strong> {formData.budget || "Not specified"}</p>
            </ReviewSection>

            <ReviewSection title="Ongoing Services" icon={<DollarSign className="h-4 w-4 text-primary" />}>
              <p><strong>Maintenance:</strong> {formData.wantsMaintenance === "yes" ? "Yes, interested" : formData.wantsMaintenance === "training" ? "Self-managed with training" : "TBD"}</p>
              <p><strong>SEO:</strong> {formData.seoPackage || "Not specified"}</p>
            </ReviewSection>
          </div>
        </CardContent>
      </Card>

      {/* Consultation Option */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Would you like to schedule a free consultation?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We offer a complimentary 30-minute call to discuss your project before we begin. 
                This is optional but recommended for complex projects.
              </p>
              <div className="flex gap-4">
                <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${wantsConsultation ? "border-primary bg-primary/5" : ""}`}>
                  <input
                    type="radio"
                    checked={wantsConsultation}
                    onChange={() => setWantsConsultation(true)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 ${wantsConsultation ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                    {wantsConsultation && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                  </div>
                  <span>Yes, I'd like to schedule a call</span>
                </label>
                <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${!wantsConsultation ? "border-primary bg-primary/5" : ""}`}>
                  <input
                    type="radio"
                    checked={!wantsConsultation}
                    onChange={() => setWantsConsultation(false)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 ${!wantsConsultation ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                    {!wantsConsultation && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                  </div>
                  <span>No, proceed with proposal</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms of Service */}
      <Card>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-4 h-48 overflow-y-auto text-sm mb-4">
            <h4 className="font-semibold mb-2">Web Design Services Agreement</h4>
            <p className="mb-2">By submitting this intake form and providing your signature below, you acknowledge and agree to the following terms:</p>
            
            <p className="font-medium mt-3 mb-1">1. Scope of Work</p>
            <p className="mb-2">The services to be provided will be based on the requirements outlined in this questionnaire. A detailed proposal with specific deliverables, timeline, and pricing will be provided for your approval before work begins.</p>
            
            <p className="font-medium mt-3 mb-1">2. Payment Terms</p>
            <p className="mb-2">A deposit of 50% is required before work begins. The remaining balance is due upon project completion before the website goes live. Payment plans may be available for larger projects.</p>
            
            <p className="font-medium mt-3 mb-1">3. Project Timeline</p>
            <p className="mb-2">Timelines are estimates and depend on timely receipt of content and feedback. Delays in providing materials or approvals may affect the delivery date.</p>
            
            <p className="font-medium mt-3 mb-1">4. Client Responsibilities</p>
            <p className="mb-2">You agree to provide all necessary content, images, and assets in a timely manner. You confirm that you have the rights to use any materials provided.</p>
            
            <p className="font-medium mt-3 mb-1">5. Revisions</p>
            <p className="mb-2">The project includes a reasonable number of revision rounds as specified in your proposal. Additional revisions beyond the included amount will be billed separately.</p>
            
            <p className="font-medium mt-3 mb-1">6. Ownership</p>
            <p className="mb-2">Upon final payment, you will own the completed website and its content. We retain the right to display the work in our portfolio unless otherwise agreed.</p>
            
            <p className="font-medium mt-3 mb-1">7. Third-Party Costs</p>
            <p className="mb-2">Hosting, domain registration, premium themes, plugins, or stock images are not included unless specifically stated. These are additional costs you may need to pay directly or through us.</p>
            
            <p className="font-medium mt-3 mb-1">8. Maintenance</p>
            <p className="mb-2">After launch, any updates or changes not covered by a maintenance plan will be billed at our standard hourly rate.</p>
            
            <p className="font-medium mt-3 mb-1">9. Cancellation</p>
            <p className="mb-2">If you cancel the project, any payments made are non-refundable but will be applied to work already completed.</p>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-0.5"
              />
              <span className="text-sm">
                I have read and agree to the <a href="/terms" className="text-primary underline" target="_blank">Terms of Service</a>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={agreedToPrivacy}
                onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
                className="mt-0.5"
              />
              <span className="text-sm">
                I have read and agree to the <a href="/privacy" className="text-primary underline" target="_blank">Privacy Policy</a> and consent to the processing of my personal data
              </span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Signature Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Digital Signature
            <FormTooltip content="Your electronic signature is legally binding and confirms your agreement to the terms above." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex gap-4 mb-4">
              <Button
                variant={!useDrawnSignature ? "default" : "outline"}
                size="sm"
                onClick={() => setUseDrawnSignature(false)}
              >
                Type Signature
              </Button>
              <Button
                variant={useDrawnSignature ? "default" : "outline"}
                size="sm"
                onClick={() => setUseDrawnSignature(true)}
              >
                Draw Signature
              </Button>
            </div>

            {!useDrawnSignature ? (
              <div>
                <Label htmlFor="typedSignature" className="mb-2 block">
                  Type your full legal name
                </Label>
                <Input
                  id="typedSignature"
                  value={typedSignature}
                  onChange={(e) => setTypedSignature(e.target.value)}
                  placeholder="Your Full Name"
                  className="font-serif text-xl italic"
                />
              </div>
            ) : (
              <div>
                <Label className="mb-2 block">Draw your signature below</Label>
                <div className="border rounded-lg bg-white">
                  <SignatureCanvas
                    ref={signatureRef}
                    canvasProps={{
                      className: "w-full h-32",
                      style: { width: "100%", height: "128px" },
                    }}
                    backgroundColor="white"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSignature}
                  className="mt-2"
                >
                  Clear Signature
                </Button>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            By signing, I confirm that I am authorized to enter into this agreement and that all 
            information provided is accurate to the best of my knowledge.
          </p>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={!canSubmit || isSubmitting}
          size="lg"
        >
          {isSubmitting ? (
            <>Submitting...</>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Questionnaire
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
