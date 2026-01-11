"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";

export interface IntakeFormData {
  // Step 1: Contact Info
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  businessName: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  businessCountry: string;
  industry: string;
  businessDescription: string;
  yearsInBusiness: string;
  
  // Step 2: Goals
  websiteGoals: string[];
  primaryPurpose: string;
  whyNewWebsite: string;
  currentWebsiteUrl: string;
  currentChallenges: string;
  targetAudience: string;
  uniqueSellingPoints: string;
  
  // Step 3: Features
  features: string[];
  needsBlog: boolean;
  needsContactForm: boolean;
  needsGallery: boolean;
  needsSocialMedia: boolean;
  needsCalendar: boolean;
  needsSearch: boolean;
  needsNewsletter: boolean;
  needsLiveChat: boolean;
  needsAnalytics: boolean;
  needsMultiLanguage: boolean;
  otherFeatures: string;
  
  // E-commerce
  needsEcommerce: boolean;
  productCount: string;
  productTypes: string;
  paymentGateways: string[];
  needsInventory: boolean;
  needsShipping: boolean;
  shippingRegions: string;
  taxRequirements: string;
  ecommercePlatform: string;
  
  // Membership
  needsMembership: boolean;
  membershipContent: string;
  membershipPaid: boolean;
  membershipTiers: string;
  membershipPayment: string;
  
  // Step 4: Design
  hasExistingBranding: boolean;
  brandColors: string;
  brandFonts: string;
  designStyle: string;
  websiteExamples: string;
  websiteExamplesNotes: string;
  avoidDesignElements: string;
  
  // Step 5: Content
  contentProvider: string;
  hasExistingContent: boolean;
  needsContentMigration: boolean;
  needsPhotography: boolean;
  needsStockImages: boolean;
  estimatedPages: string;
  
  // Step 6: Technical
  hasDomain: boolean;
  domainName: string;
  domainStatus: string;
  existingDomain: string;
  needsDomainPurchase: boolean;
  preferredDomain: string;
  hasHosting: boolean;
  hostingStatus: string;
  hostingProvider: string;
  needsHostingSetup: boolean;
  needsDomainTransfer: boolean;
  hasExistingWebsite: string;
  existingWebsiteUrl: string;
  existingPlatform: string;
  migrateContent: boolean;
  preserveSeo: boolean;
  needSsl: boolean;
  technicalNotes: string;
  
  // Step 7: Timeline
  targetLaunchDate: string;
  isFlexibleTimeline: boolean;
  budgetRange: string;
  budgetNotes: string;
  
  // Step 8: Competitors
  competitors: string;
  competitorNotes: string;
  industryInspirations: string;
  
  // Step 9: Services
  needsMaintenance: boolean;
  maintenanceLevel: string;
  needsTraining: boolean;
  ongoingNotes: string;
  
  // Step 10: Review & Agreement
  additionalComments: string;
  specialRequirements: string;
  accessibilityNeeds: string;
  agreedToTerms: boolean;
  signatureData: string;
  signedName: string;
}

