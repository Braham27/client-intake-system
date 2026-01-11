"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FormTooltip } from "@/components/intake/form-tooltip";
import { ArrowLeft, ArrowRight, Settings, Search, Zap, Shield } from "lucide-react";
import type { IntakeFormData } from "@/hooks/use-intake-form";

interface StepProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const MAINTENANCE_FEATURES = [
  { id: "updates", label: "Regular updates & patches", description: "Keep your site software up-to-date and secure" },
  { id: "backups", label: "Daily backups", description: "Automatic backups to recover from any issues" },
  { id: "security", label: "Security monitoring", description: "24/7 monitoring for threats and malware" },
  { id: "performance", label: "Performance optimization", description: "Keep your site fast and responsive" },
  { id: "content_updates", label: "Content updates", description: "Monthly minor content changes included" },
  { id: "support", label: "Priority support", description: "Fast response for any issues or questions" },
  { id: "reports", label: "Monthly reports", description: "Analytics and performance summaries" },
  { id: "hosting", label: "Managed hosting", description: "We handle all hosting and server management" },
];

const SEO_OPTIONS = [
  { 
    value: "basic", 
    label: "Basic SEO Setup", 
    description: "Essential optimization: meta tags, sitemap, Google Analytics setup",
    included: true 
  },
  { 
    value: "standard", 
    label: "Standard SEO Package", 
    description: "Basic + keyword research, on-page optimization, and local SEO setup",
    included: false 
  },
  { 
    value: "advanced", 
    label: "Ongoing SEO Services", 
    description: "Monthly SEO work: content optimization, link building, regular reporting",
    included: false 
  },
  { 
    value: "none", 
    label: "No SEO services needed", 
    description: "You'll handle SEO yourself or have another provider",
    included: false 
  },
];

export function Step9Services({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const maintenanceOptions = formData.maintenanceOptions || [];

  const toggleMaintenanceOption = (optionId: string) => {
    const updated = maintenanceOptions.includes(optionId)
      ? maintenanceOptions.filter((id) => id !== optionId)
      : [...maintenanceOptions, optionId];
    updateFormData({ maintenanceOptions: updated });
  };

  return (
    <div className="space-y-6">
      {/* Maintenance Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Ongoing Maintenance & Support
            <FormTooltip content="A website needs regular care to stay secure and perform well. We offer maintenance plans so you don't have to worry about the technical stuff." />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            After your site goes live, do you want us to handle ongoing maintenance and updates?
          </p>

          <RadioGroup
            value={formData.wantsMaintenance}
            onValueChange={(value) => updateFormData({ wantsMaintenance: value })}
            className="space-y-3 mb-4"
          >
            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                formData.wantsMaintenance === "yes"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="yes" className="mt-1" />
              <div>
                <span className="font-medium">Yes, I want a maintenance plan</span>
                <p className="text-sm text-muted-foreground">
                  You handle running your business; we keep your website running smoothly.
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                formData.wantsMaintenance === "training"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="training" className="mt-1" />
              <div>
                <span className="font-medium">I'll manage it myself (with training)</span>
                <p className="text-sm text-muted-foreground">
                  We'll train you on how to update and maintain your site.
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                formData.wantsMaintenance === "not_sure"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="not_sure" className="mt-1" />
              <div>
                <span className="font-medium">Not sure yet</span>
                <p className="text-sm text-muted-foreground">
                  We can discuss options and pricing during our consultation.
                </p>
              </div>
            </label>
          </RadioGroup>

          {formData.wantsMaintenance === "yes" && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <Label className="text-base font-medium mb-3 block">
                Which services are most important to you?
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MAINTENANCE_FEATURES.map((feature) => (
                  <label
                    key={feature.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      maintenanceOptions.includes(feature.id)
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                  >
                    <Checkbox
                      checked={maintenanceOptions.includes(feature.id)}
                      onCheckedChange={() => toggleMaintenanceOption(feature.id)}
                      className="mt-0.5"
                    />
                    <div>
                      <span className="font-medium text-sm">{feature.label}</span>
                      <p className="text-xs text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                <p className="text-sm text-green-700 dark:text-green-300">
                  <strong>💡 Popular Choice:</strong> Our Complete Care plan includes all features 
                  for a predictable monthly fee. We'll provide detailed pricing in your proposal.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEO Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Search Engine Optimization (SEO)
            <FormTooltip content="SEO helps your website appear in Google and other search engines when people search for your products or services." />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            SEO helps people find your website when searching on Google and other search engines.
          </p>

          <RadioGroup
            value={formData.seoPackage}
            onValueChange={(value) => updateFormData({ seoPackage: value })}
            className="space-y-3"
          >
            {SEO_OPTIONS.map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  formData.seoPackage === option.value
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value={option.value} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{option.label}</span>
                    {option.included && (
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                        Included
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </label>
            ))}
          </RadioGroup>

          {formData.seoPackage && formData.seoPackage !== "none" && (
            <div className="mt-4">
              <Label className="flex items-center gap-2 mb-2">
                Do you have target keywords in mind?
                <FormTooltip content="Keywords are the terms people type into search engines. If you know what your customers search for, share it with us!" />
              </Label>
              <Textarea
                value={formData.targetKeywords || ""}
                onChange={(e) => updateFormData({ targetKeywords: e.target.value })}
                placeholder="e.g., 'plumber near me', 'emergency plumbing services', 'bathroom renovation contractor'..."
                rows={3}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Services */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Additional Services
            <FormTooltip content="We offer various additional services. Check any that interest you and we'll include details in your proposal." />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Check any additional services you might be interested in:
          </p>

          <div className="space-y-3">
            {[
              { id: "logo_design", label: "Logo Design", description: "Professional logo creation or refresh" },
              { id: "brand_identity", label: "Brand Identity Package", description: "Logo, colors, fonts, and brand guidelines" },
              { id: "copywriting", label: "Copywriting Services", description: "Professional content writing for your site" },
              { id: "photography", label: "Photography", description: "Professional photos of your business, products, or team" },
              { id: "video", label: "Video Production", description: "Promotional or explainer videos" },
              { id: "google_ads", label: "Google Ads Management", description: "Paid advertising campaigns" },
              { id: "social_media", label: "Social Media Setup/Management", description: "Create and manage social profiles" },
              { id: "email_marketing", label: "Email Marketing Setup", description: "Newsletter system and automation" },
              { id: "google_business", label: "Google Business Profile Setup", description: "Get found on Google Maps and local search" },
            ].map((service) => (
              <label
                key={service.id}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  (formData.additionalServices || []).includes(service.id)
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
              >
                <Checkbox
                  checked={(formData.additionalServices || []).includes(service.id)}
                  onCheckedChange={(checked) => {
                    const current = formData.additionalServices || [];
                    const updated = checked
                      ? [...current, service.id]
                      : current.filter((id) => id !== service.id);
                    updateFormData({ additionalServices: updated });
                  }}
                  className="mt-0.5"
                />
                <div>
                  <span className="font-medium">{service.label}</span>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Final Comments */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            Anything else you'd like to tell us?
            <FormTooltip content="This is your space to share anything we haven't asked about. No detail is too small!" />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Share any additional requirements, questions, or special requests.
          </p>

          <Textarea
            value={formData.additionalComments || ""}
            onChange={(e) => updateFormData({ additionalComments: e.target.value })}
            placeholder="e.g., I need my site to integrate with specific software, I have accessibility requirements, I want to phase the project, etc."
            rows={5}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={nextStep}>
          Review & Submit <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
