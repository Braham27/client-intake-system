import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendConfirmationEmail, sendAdminNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Find or create client
    let client = null;
    if (data.contactEmail) {
      client = await prisma.client.upsert({
        where: { email: data.contactEmail },
        update: {
          firstName: data.contactFirstName || data.firstName,
          lastName: data.contactLastName || data.lastName,
          phone: data.contactPhone || data.phone,
          company: data.businessName,
        },
        create: {
          email: data.contactEmail,
          firstName: data.contactFirstName || data.firstName || "",
          lastName: data.contactLastName || data.lastName || "",
          phone: data.contactPhone || data.phone,
          company: data.businessName,
        },
      });
    }

    // Create or update intake form
    const intakeForm = await prisma.intakeForm.create({
      data: {
        clientId: client?.id,
        status: "submitted",
        currentStep: 10,
        completedSteps: JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        
        // Contact Info
        contactFirstName: data.contactFirstName || data.firstName,
        contactLastName: data.contactLastName || data.lastName,
        contactEmail: data.contactEmail || data.email,
        contactPhone: data.contactPhone || data.phone,
        businessName: data.businessName,
        businessAddress: data.businessAddress,
        businessCity: data.businessCity,
        businessState: data.businessState,
        businessZip: data.businessZip,
        businessCountry: data.businessCountry,
        industry: data.industry,
        businessDescription: data.businessDescription,
        yearsInBusiness: data.yearsInBusiness,
        
        // Goals
        websiteGoals: JSON.stringify(data.websiteGoals || []),
        primaryPurpose: data.primaryPurpose || data.websitePurpose,
        whyNewWebsite: data.whyNewWebsite,
        currentWebsiteUrl: data.currentWebsiteUrl || data.existingWebsiteUrl,
        currentChallenges: data.currentChallenges,
        targetAudience: data.targetAudience,
        uniqueSellingPoints: data.uniqueSellingPoints || data.uniqueValue,
        
        // Features
        features: JSON.stringify(data.features || []),
        needsBlog: data.needsBlog ?? (data.features || []).includes("blog"),
        needsContactForm: data.needsContactForm ?? (data.features || []).includes("contact_form"),
        needsGallery: data.needsGallery ?? (data.features || []).includes("gallery"),
        needsSocialMedia: data.needsSocialMedia ?? (data.features || []).includes("social_media"),
        needsCalendar: data.needsCalendar ?? (data.features || []).includes("calendar"),
        needsSearch: data.needsSearch ?? (data.features || []).includes("search"),
        needsNewsletter: data.needsNewsletter ?? (data.features || []).includes("newsletter"),
        needsLiveChat: data.needsLiveChat ?? (data.features || []).includes("live_chat"),
        needsAnalytics: data.needsAnalytics ?? true,
        needsMultiLanguage: data.needsMultiLanguage ?? false,
        otherFeatures: data.otherFeatures,
        
        // E-commerce
        needsEcommerce: data.needsEcommerce === "yes" || data.needsEcommerce === true,
        productCount: data.productCount,
        productTypes: data.productTypes,
        paymentGateways: JSON.stringify(data.paymentGateways || []),
        needsInventory: data.needsInventory ?? false,
        needsShipping: data.needsShipping ?? false,
        shippingRegions: data.shippingRegions,
        taxRequirements: data.taxRequirements,
        ecommercePlatform: data.ecommercePlatform,
        
        // Membership
        needsMembership: data.needsMembership === "yes" || data.needsMembership === true,
        membershipContent: data.membershipContent,
        membershipPaid: data.membershipPaid ?? false,
        membershipTiers: data.membershipTiers,
        membershipPayment: data.membershipPayment,
        
        // Design
        hasExistingBranding: data.hasExistingBranding === "yes" || data.hasExistingBranding === true || data.hasBranding === "yes",
        brandColors: data.brandColors,
        brandFonts: data.brandFonts,
        designStyle: data.designStyle,
        websiteExamples: data.websiteExamples,
        websiteExamplesNotes: data.websiteExamplesNotes,
        avoidDesignElements: data.avoidDesignElements,
        
        // Content
        contentProvider: data.contentProvider,
        hasExistingContent: data.hasExistingContent ?? false,
        needsContentMigration: data.needsContentMigration || data.migrateContent,
        needsPhotography: data.needsPhotography ?? false,
        needsStockImages: data.needsStockImages ?? false,
        estimatedPages: data.estimatedPages,
        
        // Technical
        hasDomain: data.domainStatus === "have_domain",
        domainName: data.existingDomain,
        needsDomainPurchase: data.domainStatus === "need_domain",
        preferredDomain: data.preferredDomain,
        hasHosting: data.hostingStatus === "have_hosting",
        hostingProvider: data.hostingProvider,
        needsHostingSetup: data.hostingStatus === "need_hosting" || data.hostingStatus === "use_our_hosting",
        needsDomainTransfer: data.needDomainTransfer ?? false,
        technicalNotes: data.technicalNotes,
        
        // Timeline
        targetLaunchDate: data.launchDate,
        isFlexibleTimeline: data.timeline !== "specific_date",
        budgetRange: data.budget,
        budgetNotes: data.budgetNotes,
        priority: data.priority,
        timingNotes: data.timingNotes,
        launchReason: data.launchReason,
        
        // Competitors
        competitors: JSON.stringify(data.competitors || []),
        competitorNotes: data.competitorNotes,
        industryInspirations: JSON.stringify(data.inspirations || []),
        
        // Services
        needsMaintenance: data.wantsMaintenance === "yes",
        maintenanceLevel: data.maintenanceLevel,
        maintenanceOptions: JSON.stringify(data.maintenanceOptions || []),
        needsTraining: data.wantsMaintenance === "training",
        ongoingNotes: data.ongoingNotes,
        seoPackage: data.seoPackage,
        targetKeywords: data.targetKeywords,
        additionalServices: JSON.stringify(data.additionalServices || []),
        
        // Final
        additionalComments: data.additionalComments,
        specialRequirements: data.specialRequirements,
        accessibilityNeeds: data.accessibilityNeeds,
        agreedToTerms: data.agreedToTerms ?? true,
        agreedToPrivacy: data.agreedToPrivacy ?? true,
        signatureData: data.signature,
        signatureType: data.signatureType,
        signedName: data.signedName || data.typedSignature,
        
        // Consultation
        wantsConsultation: data.wantsConsultation ?? false,
        
        submittedAt: new Date(),
      },
    });

    // Create consultation request if requested
    if (data.wantsConsultation && client) {
      await prisma.consultation.create({
        data: {
          clientId: client.id,
          intakeFormId: intakeForm.id,
          status: "pending",
          requestedVia: "intake_form",
          notes: "Consultation requested during intake form submission",
        },
      });
    }

    // Send confirmation email to client
    try {
      if (data.contactEmail) {
        await sendConfirmationEmail({
          to: data.contactEmail,
          name: data.contactFirstName || data.firstName || "Client",
          intakeFormId: intakeForm.id,
          wantsConsultation: data.wantsConsultation,
        });
      }

      // Send notification to admin
      await sendAdminNotification({
        type: "new_intake",
        intakeFormId: intakeForm.id,
        clientName: `${data.contactFirstName || data.firstName} ${data.contactLastName || data.lastName}`,
        clientEmail: data.contactEmail,
        businessName: data.businessName,
        wantsConsultation: data.wantsConsultation,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the submission if email fails
    }

    return NextResponse.json({
      success: true,
      intakeFormId: intakeForm.id,
      message: "Intake form submitted successfully",
    });
  } catch (error) {
    console.error("Intake submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit intake form" },
      { status: 500 }
    );
  }
}
