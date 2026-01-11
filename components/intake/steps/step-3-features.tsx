"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { FormTooltip } from "@/components/intake/form-tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import { PRODUCT_COUNT_OPTIONS, PAYMENT_GATEWAYS } from "@/lib/utils";
import type { IntakeFormData } from "@/hooks/use-intake-form";

interface StepProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const featureOptions = [
  { id: "needsContactForm", label: "Contact Form", description: "Let visitors send you messages" },
  { id: "needsBlog", label: "Blog / News Section", description: "Share articles and updates" },
  { id: "needsGallery", label: "Photo Gallery / Portfolio", description: "Showcase images or work" },
  { id: "needsSocialMedia", label: "Social Media Integration", description: "Links to your social profiles" },
  { id: "needsCalendar", label: "Events Calendar / Booking", description: "Show events or allow bookings" },
  { id: "needsSearch", label: "Site Search", description: "Let users search your content" },
  { id: "needsNewsletter", label: "Newsletter Signup", description: "Collect email subscribers" },
  { id: "needsLiveChat", label: "Live Chat / Chatbot", description: "Real-time visitor support" },
  { id: "needsAnalytics", label: "Analytics Tracking", description: "Track visitor behavior" },
  { id: "needsMultiLanguage", label: "Multiple Languages", description: "Site in more than one language" },
];

