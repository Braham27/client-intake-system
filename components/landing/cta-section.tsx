"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl gradient-bg p-12 md:p-16 text-white"
        >
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Online Presence?
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-10">
              Take the first step toward a stunning website that converts visitors 
              into customers. Complete our intake form or schedule a free consultation 
              to discuss your project.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/intake">
                <Button
                  size="xl"
                  variant="secondary"
                  className="group text-foreground"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Start Project Questionnaire
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/schedule">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-foreground"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Consultation
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-sm opacity-75">
              No commitment required. We&apos;ll review your needs and provide a 
              custom quote within 48 hours.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
