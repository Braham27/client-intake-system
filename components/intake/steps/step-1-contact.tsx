"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { FormTooltip } from "@/components/intake/form-tooltip";
import { INDUSTRIES } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { IntakeFormData } from "@/hooks/use-intake-form";

interface StepProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export function Step1Contact({ formData, updateFormData, nextStep }: StepProps) {
  const isValid = 
    formData.contactFirstName && 
    formData.contactLastName && 
    formData.contactEmail && 
    formData.businessName;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Your Contact Information
                <FormTooltip content="We'll use this to communicate with you about your project and send important updates." />
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactFirstName">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactFirstName"
                    placeholder="John"
                    value={formData.contactFirstName}
                    onChange={(e) => updateFormData({ contactFirstName: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactLastName">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactLastName"
                    placeholder="Smith"
                    value={formData.contactLastName}
                    onChange={(e) => updateFormData({ contactLastName: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.contactEmail}
                    onChange={(e) => updateFormData({ contactEmail: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={formData.contactPhone}
                    onChange={(e) => updateFormData({ contactPhone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <hr />

            {/* Business Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Your Business Information
                <FormTooltip content="Tell us about your business so we can better understand your needs and create a website that truly represents your brand." />
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">
                    Business Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="businessName"
                    placeholder="Acme Corporation"
                    value={formData.businessName}
                    onChange={(e) => updateFormData({ businessName: e.target.value })}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => updateFormData({ industry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="yearsInBusiness">Years in Business</Label>
                    <Select
                      value={formData.yearsInBusiness}
                      onValueChange={(value) => updateFormData({ yearsInBusiness: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Just starting</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Input
                    id="businessAddress"
                    placeholder="123 Main Street"
                    value={formData.businessAddress}
                    onChange={(e) => updateFormData({ businessAddress: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessCity">City</Label>
                    <Input
                      id="businessCity"
                      placeholder="New York"
                      value={formData.businessCity}
                      onChange={(e) => updateFormData({ businessCity: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessState">State/Province</Label>
                    <Input
                      id="businessState"
                      placeholder="NY"
                      value={formData.businessState}
                      onChange={(e) => updateFormData({ businessState: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessZip">ZIP/Postal Code</Label>
                    <Input
                      id="businessZip"
                      placeholder="10001"
                      value={formData.businessZip}
                      onChange={(e) => updateFormData({ businessZip: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessCountry">Country</Label>
                    <Input
                      id="businessCountry"
                      placeholder="USA"
                      value={formData.businessCountry}
                      onChange={(e) => updateFormData({ businessCountry: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessDescription" className="flex items-center gap-2">
                    Tell us about your business
                    <FormTooltip content="What does your company do? What products or services do you offer? What makes you unique?" />
                  </Label>
                  <Textarea
                    id="businessDescription"
                    placeholder="Describe your business, what you do, your mission, and what sets you apart from competitors..."
                    className="min-h-[120px]"
                    value={formData.businessDescription}
                    onChange={(e) => updateFormData({ businessDescription: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button onClick={nextStep} disabled={!isValid} size="lg">
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
