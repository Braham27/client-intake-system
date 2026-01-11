import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateResumeToken } from "@/lib/utils";
import { sendResumeEmail } from "@/lib/email";

// Save progress (create or update draft)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { resumeToken, currentStep, formData } = data;

    let intakeForm;

    if (resumeToken) {
      // Update existing draft
      intakeForm = await prisma.intakeForm.update({
        where: { resumeToken },
        data: {
          currentStep,
          completedSteps: JSON.stringify(formData.completedSteps || []),
          lastSavedAt: new Date(),
          
          // Update all form fields
          contactFirstName: formData.contactFirstName,
          contactLastName: formData.contactLastName,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone,
          businessName: formData.businessName,
          businessAddress: formData.businessAddress,
          businessCity: formData.businessCity,
          businessState: formData.businessState,
          businessZip: formData.businessZip,
          businessCountry: formData.businessCountry,
          industry: formData.industry,
          businessDescription: formData.businessDescription,
          yearsInBusiness: formData.yearsInBusiness,
          
          // Goals
          websiteGoals: formData.websiteGoals ? JSON.stringify(formData.websiteGoals) : undefined,
          primaryPurpose: formData.primaryPurpose,
          whyNewWebsite: formData.whyNewWebsite,
          currentWebsiteUrl: formData.currentWebsiteUrl,
          currentChallenges: formData.currentChallenges,
          targetAudience: formData.targetAudience,
          uniqueSellingPoints: formData.uniqueSellingPoints,
          
          // Features
          features: formData.features ? JSON.stringify(formData.features) : undefined,
          needsBlog: formData.needsBlog,
          needsContactForm: formData.needsContactForm,
          needsGallery: formData.needsGallery,
          needsSocialMedia: formData.needsSocialMedia,
          needsCalendar: formData.needsCalendar,
          needsSearch: formData.needsSearch,
          needsNewsletter: formData.needsNewsletter,
          needsLiveChat: formData.needsLiveChat,
          needsAnalytics: formData.needsAnalytics,
          needsMultiLanguage: formData.needsMultiLanguage,
          otherFeatures: formData.otherFeatures,
          
          // E-commerce
          needsEcommerce: formData.needsEcommerce,
          productCount: formData.productCount,
          productTypes: formData.productTypes,
          paymentGateways: formData.paymentGateways ? JSON.stringify(formData.paymentGateways) : undefined,
          needsInventory: formData.needsInventory,
          needsShipping: formData.needsShipping,
          shippingRegions: formData.shippingRegions,
          taxRequirements: formData.taxRequirements,
          ecommercePlatform: formData.ecommercePlatform,
          
          // Membership
          needsMembership: formData.needsMembership,
          membershipContent: formData.membershipContent,
          membershipPaid: formData.membershipPaid,
          membershipTiers: formData.membershipTiers,
          membershipPayment: formData.membershipPayment,
          
          // Design
          hasExistingBranding: formData.hasExistingBranding,
          brandColors: formData.brandColors,
          brandFonts: formData.brandFonts,
          designStyle: formData.designStyle,
          websiteExamples: formData.websiteExamples,
          websiteExamplesNotes: formData.websiteExamplesNotes,
          avoidDesignElements: formData.avoidDesignElements,
          
          // Content
          contentProvider: formData.contentProvider,
          hasExistingContent: formData.hasExistingContent,
          needsContentMigration: formData.needsContentMigration,
          needsPhotography: formData.needsPhotography,
          needsStockImages: formData.needsStockImages,
          estimatedPages: formData.estimatedPages,
          
          // Technical
          hasDomain: formData.hasDomain,
          domainName: formData.domainName,
          needsDomainPurchase: formData.needsDomainPurchase,
          preferredDomain: formData.preferredDomain,
          hasHosting: formData.hasHosting,
          hostingProvider: formData.hostingProvider,
          needsHostingSetup: formData.needsHostingSetup,
          needsDomainTransfer: formData.needsDomainTransfer,
          technicalNotes: formData.technicalNotes,
          
          // Timeline
          targetLaunchDate: formData.targetLaunchDate,
          isFlexibleTimeline: formData.isFlexibleTimeline,
          budgetRange: formData.budgetRange,
          budgetNotes: formData.budgetNotes,
          
          // Competitors
          competitors: formData.competitors ? JSON.stringify(formData.competitors) : undefined,
          competitorNotes: formData.competitorNotes,
          industryInspirations: formData.industryInspirations,
          
          // Services
          needsMaintenance: formData.needsMaintenance,
          maintenanceLevel: formData.maintenanceLevel,
          needsTraining: formData.needsTraining,
          ongoingNotes: formData.ongoingNotes,
          
          // Additional
          additionalComments: formData.additionalComments,
          specialRequirements: formData.specialRequirements,
          accessibilityNeeds: formData.accessibilityNeeds,
        },
      });
    } else {
      // Create new draft
      const newToken = generateResumeToken();
      
      intakeForm = await prisma.intakeForm.create({
        data: {
          resumeToken: newToken,
          status: "draft",
          currentStep,
          completedSteps: JSON.stringify(formData.completedSteps || []),
          
          contactFirstName: formData.contactFirstName,
          contactLastName: formData.contactLastName,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone,
          businessName: formData.businessName,
          industry: formData.industry,
          businessDescription: formData.businessDescription,
          
          // Initialize other fields as needed
          websiteGoals: formData.websiteGoals ? JSON.stringify(formData.websiteGoals) : "[]",
          features: formData.features ? JSON.stringify(formData.features) : "[]",
          paymentGateways: "[]",
          competitors: "[]",
        },
      });
    }

    return NextResponse.json({
      success: true,
      resumeToken: intakeForm.resumeToken,
      message: "Progress saved successfully",
    });
  } catch (error) {
    console.error("Save progress error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save progress" },
      { status: 500 }
    );
  }
}

