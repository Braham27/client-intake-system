"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { FormTooltip } from "@/components/intake/form-tooltip";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { IntakeFormData } from "@/hooks/use-intake-form";

interface StepProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const websiteGoalOptions = [
  { value: "generate-leads", label: "Generate Leads", description: "Capture potential customer information" },
  { value: "sell-products", label: "Sell Products/Services", description: "E-commerce or service bookings" },
  { value: "provide-info", label: "Provide Information", description: "Share content and resources" },
  { value: "build-brand", label: "Build Brand Awareness", description: "Establish online presence" },
  { value: "customer-support", label: "Customer Support", description: "Help existing customers" },
  { value: "showcase-portfolio", label: "Showcase Portfolio", description: "Display work and projects" },
  { value: "community", label: "Build Community", description: "Forums, membership areas" },
  { value: "other", label: "Other", description: "Something else" },
];

export function Step2Goals({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const toggleGoal = (goal: string) => {
    const current = formData.websiteGoals || [];
    if (current.includes(goal)) {
      updateFormData({ websiteGoals: current.filter((g) => g !== goal) });
    } else {
      updateFormData({ websiteGoals: [...current, goal] });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Website Goals */}
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                What are your main goals for this website?
                <FormTooltip content="Understanding your goals helps us design a website that actually achieves what you need. Select all that apply." />
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select all that apply. This helps us prioritize features and design decisions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {websiteGoalOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      formData.websiteGoals?.includes(option.value)
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    }`}
                  >
                    <Checkbox
                      checked={formData.websiteGoals?.includes(option.value)}
                      onCheckedChange={() => toggleGoal(option.value)}
                    />
                    <div>
                      <span className="font-medium">{option.label}</span>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <hr />

            {/* Primary Purpose */}
            <div className="space-y-2">
              <Label htmlFor="primaryPurpose" className="flex items-center gap-2">
                What is the single most important thing this website should do?
                <FormTooltip content="If someone visits your site, what's the #1 action you want them to take? Buy something? Contact you? Sign up?" />
              </Label>
              <Textarea
                id="primaryPurpose"
                placeholder="e.g., 'Get visitors to request a free quote' or 'Convince people to book a consultation call'"
                value={formData.primaryPurpose}
                onChange={(e) => updateFormData({ primaryPurpose: e.target.value })}
              />
            </div>

            {/* Why New Website */}
            <div className="space-y-2">
              <Label htmlFor="whyNewWebsite" className="flex items-center gap-2">
                Why do you want a new website?
                <FormTooltip content="Are you starting fresh, or replacing an existing site? What's driving this decision now?" />
              </Label>
              <Textarea
                id="whyNewWebsite"
                placeholder="e.g., 'Our current site is outdated', 'We're launching a new business', 'We need better lead generation'..."
                value={formData.whyNewWebsite}
                onChange={(e) => updateFormData({ whyNewWebsite: e.target.value })}
              />
            </div>

            {/* Current Website */}
            <div className="space-y-2">
              <Label htmlFor="currentWebsiteUrl" className="flex items-center gap-2">
                Current Website URL (if any)
                <FormTooltip content="If you have an existing website, share the link so we can review it and understand what needs improvement." />
              </Label>
              <Input
                id="currentWebsiteUrl"
                type="url"
                placeholder="https://www.yourwebsite.com"
                value={formData.currentWebsiteUrl}
                onChange={(e) => updateFormData({ currentWebsiteUrl: e.target.value })}
              />
            </div>

            {/* Current Challenges */}
            <div className="space-y-2">
              <Label htmlFor="currentChallenges" className="flex items-center gap-2">
                What challenges or problems do you face with your current online presence?
                <FormTooltip content="What's not working? Low traffic? Poor conversions? Outdated design? Hard to update? Understanding the pain points helps us solve them." />
              </Label>
              <Textarea
                id="currentChallenges"
                placeholder="e.g., 'Our site looks unprofessional', 'We don't show up in Google searches', 'Customers can't easily find information'..."
                value={formData.currentChallenges}
                onChange={(e) => updateFormData({ currentChallenges: e.target.value })}
              />
            </div>

            <hr />

            {/* Target Audience */}
            <div className="space-y-2">
              <Label htmlFor="targetAudience" className="flex items-center gap-2">
                Who is your target audience?
                <FormTooltip content="Describe your ideal customers. Age, interests, problems they have, what they're looking for. This shapes the entire design and messaging." />
              </Label>
              <Textarea
                id="targetAudience"
                placeholder="e.g., 'Small business owners aged 35-55 who need accounting help', 'Young professionals looking for fitness coaching', 'Homeowners needing renovation services'..."
                className="min-h-[100px]"
                value={formData.targetAudience}
                onChange={(e) => updateFormData({ targetAudience: e.target.value })}
              />
            </div>

            {/* Unique Selling Points */}
            <div className="space-y-2">
              <Label htmlFor="uniqueSellingPoints" className="flex items-center gap-2">
                What makes your business unique?
                <FormTooltip content="What sets you apart from competitors? Why should customers choose you? This helps us highlight your strengths on the website." />
              </Label>
              <Textarea
                id="uniqueSellingPoints"
                placeholder="e.g., '20 years of experience', 'Only local provider offering same-day service', 'Award-winning customer support'..."
                className="min-h-[100px]"
                value={formData.uniqueSellingPoints}
                onChange={(e) => updateFormData({ uniqueSellingPoints: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} size="lg">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        <Button onClick={nextStep} size="lg">
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
