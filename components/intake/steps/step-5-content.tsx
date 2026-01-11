"use client";

import { useState, useCallback } from "react";
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
import { ArrowLeft, ArrowRight, Upload, X, FileText, Image } from "lucide-react";
import { useDropzone } from "react-dropzone";
import type { IntakeFormData } from "@/hooks/use-intake-form";

interface StepProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  preview?: string;
}

export function Step5Content({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".svg", ".webp"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      {/* Content Provider */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            Who will provide the website content?
            <FormTooltip content="Website content includes all the text (copy), images, and videos that will appear on your site. Having content ready speeds up the project significantly." />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            This includes all text, images, and videos for your website.
          </p>

          <RadioGroup
            value={formData.contentProvider}
            onValueChange={(value) => updateFormData({ contentProvider: value })}
            className="space-y-3"
          >
            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                formData.contentProvider === "client"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="client" className="mt-1" />
              <div>
                <span className="font-medium">I'll provide all content</span>
                <p className="text-sm text-muted-foreground">
                  You'll write the text and provide photos/videos. We'll format and optimize them.
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                formData.contentProvider === "need_copywriting"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="need_copywriting" className="mt-1" />
              <div>
                <span className="font-medium">I need help writing content</span>
                <p className="text-sm text-muted-foreground">
                  We'll create professional copywriting for your pages. (Additional cost applies)
                </p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                formData.contentProvider === "mixed"
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
            >
              <RadioGroupItem value="mixed" className="mt-1" />
              <div>
                <span className="font-medium">Mixed - I'll provide some, need help with rest</span>
                <p className="text-sm text-muted-foreground">
                  You provide what you can, and we'll help fill in the gaps.
                </p>
              </div>
            </label>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Existing Content */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={formData.hasExistingContent}
                onCheckedChange={(checked) => updateFormData({ hasExistingContent: Boolean(checked) })}
                className="mt-1"
              />
              <div>
                <span className="font-medium">I have an existing website with content</span>
                <p className="text-sm text-muted-foreground">
                  There's content on my current site that can be reused or migrated.
                </p>
              </div>
            </label>

            {formData.hasExistingContent && (
              <div className="ml-7 pl-4 border-l-2 border-primary/20 space-y-4 animate-fade-in">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={formData.needsContentMigration}
                    onCheckedChange={(checked) => updateFormData({ needsContentMigration: Boolean(checked) })}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-medium">I need content migrated from my old site</span>
                    <p className="text-sm text-muted-foreground">
                      We'll transfer existing pages, blog posts, and media to the new site.
                    </p>
                  </div>
                </label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Photography & Images */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Images and Photography</h3>
          
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border hover:border-primary/50 transition-colors">
              <Checkbox
                checked={formData.needsPhotography}
                onCheckedChange={(checked) => updateFormData({ needsPhotography: Boolean(checked) })}
                className="mt-1"
              />
              <div>
                <span className="font-medium">I need professional photography</span>
                <p className="text-sm text-muted-foreground">
                  Product photos, team headshots, or business location shots. (Additional cost)
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border hover:border-primary/50 transition-colors">
              <Checkbox
                checked={formData.needsStockImages}
                onCheckedChange={(checked) => updateFormData({ needsStockImages: Boolean(checked) })}
                className="mt-1"
              />
              <div>
                <span className="font-medium">I need stock images sourced</span>
                <p className="text-sm text-muted-foreground">
                  We'll find high-quality stock photos that fit your brand. (Included in most packages)
                </p>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Estimated Pages */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Approximately how many pages will your website have?
              <FormTooltip content="Count main pages like Home, About, Services, Contact, etc. Blog posts and product pages are counted separately. Don't worry about being exact!" />
            </Label>
            <Select
              value={formData.estimatedPages}
              onValueChange={(value) => updateFormData({ estimatedPages: value })}
            >
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5 pages (small site)</SelectItem>
                <SelectItem value="6-10">6-10 pages (standard site)</SelectItem>
                <SelectItem value="11-20">11-20 pages (medium site)</SelectItem>
                <SelectItem value="21-50">21-50 pages (large site)</SelectItem>
                <SelectItem value="50+">50+ pages (enterprise site)</SelectItem>
                <SelectItem value="not-sure">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            Upload Files (Optional)
            <FormTooltip content="Share your logo, brand guidelines, existing content, photos, or any other materials you'd like us to use. You can also send files later." />
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload your logo, brand guidelines, photos, or any other assets. Max 10MB per file.
          </p>

          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? "active" : ""}`}
          >
            <input {...getInputProps()} />
            <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p className="font-medium">Drop the files here...</p>
            ) : (
              <>
                <p className="font-medium">Drag and drop files here, or click to browse</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Supports images, PDFs, and documents
                </p>
              </>
            )}
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted"
                >
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                  ) : file.type.includes("pdf") ? (
                    <FileText className="w-10 h-10 text-red-500" />
                  ) : (
                    <Image className="w-10 h-10 text-muted-foreground" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
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
