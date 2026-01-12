"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = ["All", "E-Commerce", "Corporate", "Portfolio", "Membership"];

const projects = [
  {
    id: 1,
    title: "TechFlow SaaS",
    slug: "techflow-saas",
    category: "Corporate",
    description: "Modern SaaS platform with sleek UI/UX design",
    image: "https://picsum.photos/seed/techflow/600/400",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    id: 2,
    title: "StyleHub Fashion",
    slug: "stylehub-fashion",
    category: "E-Commerce",
    description: "High-end fashion e-commerce with 500+ products",
    image: "https://picsum.photos/seed/stylehub/600/400",
    tags: ["WooCommerce", "Custom Theme"],
  },
  {
    id: 3,
    title: "FitLife Gym",
    slug: "fitlife-gym",
    category: "Membership",
    description: "Fitness membership portal with booking system",
    image: "https://picsum.photos/seed/fitlife/600/400",
    tags: ["Membership", "Bookings"],
  },
  {
    id: 4,
    title: "Artisan Bakery",
    slug: "artisan-bakery",
    category: "E-Commerce",
    description: "Local bakery with online ordering system",
    image: "https://picsum.photos/seed/bakery/600/400",
    tags: ["Shopify", "Custom"],
  },
  {
    id: 5,
    title: "Creative Studio",
    slug: "creative-studio",
    category: "Portfolio",
    description: "Photography portfolio with stunning galleries",
    image: "https://picsum.photos/seed/creative/600/400",
    tags: ["Portfolio", "Gallery"],
  },
  {
    id: 6,
    title: "LegalPro Firm",
    slug: "legalpro-firm",
    category: "Corporate",
    description: "Professional law firm website with case studies",
    image: "https://picsum.photos/seed/legalpro/600/400",
    tags: ["Corporate", "CMS"],
  },
];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold mb-4 block"
          >
            Our Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Take a look at some of our recent work and see how we&apos;ve helped 
            businesses transform their online presence.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border bg-card"
            >
              {/* Image */}
              <div className="aspect-[3/2] bg-muted relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/projects/${project.slug}`}>
                    <Button size="sm" variant="secondary" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Project
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {project.category}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