export function Step3Features({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const togglePaymentGateway = (gateway: string) => {
    const current = formData.paymentGateways || [];
    if (current.includes(gateway)) {
      updateFormData({ paymentGateways: current.filter((g) => g !== gateway) });
    } else {
      updateFormData({ paymentGateways: [...current, gateway] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Features */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            What features does your website need?
            <FormTooltip content="Check all the features you'd like on your website. Don't worry if you're not sure about some - we can discuss during our consultation." />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select all that apply. Each feature may affect the project timeline and cost.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {featureOptions.map((feature) => (
              <label
                key={feature.id}
                className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  formData[feature.id as keyof IntakeFormData]
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
              >
                <Checkbox
                  checked={Boolean(formData[feature.id as keyof IntakeFormData])}
                  onCheckedChange={(checked) => 
                    updateFormData({ [feature.id]: checked })
                  }
                />
                <div>
                  <span className="font-medium">{feature.label}</span>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor="otherFeatures">Other Features You Need</Label>
            <Textarea
              id="otherFeatures"
              placeholder="Describe any other features not listed above..."
              value={formData.otherFeatures}
              onChange={(e) => updateFormData({ otherFeatures: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* E-Commerce Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={formData.needsEcommerce}
                onCheckedChange={(checked) => updateFormData({ needsEcommerce: Boolean(checked) })}
                className="mt-1"
              />
              <div>
                <span className="font-semibold text-lg flex items-center gap-2">
                  I need to sell products or services online
                  <FormTooltip content="E-commerce functionality allows you to accept payments and sell products/services directly from your website." />
                </span>
                <p className="text-sm text-muted-foreground">
                  This includes product listings, shopping cart, checkout, and payment processing.
                </p>
              </div>
            </label>

            {formData.needsEcommerce && (
              <div className="ml-7 pl-4 border-l-2 border-primary/20 space-y-4 animate-fade-in">
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <strong>Note:</strong> E-commerce websites typically require additional development time and cost more than standard websites. We'll provide a detailed quote based on your specific requirements.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Approximately how many products will you sell?</Label>
                    <Select
                      value={formData.productCount}
                      onValueChange={(value) => updateFormData({ productCount: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRODUCT_COUNT_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>What type of products?</Label>
                    <Select
                      value={formData.productTypes}
                      onValueChange={(value) => updateFormData({ productTypes: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical">Physical Products (need shipping)</SelectItem>
                        <SelectItem value="digital">Digital Products (downloads)</SelectItem>
                        <SelectItem value="services">Services (appointments, consultations)</SelectItem>
                        <SelectItem value="mixed">Mix of the above</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    Which payment methods do you want to accept?
                    <FormTooltip content="Different payment gateways have different fees and features. We can help you choose the best option." />
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {PAYMENT_GATEWAYS.map((gateway) => (
                      <label
                        key={gateway.value}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                          formData.paymentGateways?.includes(gateway.value)
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                      >
                        <Checkbox
                          checked={formData.paymentGateways?.includes(gateway.value)}
                          onCheckedChange={() => togglePaymentGateway(gateway.value)}
                        />
                        <span>{gateway.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer">
                    <Checkbox
                      checked={formData.needsInventory}
                      onCheckedChange={(checked) => updateFormData({ needsInventory: Boolean(checked) })}
                      className="mt-1"
                    />
                    <div>
                      <span className="font-medium">Inventory Management</span>
                      <p className="text-sm text-muted-foreground">Track stock levels automatically</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer">
                    <Checkbox
                      checked={formData.needsShipping}
                      onCheckedChange={(checked) => updateFormData({ needsShipping: Boolean(checked) })}
                      className="mt-1"
                    />
                    <div>
                      <span className="font-medium">Shipping Calculator</span>
                      <p className="text-sm text-muted-foreground">Calculate shipping costs at checkout</p>
                    </div>
                  </label>
                </div>

                {formData.needsShipping && (
                  <div className="space-y-2">
                    <Label htmlFor="shippingRegions">Where do you ship to?</Label>
                    <Textarea
                      id="shippingRegions"
                      placeholder="e.g., 'United States only', 'North America', 'Worldwide'..."
                      value={formData.shippingRegions}
                      onChange={(e) => updateFormData({ shippingRegions: e.target.value })}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="ecommercePlatform">Do you have a preferred e-commerce platform?</Label>
                  <Select
                    value={formData.ecommercePlatform}
                    onValueChange={(value) => updateFormData({ ecommercePlatform: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select or let us recommend" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-preference">No preference - recommend for me</SelectItem>
                      <SelectItem value="woocommerce">WooCommerce (WordPress)</SelectItem>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="custom">Custom Solution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Membership Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={formData.needsMembership}
                onCheckedChange={(checked) => updateFormData({ needsMembership: Boolean(checked) })}
                className="mt-1"
              />
              <div>
                <span className="font-semibold text-lg flex items-center gap-2">
                  I need a membership or members-only area
                  <FormTooltip content="Membership features allow users to create accounts and access exclusive content or features. This can be free or paid." />
                </span>
                <p className="text-sm text-muted-foreground">
                  Users can sign up, log in, and access exclusive content or features.
                </p>
              </div>
            </label>

            {formData.needsMembership && (
              <div className="ml-7 pl-4 border-l-2 border-primary/20 space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="membershipContent">What content or features will be for members only?</Label>
                  <Textarea
                    id="membershipContent"
                    placeholder="e.g., 'Premium video tutorials', 'Download area for resources', 'Community forum', 'Private blog posts'..."
                    value={formData.membershipContent}
                    onChange={(e) => updateFormData({ membershipContent: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Will membership be paid or free?</Label>
                  <RadioGroup
                    value={formData.membershipPaid ? "paid" : "free"}
                    onValueChange={(value) => updateFormData({ membershipPaid: value === "paid" })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="free" id="membership-free" />
                      <Label htmlFor="membership-free" className="cursor-pointer">
                        Free - users just need to register
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paid" id="membership-paid" />
                      <Label htmlFor="membership-paid" className="cursor-pointer">
                        Paid - users pay to access
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.membershipPaid && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="membershipTiers">Describe your membership tiers/levels</Label>
                      <Textarea
                        id="membershipTiers"
                        placeholder="e.g., 'Basic ($10/month) - access to articles, Premium ($25/month) - access to everything including courses'..."
                        value={formData.membershipTiers}
                        onChange={(e) => updateFormData({ membershipTiers: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Preferred payment method for subscriptions</Label>
                      <Select
                        value={formData.membershipPayment}
                        onValueChange={(value) => updateFormData({ membershipPayment: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stripe">Stripe</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="both">Both Stripe and PayPal</SelectItem>
                          <SelectItem value="other">Other (specify in notes)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            )}
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
