import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Globe,
  Calendar,
  DollarSign,
  Palette,
  FileText,
  Download,
  ExternalLink,
  CheckCircle,
  Clock,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

async function getIntake(id: string) {
  const intake = await prisma.intakeForm.findUnique({
    where: { id },
    include: {
      client: true,
      consultations: {
        orderBy: { scheduledDate: "desc" },
        take: 1,
      },
      files: true,
    },
  });
  
  return intake;
}

export default async function IntakeDetailPage({ params }: Props) {
  const { id } = await params;
  const intake = await getIntake(id);
  
  if (!intake) {
    notFound();
  }

  const sections = [
    {
      title: "Contact Information",
      icon: User,
      items: [
        { label: "Name", value: `${intake.client?.firstName} ${intake.client?.lastName}` },
        { label: "Email", value: intake.client?.email, link: `mailto:${intake.client?.email}` },
        { label: "Phone", value: intake.client?.phone, link: `tel:${intake.client?.phone}` },
        { label: "Company", value: intake.client?.company },
        { label: "Preferred Contact", value: intake.preferredContact },
      ],
    },
    {
      title: "Business Information",
      icon: Building,
      items: [
        { label: "Business Name", value: intake.businessName },
        { label: "Industry", value: intake.industry },
        { label: "Business Description", value: intake.businessDescription },
        { label: "Target Audience", value: intake.targetAudience },
        { label: "Unique Value", value: intake.uniqueValue },
      ],
    },
    {
      title: "Website Goals",
      icon: Globe,
      items: [
        { label: "Website Type", value: intake.websiteType },
        { label: "Primary Goal", value: intake.primaryGoal },
        { label: "Secondary Goals", value: intake.secondaryGoals },
        { label: "Success Metrics", value: intake.successMetrics },
      ],
    },
    {
      title: "Features & Functionality",
      icon: FileText,
      items: [
        { label: "Core Features", value: intake.coreFeatures },
        { label: "E-commerce", value: intake.needsEcommerce ? "Yes" : "No" },
        { label: "Blog", value: intake.needsBlog ? "Yes" : "No" },
        { label: "Contact Forms", value: intake.needsContactForm ? "Yes" : "No" },
        { label: "Booking System", value: intake.needsBookingSystem ? "Yes" : "No" },
        { label: "Newsletter", value: intake.needsNewsletter ? "Yes" : "No" },
        { label: "User Accounts", value: intake.needsUserAccounts ? "Yes" : "No" },
        { label: "Social Media", value: intake.needsSocialMedia ? "Yes" : "No" },
        { label: "Custom Features", value: intake.customFeatures },
      ],
    },
    {
      title: "Design Preferences",
      icon: Palette,
      items: [
        { label: "Style", value: intake.designStyle },
        { label: "Color Preferences", value: intake.colorPreferences },
        { label: "Font Preferences", value: intake.fontPreferences },
        { label: "Mood/Feel", value: intake.moodFeel },
        { label: "Websites They Like", value: intake.websitesLiked },
        { label: "Websites They Dislike", value: intake.websitesDisliked },
        { label: "Has Logo", value: intake.hasLogo ? "Yes" : "No" },
        { label: "Has Brand Guide", value: intake.hasBrandGuide ? "Yes" : "No" },
        { label: "Logo Notes", value: intake.logoNotes },
      ],
    },
    {
      title: "Content",
      icon: FileText,
      items: [
        { label: "Content Ready", value: intake.contentReady },
        { label: "Needs Copywriting", value: intake.needsCopywriting ? "Yes" : "No" },
        { label: "Needs Photography", value: intake.needsPhotography ? "Yes" : "No" },
        { label: "Has Images", value: intake.hasImages ? "Yes" : "No" },
        { label: "Planned Pages", value: intake.pagesPlanned },
        { label: "SEO Notes", value: intake.seoNotes },
      ],
    },
    {
      title: "Technical Requirements",
      icon: Globe,
      items: [
        { label: "Has Domain", value: intake.hasDomain ? "Yes" : "No" },
        { label: "Domain Name", value: intake.domainName },
        { label: "Needs Domain", value: intake.needsDomain ? "Yes" : "No" },
        { label: "Has Hosting", value: intake.hasHosting ? "Yes" : "No" },
        { label: "Hosting Provider", value: intake.hostingProvider },
        { label: "Needs Hosting", value: intake.needsHosting ? "Yes" : "No" },
        { label: "Has Existing Site", value: intake.hasExistingSite ? "Yes" : "No" },
        { label: "Existing Site URL", value: intake.existingSiteUrl, link: intake.existingSiteUrl },
        { label: "Migration Needed", value: intake.migrationNeeded ? "Yes" : "No" },
        { label: "Preferred Platform", value: intake.preferredPlatform },
      ],
    },
    {
      title: "Budget & Timeline",
      icon: DollarSign,
      items: [
        { label: "Budget", value: intake.budget },
        { label: "Timeline", value: intake.timeline },
        { label: "Launch Date", value: intake.launchDate ? new Date(intake.launchDate).toLocaleDateString() : null },
        { label: "Priority", value: intake.priority },
      ],
    },
    {
      title: "Competitors & Inspiration",
      icon: ExternalLink,
      items: [
        { label: "Competitors", value: intake.competitors },
        { label: "Competitor Notes", value: intake.competitorNotes },
        { label: "Inspirations", value: intake.inspirations },
        { label: "Unique Value Proposition", value: intake.uniqueValueProposition },
      ],
    },
    {
      title: "Ongoing Services",
      icon: Calendar,
      items: [
        { label: "Maintenance Plan", value: intake.maintenancePlan },
        { label: "SEO Package", value: intake.seoPackage },
        { label: "Additional Services", value: intake.additionalServices },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/intakes" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-lg font-bold">
                  {intake.client?.firstName} {intake.client?.lastName}
                </h1>
                <p className="text-sm text-muted-foreground">{intake.businessName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  intake.status === "pending"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : intake.status === "in_progress"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                }`}
              >
                {intake.status.replace("_", " ")}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {sections.map((section) => {
              const SectionIcon = section.icon;
              const hasContent = section.items.some((item) => item.value);
              
              if (!hasContent) return null;
              
              return (
                <Card key={section.title}>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <SectionIcon className="h-5 w-5 text-primary" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid sm:grid-cols-2 gap-4">
                      {section.items.map((item) => {
                        if (!item.value) return null;
                        
                        return (
                          <div key={item.label} className={item.label.includes("Description") || item.label.includes("Notes") ? "sm:col-span-2" : ""}>
                            <dt className="text-sm font-medium text-muted-foreground mb-1">
                              {item.label}
                            </dt>
                            <dd className="text-sm">
                              {item.link ? (
                                <a
                                  href={item.link}
                                  className="text-primary hover:underline inline-flex items-center gap-1"
                                  target={item.link.startsWith("http") ? "_blank" : undefined}
                                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                >
                                  {item.value}
                                  {item.link.startsWith("http") && <ExternalLink className="h-3 w-3" />}
                                </a>
                              ) : (
                                <span className="whitespace-pre-wrap">{item.value}</span>
                              )}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  </CardContent>
                </Card>
              );
            })}

            {/* Signature */}
            {intake.signatureData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Digital Signature
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="border rounded-lg p-4 bg-white">
                      {intake.signatureData.startsWith("data:") ? (
                        <img
                          src={intake.signatureData}
                          alt="Signature"
                          className="max-h-20"
                        />
                      ) : (
                        <p className="font-signature text-2xl">{intake.signatureData}</p>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Signed on: {new Date(intake.signedAt || intake.createdAt).toLocaleString()}</p>
                      <p>Terms agreed: {intake.agreedToTerms ? "Yes" : "No"}</p>
                      <p>Privacy agreed: {intake.agreedToPrivacy ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <a href={`mailto:${intake.client?.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Client
                  </a>
                </Button>
                {intake.client?.phone && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`tel:${intake.client.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call Client
                    </a>
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </CardContent>
            </Card>

            {/* Status Update */}
            <Card>
              <CardHeader>
                <CardTitle>Update Status</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-3">
                  <select
                    name="status"
                    defaultValue={intake.status}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <Button type="submit" className="w-full">
                    Update
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Consultation */}
            {intake.consultations[0] && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Consultation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Date:</span>{" "}
                      {new Date(intake.consultations[0].scheduledDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Time:</span>{" "}
                      {new Date(intake.consultations[0].scheduledDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Status:</span>{" "}
                      <span className={`font-medium ${
                        intake.consultations[0].status === "scheduled" 
                          ? "text-primary" 
                          : intake.consultations[0].status === "completed"
                          ? "text-green-600"
                          : "text-muted-foreground"
                      }`}>
                        {intake.consultations[0].status}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Uploaded Files */}
            {intake.files.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {intake.files.map((file) => (
                      <li key={file.id}>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          <FileText className="h-4 w-4" />
                          {file.originalName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>
                  <span className="text-muted-foreground">Created:</span>{" "}
                  {new Date(intake.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="text-muted-foreground">Updated:</span>{" "}
                  {new Date(intake.updatedAt).toLocaleString()}
                </p>
                <p>
                  <span className="text-muted-foreground">ID:</span>{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">{intake.id}</code>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
