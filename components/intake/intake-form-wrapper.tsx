"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Save, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FORM_STEPS } from "@/lib/utils";
import { useIntakeForm } from "@/hooks/use-intake-form";

// Step Components
import { Step1Contact } from "./steps/step-1-contact";
import { Step2Goals } from "./steps/step-2-goals";
import { Step3Features } from "./steps/step-3-features";
import { Step4Design } from "./steps/step-4-design";
import { Step5Content } from "./steps/step-5-content";
import { Step6Technical } from "./steps/step-6-technical";
import { Step7Timeline } from "./steps/step-7-timeline";
import { Step8Competitors } from "./steps/step-8-competitors";
import { Step9Services } from "./steps/step-9-services";
import { Step10Review } from "./steps/step-10-review";

export function IntakeFormWrapper() {
  const {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    saveProgress,
    isLoading,
    isSaving,
    resumeToken,
  } = useIntakeForm();

  const progressPercentage = (currentStep / FORM_STEPS.length) * 100;

  const renderStep = () => {
    const stepProps = { formData, updateFormData, nextStep, prevStep };
    
    switch (currentStep) {
      case 1:
        return <Step1Contact {...stepProps} />;
      case 2:
        return <Step2Goals {...stepProps} />;
      case 3:
        return <Step3Features {...stepProps} />;
      case 4:
        return <Step4Design {...stepProps} />;
      case 5:
        return <Step5Content {...stepProps} />;
      case 6:
        return <Step6Technical {...stepProps} />;
      case 7:
        return <Step7Timeline {...stepProps} />;
      case 8:
        return <Step8Competitors {...stepProps} />;
      case 9:
        return <Step9Services {...stepProps} />;
      case 10:
        return <Step10Review {...stepProps} formData={formData} />;
      default:
        return <Step1Contact {...stepProps} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>

            <Link href="/" className="text-xl font-bold gradient-text">
              WebCraft
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={saveProgress}
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Progress"}
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Section */}
      <div className="bg-background border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {FORM_STEPS.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          
          {/* Step Indicators */}
          <div className="hidden md:flex justify-between mt-4">
            {FORM_STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => goToStep(step.id)}
                className={`flex flex-col items-center gap-1 group ${
                  step.id <= currentStep ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                }`}
                disabled={step.id > currentStep}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    step.id === currentStep
                      ? "bg-primary text-primary-foreground"
                      : step.id < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.id < currentStep ? "✓" : step.id}
                </div>
                <span className={`text-xs ${step.id === currentStep ? "font-medium" : "text-muted-foreground"}`}>
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Step Title */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {FORM_STEPS[currentStep - 1].title}
            </h1>
            <p className="text-muted-foreground">
              {FORM_STEPS[currentStep - 1].description}
            </p>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Help Button */}
      <Link href="/schedule">
        <Button
          variant="outline"
          size="lg"
          className="fixed bottom-6 right-6 shadow-lg"
        >
          <HelpCircle className="h-5 w-5 mr-2" />
          Need Help? Book a Call
        </Button>
      </Link>
    </div>
  );
}
