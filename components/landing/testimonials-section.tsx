"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechFlow Inc",
    content:
      "Working with WebCraft was an absolute pleasure. They took our vague ideas and transformed them into a stunning website that exceeded our expectations. Our conversions are up 40% since launch!",
    rating: 5,
    image: null,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Owner, StyleHub Fashion",
    content:
      "The e-commerce site they built for us is incredible. The intake process was thorough – they understood exactly what we needed. Our customers love the new shopping experience.",
    rating: 5,
    image: null,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Director, FitLife Gym",
    content:
      "The membership portal they created has streamlined our entire business. Online bookings, member management, everything works seamlessly. Best investment we've made!",
    rating: 5,
    image: null,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Partner, LegalPro Firm",
    content:
      "Professional, responsive, and delivered exactly what was promised. The site perfectly represents our firm's values and has brought in several new clients already.",
    rating: 5,
    image: null,
  },
  {
    id: 5,
    name: "Amanda Foster",
    role: "Owner, Artisan Bakery",
    content:
      "From the first consultation to the launch, everything was handled with care. Our online ordering system works flawlessly and customers constantly compliment our website.",
    rating: 5,
    image: null,
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Photographer, Creative Studio",
    content:
      "My portfolio site is absolutely stunning. The galleries load fast, look amazing on every device, and really showcase my work. I've received so many compliments!",
    rating: 5,
    image: null,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold mb-4 block"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Don&apos;t just take our word for it. Here&apos;s what some of our 
            amazing clients have to say about working with us.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 border hover-lift"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
