"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FormTooltip } from "@/components/intake/form-tooltip";
import { ArrowLeft, ArrowRight, Users, Globe, Plus, X, ExternalLink } from "lucide-react";
import type { IntakeFormData } from "@/hooks/use-intake-form";

interface StepProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

interface CompetitorEntry {
  url: string;
  notes: string;
}

interface InspirationEntry {
  url: string;
  likes: string;
}

export function Step8Competitors({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const [competitors, setCompetitors] = useState<CompetitorEntry[]>(
    formData.competitors || [{ url: "", notes: "" }]
  );
  const [inspirations, setInspirations] = useState<InspirationEntry[]>(
    formData.inspirations || [{ url: "", likes: "" }]
  );

  const addCompetitor = () => {
    const updated = [...competitors, { url: "", notes: "" }];
    setCompetitors(updated);
    updateFormData({ competitors: updated });
  };

  const removeCompetitor = (index: number) => {
    const updated = competitors.filter((_, i) => i !== index);
    setCompetitors(updated);
    updateFormData({ competitors: updated });
  };

  const updateCompetitor = (index: number, field: keyof CompetitorEntry, value: string) => {
    const updated = [...competitors];
    updated[index][field] = value;
    setCompetitors(updated);
    updateFormData({ competitors: updated });
  };

  const addInspiration = () => {
    const updated = [...inspirations, { url: "", likes: "" }];
    setInspirations(updated);
    updateFormData({ inspirations: updated });
  };

  const removeInspiration = (index: number) => {
    const updated = inspirations.filter((_, i) => i !== index);
    setInspirations(updated);
    updateFormData({ inspirations: updated });
  };

  const updateInspiration = (index: number, field: keyof InspirationEntry, value: string) => {
    const updated = [...inspirations];
    updated[index][field] = value;
    setInspirations(updated);
    updateFormData({ inspirations: updated });
  };

  return (
    <div className="space-y-6">
      {/* Competitors Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Who are your main competitors?
            <FormTooltip content="Understanding your competition helps us identify industry standards and opportunities to make your site stand out." />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Share competitor websites so we can understand your industry and help differentiate your brand.
          </p>

          <div className="space-y-4">
            {competitors.map((competitor, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Competitor {index + 1}</Label>
                  {competitors.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCompetitor(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div>
                  <Label htmlFor={`competitor-url-${index}`} className="text-sm">
                    Website URL
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id={`competitor-url-${index}`}
                      value={competitor.url}
                      onChange={(e) => updateCompetitor(index, "url", e.target.value)}
                      placeholder="www.competitor.com"
                      className="flex-1"
                    />
                    {competitor.url && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={`https://${competitor.url.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor={`competitor-notes-${index}`} className="text-sm">
                    What do you like/dislike about their site?
                  </Label>
                  <Textarea
                    id={`competitor-notes-${index}`}
                    value={competitor.notes}
                    onChange={(e) => updateCompetitor(index, "notes", e.target.value)}
                    placeholder="e.g., Great layout but outdated design, good product pages, confusing navigation..."
                    rows={2}
                    className="mt-1"
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={addCompetitor}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Another Competitor
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inspiration Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Websites you admire
            <FormTooltip content="These don't have to be in your industry! Share any sites whose design, features, or user experience you'd like to emulate." />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Share websites you like - from any industry. This helps us understand your style preferences.
          </p>

          <div className="space-y-4">
            {inspirations.map((inspiration, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Inspiration {index + 1}</Label>
                  {inspirations.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInspiration(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div>
                  <Label htmlFor={`inspiration-url-${index}`} className="text-sm">
                    Website URL
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id={`inspiration-url-${index}`}
                      value={inspiration.url}
                      onChange={(e) => updateInspiration(index, "url", e.target.value)}
                      placeholder="www.example.com"
                      className="flex-1"
                    />
                    {inspiration.url && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={`https://${inspiration.url.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor={`inspiration-likes-${index}`} className="text-sm">
                    What specifically do you like about it?
                  </Label>
                  <Textarea
                    id={`inspiration-likes-${index}`}
                    value={inspiration.likes}
                    onChange={(e) => updateInspiration(index, "likes", e.target.value)}
                    placeholder="e.g., Love the clean layout, the animations, the color scheme, how easy it is to navigate..."
                    rows={2}
                    className="mt-1"
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={addInspiration}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Another Website
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Industry Standards */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            What makes you different from competitors?
            <FormTooltip content="Your unique value proposition helps us highlight what makes you special and stand out from the competition." />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Tell us what sets your business apart. This helps us position you effectively.
          </p>

          <Textarea
            value={formData.uniqueValue || ""}
            onChange={(e) => updateFormData({ uniqueValue: e.target.value })}
            placeholder="e.g., We've been in business for 30 years, we offer same-day service, our products are eco-friendly, we specialize in custom solutions..."
            rows={4}
          />
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
