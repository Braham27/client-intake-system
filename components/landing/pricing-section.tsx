"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small businesses and personal brands",
    price: 2500,
    popular: false,
    features: [
      "Up to 5 pages",
      "Mobile-responsive design",
      "Contact form",
      "Basic SEO setup",
      "Social media links",
      "1 round of revisions",
      "2-3 week delivery",
    ],
    notIncluded: ["E-commerce", "Membership features", "Blog"],
  },
  {
    name: "Professional",
    description: "Best for growing businesses with more needs",
    price: 5000,
    popular: true,
    features: [
      "Up to 15 pages",
      "Mobile-responsive design",
      "Advanced contact forms",
      "Blog setup",
      "SEO optimization",
      "Social media integration",
      "Photo gallery",
      "3 rounds of revisions",
      "4-6 week delivery",
      "30-day support",
    ],
    notIncluded: ["E-commerce", "Membership features"],
  },
  {
    name: "E-Commerce",
    description: "Full-featured online store to sell products",
    price: 8000,
    popular: false,
    features: [
      "Up to 25 pages",
      "Full e-commerce setup",
      "Up to 100 products",
      "Payment integration",
      "Inventory management",
      "Shipping calculator",
      "Mobile-responsive",
      "SEO optimization",
      "5 rounds of revisions",
      "6-8 week delivery",
      "60-day support",
    ],
    notIncluded: [],
  },
  {
    name: "Enterprise",
    description: "Custom solutions for complex requirements",
    price: null,
    popular: false,
    features: [
      "Unlimited pages",
      "Custom functionality",
      "Membership portals",
      "E-commerce (any size)",
      "Third-party integrations",
      "Priority support",
      "Dedicated project manager",
      "Custom timeline",
      "Ongoing maintenance",
    ],
    notIncluded: [],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold mb-4 block"
          >
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Transparent Pricing, No Surprises
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Choose the package that fits your needs. All prices are starting points – 
            your final quote will be customized based on your specific requirements.
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`pricing-card ${plan.popular ? "popular" : ""}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                {plan.price ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">
                      ${plan.price.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">starting</span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold">Custom</span>
                )}
              </div>

              {/* CTA Button */}
              <Link href="/intake" className="block mb-6">
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </Link>

              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            <strong>Note:</strong> All projects require a 50% deposit to begin. 
            Domain registration (~$15/year) and hosting (~$20-50/month) are additional. 
            Maintenance plans available from $99/month.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
