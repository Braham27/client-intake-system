"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Palette,
  Code,
  Rocket,
  MessageSquare,
  HeartHandshake,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Discovery & Intake",
    description:
      "Complete our comprehensive questionnaire to share your vision, goals, and requirements. We'll learn everything about your business.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Consultation",
    description:
      "We'll schedule a free consultation call to discuss your project in detail, answer questions, and align on expectations.",
  },
  {
    number: "03",
    icon: Palette,
    title: "Design & Mockups",
    description:
      "Our designers create stunning mockups based on your preferences. You'll review and provide feedback until it's perfect.",
  },
  {
    number: "04",
    icon: Code,
    title: "Development",
    description:
      "We build your site with clean, modern code. Regular updates keep you informed of progress throughout the build.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Launch",
    description:
      "After thorough testing, we launch your site. We handle domain setup, hosting configuration, and go-live checks.",
  },
  {
    number: "06",
    icon: HeartHandshake,
    title: "Ongoing Support",
    description:
      "Our relationship doesn't end at launch. We offer maintenance plans to keep your site secure and up-to-date.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold mb-4 block"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Simple 6-Step Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            We&apos;ve refined our process to make website creation smooth and 
            stress-free for you. Here&apos;s what to expect.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-xl p-6 border hover-lift">
                {/* Step Number */}
                <div className="absolute -top-4 left-6 text-4xl font-bold text-primary/20">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative z-10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
