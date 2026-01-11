"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { FormTooltip } from "@/components/intake/form-tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Calendar, DollarSign, Clock } from "lucide-react";
import type { IntakeFormData } from "@/hooks/use-intake-form";

interface StepProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const BUDGET_RANGES = [
  { value: "under_1000", label: "Under $1,000", description: "Simple single-page or landing page" },
  { value: "1000_3000", label: "$1,000 - $3,000", description: "Small business site (5-10 pages)" },
  { value: "3000_7000", label: "$3,000 - $7,000", description: "Professional site with custom design" },
  { value: "7000_15000", label: "$7,000 - $15,000", description: "Complex site with advanced features" },
  { value: "15000_30000", label: "$15,000 - $30,000", description: "E-commerce or membership platform" },
  { value: "over_30000", label: "$30,000+", description: "Enterprise solution or web application" },
  { value: "discuss", label: "Let's discuss", description: "I'd like to discuss options" },
];

const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible", description: "Rush delivery (may affect pricing)" },
  { value: "1_month", label: "Within 1 month", description: "Quick turnaround" },
  { value: "2_3_months", label: "2-3 months", description: "Standard timeline" },
  { value: "3_6_months", label: "3-6 months", description: "Flexible timeline" },
  { value: "no_rush", label: "No specific deadline", description: "When it's ready" },
  { value: "specific_date", label: "Specific date", description: "I have a deadline in mind" },
];

export function Step7Timeline({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  return (
    <div className="space-y-6">
      {/* Budget Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            What is your budget for this project?
            <FormTooltip content="Your budget helps us recommend the right solution for you. We'll work to maximize value within your range. All budgets are welcome!" />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            This helps us recommend the right solution and features. Don't worry - we'll work with your budget!
          </p>

          <RadioGroup
            value={formData.budget}
            onValueChange={(value) => updateFormData({ budget: value })}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {BUDGET_RANGES.map((budget) => (
              <label
                key={budget.value}
                className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  formData.budget === budget.value
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value={budget.value} className="mt-1" />
                <div>
                  <span className="font-medium">{budget.label}</span>
                  <p className="text-sm text-muted-foreground">
                    {budget.description}
                  </p>
                </div>
              </label>
            ))}
          </RadioGroup>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>💡 Tip:</strong> Complex features like e-commerce, memberships, or custom integrations 
              typically require higher budgets. We'll provide a detailed quote based on your requirements.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            What is your target timeline?
            <FormTooltip content="Let us know when you need your site ready. Rush projects are possible but may require prioritization fees." />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            When do you need your new website to go live?
          </p>

          <RadioGroup
            value={formData.timeline}
            onValueChange={(value) => updateFormData({ timeline: value })}
            className="space-y-3 mb-4"
          >
            {TIMELINE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  formData.timeline === option.value
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value={option.value} className="mt-1" />
                <div>
                  <span className="font-medium">{option.label}</span>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </label>
            ))}
          </RadioGroup>

          {formData.timeline === "specific_date" && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <Label htmlFor="launchDate" className="flex items-center gap-2 mb-2">
                Target launch date
                <FormTooltip content="When do you want your website to be live? We'll work backwards from this date." />
              </Label>
              <Input
                id="launchDate"
                type="date"
                value={formData.launchDate || ""}
                onChange={(e) => updateFormData({ launchDate: e.target.value })}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Is there a specific event or reason for this date?
              </p>
              <Textarea
                value={formData.launchReason || ""}
                onChange={(e) => updateFormData({ launchReason: e.target.value })}
                placeholder="e.g., Product launch, business opening, marketing campaign..."
                className="mt-2"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Urgency & Flexibility */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Priority Level
            <FormTooltip content="This helps us understand how to schedule your project relative to others." />
          </h3>

          <Select
            value={formData.priority || ""}
            onValueChange={(value) => updateFormData({ priority: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="How urgent is this project?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High Priority - This is critical for my business</SelectItem>
              <SelectItem value="medium">Medium Priority - Important but flexible</SelectItem>
              <SelectItem value="low">Low Priority - No rush, quality over speed</SelectItem>
            </SelectContent>
          </Select>

          <div className="mt-4">
            <Label htmlFor="additionalTimingNotes" className="flex items-center gap-2 mb-2">
              Any other timing considerations?
              <FormTooltip content="Let us know about seasonal factors, upcoming events, or other timing constraints." />
            </Label>
            <Textarea
              id="additionalTimingNotes"
              value={formData.timingNotes || ""}
              onChange={(e) => updateFormData({ timingNotes: e.target.value })}
              placeholder="e.g., Our busy season is in December, so we need the site before then..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={nextStep}>
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