// Resume form (get saved data)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resumeToken = searchParams.get("token");

    if (!resumeToken) {
      return NextResponse.json(
        { success: false, error: "Resume token required" },
        { status: 400 }
      );
    }

    const intakeForm = await prisma.intakeForm.findUnique({
      where: { resumeToken },
    });

    if (!intakeForm) {
      return NextResponse.json(
        { success: false, error: "Form not found" },
        { status: 404 }
      );
    }

    // Convert JSON strings back to arrays/objects
    const formData = {
      ...intakeForm,
      websiteGoals: JSON.parse(intakeForm.websiteGoals || "[]"),
      features: JSON.parse(intakeForm.features || "[]"),
      paymentGateways: JSON.parse(intakeForm.paymentGateways || "[]"),
      completedSteps: JSON.parse(intakeForm.completedSteps || "[]"),
      competitors: JSON.parse(intakeForm.competitors || "[]"),
    };

    return NextResponse.json({
      success: true,
      formData,
      currentStep: intakeForm.currentStep,
      resumeToken: intakeForm.resumeToken,
    });
  } catch (error) {
    console.error("Resume form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to resume form" },
      { status: 500 }
    );
  }
}

// Send resume email
export async function PUT(request: NextRequest) {
  try {
    const { email, resumeToken } = await request.json();

    const intakeForm = await prisma.intakeForm.findUnique({
      where: { resumeToken },
    });

    if (!intakeForm) {
      return NextResponse.json(
        { success: false, error: "Form not found" },
        { status: 404 }
      );
    }

    // Update email if not already set
    if (!intakeForm.contactEmail) {
      await prisma.intakeForm.update({
        where: { resumeToken },
        data: { contactEmail: email },
      });
    }

    // Send resume link email
    await sendResumeEmail({
      to: email,
      resumeToken,
      name: intakeForm.contactFirstName || "there",
    });

    return NextResponse.json({
      success: true,
      message: "Resume link sent to your email",
    });
  } catch (error) {
    console.error("Send resume email error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send resume email" },
      { status: 500 }
    );
  }
}
