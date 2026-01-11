"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { FormTooltip } from "@/components/intake/form-tooltip";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DESIGN_STYLES } from "@/lib/utils";
import type { IntakeFormData } from "@/hooks/use-intake-form";

interface StepProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export function Step4Design({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  return (
    <div className="space-y-6">
      {/* Existing Branding */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={formData.hasExistingBranding}
                onCheckedChange={(checked) => updateFormData({ hasExistingBranding: Boolean(checked) })}
                className="mt-1"
              />
              <div>
                <span className="font-semibold text-lg flex items-center gap-2">
                  I already have established branding
                  <FormTooltip content="This includes logos, specific colors, fonts, or brand guidelines that we should use for your website." />
                </span>
                <p className="text-sm text-muted-foreground">
                  We'll incorporate your existing logo, colors, and brand guidelines.
                </p>
              </div>
            </label>

            {formData.hasExistingBranding && (
              <div className="ml-7 pl-4 border-l-2 border-primary/20 space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="brandColors" className="flex items-center gap-2">
                    What are your brand colors?
                    <FormTooltip content="List your primary and secondary colors. You can provide hex codes (#FF5733) or color names." />
                  </Label>
                  <Textarea
                    id="brandColors"
                    placeholder="e.g., 'Primary: Navy Blue (#003366), Secondary: Gold (#FFD700), Accent: White'"
                    value={formData.brandColors}
                    onChange={(e) => updateFormData({ brandColors: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandFonts">What fonts does your brand use?</Label>
                  <Textarea
                    id="brandFonts"
                    placeholder="e.g., 'Montserrat for headings, Open Sans for body text'"
                    value={formData.brandFonts}
                    onChange={(e) => updateFormData({ brandFonts: e.target.value })}
                  />
                </div>

                <p className="text-sm text-muted-foreground">
                  💡 <strong>Tip:</strong> You can upload your logo and brand guidelines in the Content step.
                </p>
              </div>
            )}

            {!formData.hasExistingBranding && (
              <p className="ml-7 text-sm text-muted-foreground">
                No worries! We can help create a brand identity for you, or work with your preferences below.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Design Style */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            What design style appeals to you?
            <FormTooltip content="Choose the overall feel and aesthetic you want for your website. This helps us understand your taste and create something you'll love." />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select the style that best represents the look and feel you want.
          </p>

          <RadioGroup
            value={formData.designStyle}
            onValueChange={(value) => updateFormData({ designStyle: value })}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {DESIGN_STYLES.map((style) => (
              <label
                key={style.value}
                className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  formData.designStyle === style.value
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value={style.value} className="mt-1" />
                <div>
                  <span className="font-medium">{style.label}</span>
                  <p className="text-sm text-muted-foreground">{style.description}</p>
                </div>
              </label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Website Examples */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="websiteExamples" className="flex items-center gap-2">
                Share websites you like (inspiration)
                <FormTooltip content="List 2-5 websites (any industry) that you find visually appealing. This helps us understand your preferences better than words alone." />
              </Label>
              <Textarea
                id="websiteExamples"
                placeholder="Enter website URLs, one per line:&#10;https://example1.com&#10;https://example2.com&#10;https://example3.com"
                className="min-h-[100px]"
                value={formData.websiteExamples}
                onChange={(e) => updateFormData({ websiteExamples: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteExamplesNotes" className="flex items-center gap-2">
                What do you like about these websites?
                <FormTooltip content="Be specific! Is it the colors, the layout, the animations, the photography style, the navigation? The more detail, the better." />
              </Label>
              <Textarea
                id="websiteExamplesNotes"
                placeholder="e.g., 'I love the clean layout of the first site', 'The way the second site uses images is really engaging', 'The third site has great navigation'..."
                value={formData.websiteExamplesNotes}
                onChange={(e) => updateFormData({ websiteExamplesNotes: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avoidDesignElements" className="flex items-center gap-2">
                Are there any design elements you want to avoid?
                <FormTooltip content="Tell us what you DON'T want. Certain colors? Styles? Features? This is just as important as what you do want!" />
              </Label>
              <Textarea
                id="avoidDesignElements"
                placeholder="e.g., 'No dark themes', 'Don't want lots of animations', 'Avoid stock photos of people shaking hands', 'No auto-playing videos'..."
                value={formData.avoidDesignElements}
                onChange={(e) => updateFormData({ avoidDesignElements: e.target.value })}
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
