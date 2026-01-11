"use client";

import { motion } from "framer-motion";
import {
  Globe,
  ShoppingCart,
  Users,
  Palette,
  Search,
  Wrench,
  Smartphone,
  Zap,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Custom Web Design",
    description:
      "Unique, tailor-made websites that reflect your brand identity and captivate your audience from the first click.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Powerful online stores with secure payments, inventory management, and seamless checkout experiences.",
  },
  {
    icon: Users,
    title: "Membership Portals",
    description:
      "Exclusive member areas with subscription billing, gated content, and community features.",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description:
      "Complete branding packages including logos, color schemes, and style guides that make you stand out.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Search engine optimization that puts you on the map and drives organic traffic to your site.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description:
      "Responsive websites that look stunning and perform flawlessly on every device and screen size.",
  },
  {
    icon: Zap,
    title: "Performance Tuning",
    description:
      "Lightning-fast load times and optimized performance for better user experience and rankings.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description:
      "Ongoing maintenance plans to keep your site secure, updated, and running at peak performance.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold mb-4 block"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Comprehensive Web Design Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            From concept to launch, we provide everything you need to establish 
            a powerful online presence that drives growth.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="feature-card group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