const initialFormData: IntakeFormData = {
  // Step 1
  contactFirstName: "",
  contactLastName: "",
  contactEmail: "",
  contactPhone: "",
  businessName: "",
  businessAddress: "",
  businessCity: "",
  businessState: "",
  businessZip: "",
  businessCountry: "",
  industry: "",
  businessDescription: "",
  yearsInBusiness: "",
  
  // Step 2
  websiteGoals: [],
  primaryPurpose: "",
  whyNewWebsite: "",
  currentWebsiteUrl: "",
  currentChallenges: "",
  targetAudience: "",
  uniqueSellingPoints: "",
  
  // Step 3
  features: [],
  needsBlog: false,
  needsContactForm: true,
  needsGallery: false,
  needsSocialMedia: false,
  needsCalendar: false,
  needsSearch: false,
  needsNewsletter: false,
  needsLiveChat: false,
  needsAnalytics: true,
  needsMultiLanguage: false,
  otherFeatures: "",
  needsEcommerce: false,
  productCount: "",
  productTypes: "",
  paymentGateways: [],
  needsInventory: false,
  needsShipping: false,
  shippingRegions: "",
  taxRequirements: "",
  ecommercePlatform: "",
  needsMembership: false,
  membershipContent: "",
  membershipPaid: false,
  membershipTiers: "",
  membershipPayment: "",
  
  // Step 4
  hasExistingBranding: false,
  brandColors: "",
  brandFonts: "",
  designStyle: "",
  websiteExamples: "",
  websiteExamplesNotes: "",
  avoidDesignElements: "",
  
  // Step 5
  contentProvider: "",
  hasExistingContent: false,
  needsContentMigration: false,
  needsPhotography: false,
  needsStockImages: false,
  estimatedPages: "",
  
  // Step 6
  hasDomain: false,
  domainName: "",
  domainStatus: "",
  existingDomain: "",
  needsDomainPurchase: false,
  preferredDomain: "",
  hasHosting: false,
  hostingStatus: "",
  hostingProvider: "",
  needsHostingSetup: false,
  needsDomainTransfer: false,
  hasExistingWebsite: "",
  existingWebsiteUrl: "",
  existingPlatform: "",
  migrateContent: false,
  preserveSeo: false,
  needSsl: true,
  technicalNotes: "",
  
  // Step 7
  targetLaunchDate: "",
  isFlexibleTimeline: true,
  budgetRange: "",
  budgetNotes: "",
  
  // Step 8
  competitors: "",
  competitorNotes: "",
  industryInspirations: "",
  
  // Step 9
  needsMaintenance: false,
  maintenanceLevel: "",
  needsTraining: false,
  ongoingNotes: "",
  
  // Step 10
  additionalComments: "",
  specialRequirements: "",
  accessibilityNeeds: "",
  agreedToTerms: false,
  signatureData: "",
  signedName: "",
};

export function useIntakeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<IntakeFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [resumeToken, setResumeToken] = useState<string | null>(null);
  
  const searchParams = useSearchParams();

  // Load saved data on mount
  useEffect(() => {
    const token = searchParams.get("resume");
    if (token) {
      loadFromServer(token);
    } else {
      loadFromLocalStorage();
    }
    setIsLoading(false);
  }, [searchParams]);

  // Auto-save to localStorage on changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("intakeFormData", JSON.stringify(formData));
      localStorage.setItem("intakeFormStep", String(currentStep));
    }
  }, [formData, currentStep, isLoading]);

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem("intakeFormData");
    const savedStep = localStorage.getItem("intakeFormStep");
    
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved form data");
      }
    }
    
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
  };

  const loadFromServer = async (token: string) => {
    try {
      const response = await fetch(`/api/intake/resume?token=${token}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data.formData);
        setCurrentStep(data.currentStep);
        setResumeToken(token);
      }
    } catch (error) {
      console.error("Failed to load form from server:", error);
      loadFromLocalStorage();
    }
  };

  const updateFormData = useCallback((updates: Partial<IntakeFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 10));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= currentStep) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  const saveProgress = useCallback(async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch("/api/intake/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          currentStep,
          resumeToken,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setResumeToken(data.resumeToken);
        
        // Show success message (you'd typically use a toast here)
        alert(`Progress saved! Resume link: ${window.location.origin}/intake?resume=${data.resumeToken}`);
      }
    } catch (error) {
      console.error("Failed to save progress:", error);
      alert("Failed to save progress. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, [formData, currentStep, resumeToken]);

  const submitForm = useCallback(async () => {
    try {
      const response = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          resumeToken,
        }),
      });
      
      if (response.ok) {
        // Clear local storage
        localStorage.removeItem("intakeFormData");
        localStorage.removeItem("intakeFormStep");
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Failed to submit form:", error);
      return false;
    }
  }, [formData, resumeToken]);

  return {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    saveProgress,
    submitForm,
    isLoading,
    isSaving,
    resumeToken,
  };
}
