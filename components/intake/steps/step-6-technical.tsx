"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { FormTooltip } from "@/components/intake/form-tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Globe, Server, Link as LinkIcon } from "lucide-react";
import type { IntakeFormData } from "@/hooks/use-intake-form";

interface StepProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export function Step6Technical({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  return (
    <div className="space-y-6">
      {/* Domain Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Domain Name (Website Address)
            <FormTooltip content="Your domain is your website's address on the internet (e.g., www.yourbusiness.com). It's how customers find you online." />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your domain is your website address (e.g., www.yourcompany.com)
          </p>

          <RadioGroup
            value={formData.domainStatus}
            onValueChange={(value) => updateFormData({ domainStatus: value })}
            className="space-y-3 mb-4"
          >
            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                formData.domainStatus === "have_domain"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="have_domain" className="mt-1" />
              <div>
                <span className="font-medium">I already have a domain</span>
                <p className="text-sm text-muted-foreground">
                  You own a domain and want to use it for the new site.
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                formData.domainStatus === "need_domain"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="need_domain" className="mt-1" />
              <div>
                <span className="font-medium">I need a new domain</span>
                <p className="text-sm text-muted-foreground">
                  We'll help you find and register a domain. (~$15/year)
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                formData.domainStatus === "not_sure"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="not_sure" className="mt-1" />
              <div>
                <span className="font-medium">Not sure / Need help deciding</span>
                <p className="text-sm text-muted-foreground">
                  We'll discuss options during the consultation.
                </p>
              </div>
            </label>
          </RadioGroup>

          {formData.domainStatus === "have_domain" && (
            <div className="space-y-4 mt-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <Label htmlFor="existingDomain" className="flex items-center gap-2 mb-2">
                  Your current domain
                  <FormTooltip content="Enter your existing website address exactly as it appears." />
                </Label>
                <Input
                  id="existingDomain"
                  value={formData.existingDomain || ""}
                  onChange={(e) => updateFormData({ existingDomain: e.target.value })}
                  placeholder="www.yourdomain.com"
                />
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="needsDomainTransfer"
                  checked={formData.needsDomainTransfer || false}
                  onCheckedChange={(checked) =>
                    updateFormData({ needsDomainTransfer: checked as boolean })
                  }
                />
                <Label htmlFor="needsDomainTransfer" className="flex items-center gap-2 cursor-pointer">
                  I need help transferring my domain
                  <FormTooltip content="If your domain is at another provider and you'd like us to manage it, we can help with the transfer." />
                </Label>
              </div>
            </div>
          )}

          {formData.domainStatus === "need_domain" && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <Label htmlFor="preferredDomain" className="flex items-center gap-2 mb-2">
                Preferred domain name (if you have one in mind)
                <FormTooltip content="Tell us your ideal domain. We'll check availability and suggest alternatives if needed." />
              </Label>
              <Input
                id="preferredDomain"
                value={formData.preferredDomain || ""}
                onChange={(e) => updateFormData({ preferredDomain: e.target.value })}
                placeholder="e.g., mybusiness.com or yourbrand.io"
              />
              <p className="text-sm text-muted-foreground mt-2">
                We'll check availability and suggest alternatives if your first choice isn't available.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hosting Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Website Hosting
            <FormTooltip content="Hosting is where your website files 'live' on the internet. Think of it like renting space on a computer that's always connected to the internet." />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Hosting is where your website files are stored and served to visitors.
          </p>

          <RadioGroup
            value={formData.hostingStatus}
            onValueChange={(value) => updateFormData({ hostingStatus: value })}
            className="space-y-3 mb-4"
          >
            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                formData.hostingStatus === "have_hosting"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="have_hosting" className="mt-1" />
              <div>
                <span className="font-medium">I have hosting already</span>
                <p className="text-sm text-muted-foreground">
                  You have a hosting provider and can provide access credentials.
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                formData.hostingStatus === "need_hosting"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="need_hosting" className="mt-1" />
              <div>
                <span className="font-medium">I need hosting</span>
                <p className="text-sm text-muted-foreground">
                  We'll set up hosting for you. Starts at ~$15-50/month depending on needs.
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                formData.hostingStatus === "use_our_hosting"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="use_our_hosting" className="mt-1" />
              <div>
                <span className="font-medium">Use your managed hosting</span>
                <p className="text-sm text-muted-foreground">
                  We handle hosting, security, and updates. Included in maintenance plans.
                </p>
              </div>
            </label>
          </RadioGroup>

          {formData.hostingStatus === "have_hosting" && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg space-y-4">
              <div>
                <Label htmlFor="hostingProvider" className="flex items-center gap-2 mb-2">
                  Your hosting provider
                  <FormTooltip content="Common providers include GoDaddy, Bluehost, SiteGround, AWS, etc." />
                </Label>
                <Input
                  id="hostingProvider"
                  value={formData.hostingProvider || ""}
                  onChange={(e) => updateFormData({ hostingProvider: e.target.value })}
                  placeholder="e.g., GoDaddy, SiteGround, AWS, etc."
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Website Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-primary" />
            Existing Website
            <FormTooltip content="If you have a current website, we'll need to plan for migration or replacement." />
          </h3>

          <RadioGroup
            value={formData.hasExistingWebsite}
            onValueChange={(value) => updateFormData({ hasExistingWebsite: value })}
            className="space-y-3 mb-4"
          >
            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                formData.hasExistingWebsite === "yes"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="yes" className="mt-1" />
              <div>
                <span className="font-medium">Yes, I have an existing website</span>
                <p className="text-sm text-muted-foreground">
                  This will be a redesign or replacement project.
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                formData.hasExistingWebsite === "no"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="no" className="mt-1" />
              <div>
                <span className="font-medium">No, this is a brand new website</span>
                <p className="text-sm text-muted-foreground">
                  Starting fresh without an existing site.
                </p>
              </div>
            </label>
          </RadioGroup>

          {formData.hasExistingWebsite === "yes" && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg space-y-4">
              <div>
                <Label htmlFor="existingWebsiteUrl" className="flex items-center gap-2 mb-2">
                  Current website URL
                </Label>
                <Input
                  id="existingWebsiteUrl"
                  value={formData.existingWebsiteUrl || ""}
                  onChange={(e) => updateFormData({ existingWebsiteUrl: e.target.value })}
                  placeholder="www.currentsite.com"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  What platform is your current site built on?
                  <FormTooltip content="Knowing this helps us plan the migration process." />
                </Label>
                <Select
                  value={formData.existingPlatform || ""}
                  onValueChange={(value) => updateFormData({ existingPlatform: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform (if known)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wordpress">WordPress</SelectItem>
                    <SelectItem value="wix">Wix</SelectItem>
                    <SelectItem value="squarespace">Squarespace</SelectItem>
                    <SelectItem value="shopify">Shopify</SelectItem>
                    <SelectItem value="weebly">Weebly</SelectItem>
                    <SelectItem value="custom">Custom Built</SelectItem>
                    <SelectItem value="unknown">Don't know</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="migrateContent"
                  checked={formData.migrateContent || false}
                  onCheckedChange={(checked) =>
                    updateFormData({ migrateContent: checked as boolean })
                  }
                />
                <Label htmlFor="migrateContent" className="flex items-center gap-2 cursor-pointer">
                  Migrate content from old site
                  <FormTooltip content="We can transfer text, images, and other content from your existing site to the new one." />
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="preserveSeo"
                  checked={formData.preserveSeo || false}
                  onCheckedChange={(checked) =>
                    updateFormData({ preserveSeo: checked as boolean })
                  }
                />
                <Label htmlFor="preserveSeo" className="flex items-center gap-2 cursor-pointer">
                  Preserve SEO / Search rankings
                  <FormTooltip content="We'll set up proper redirects to maintain your search engine rankings." />
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SSL Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Checkbox
              id="needSsl"
              checked={formData.needSsl ?? true}
              onCheckedChange={(checked) =>
                updateFormData({ needSsl: checked as boolean })
              }
            />
            <div>
              <Label htmlFor="needSsl" className="flex items-center gap-2 cursor-pointer text-base font-semibold">
                SSL Certificate (HTTPS Security)
                <FormTooltip content="SSL makes your site secure with the padlock icon. It's essential for trust and SEO. Most hosting includes free SSL." />
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Required for secure connections. Shows the padlock 🔒 in browsers. Usually included free with hosting.
              </p>
            </div>
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
