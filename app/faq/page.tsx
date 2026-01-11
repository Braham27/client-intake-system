import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "FAQ | WebCraft",
  description: "Frequently asked questions about our web design services, process, pricing, and more.",
};

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What services does WebCraft offer?",
        a: "We offer comprehensive web design and development services including custom website design, e-commerce solutions, membership portals, branding, SEO optimization, and ongoing maintenance. We handle everything from initial concept to launch and beyond.",
      },
      {
        q: "Do you work with clients outside your local area?",
        a: "Absolutely! We work with clients worldwide. Most of our communication happens via video calls, email, and our project management tools, so location is never a barrier. We've successfully completed projects for clients across the US and internationally.",
      },
      {
        q: "How long have you been in business?",
        a: "WebCraft was founded in 2018, and we've been helping businesses build their online presence for over 8 years. In that time, we've completed 500+ projects and built a team of 12 dedicated professionals.",
      },
    ],
  },
  {
    category: "Process & Timeline",
    questions: [
      {
        q: "How long does it take to build a website?",
        a: "Timelines vary based on project complexity. A simple brochure website typically takes 2-3 weeks, while a professional business site takes 4-6 weeks. E-commerce and membership sites usually require 6-8 weeks or more. We'll provide a specific timeline during our consultation based on your requirements.",
      },
      {
        q: "What is your design process?",
        a: "Our process includes: 1) Discovery & Intake - understanding your needs through our questionnaire, 2) Consultation - discussing your project in detail, 3) Design & Mockups - creating visual designs for your approval, 4) Development - building your site with clean, modern code, 5) Launch - testing and going live, 6) Support - ongoing maintenance and updates.",
      },
      {
        q: "Will I be able to review and approve designs before development?",
        a: "Yes! We provide design mockups for your review and approval before any development begins. You'll have multiple opportunities for feedback and revisions (the number depends on your package) to ensure the final design matches your vision.",
      },
      {
        q: "What if I need changes after the website is launched?",
        a: "We offer ongoing maintenance plans that include regular updates and content changes. If you're not on a maintenance plan, we can make changes on an hourly basis. We also provide training so you can make simple content updates yourself.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        q: "How much does a website cost?",
        a: "Our projects start at $2,500 for a basic 5-page website. Professional business sites start at $5,000, and e-commerce solutions start at $8,000. Enterprise and custom projects are priced based on requirements. All pricing is transparent and provided upfront after our consultation.",
      },
      {
        q: "What is your payment structure?",
        a: "We require a 50% deposit to begin work, with the remaining 50% due upon project completion before launch. For larger projects, we can arrange milestone-based payments. We accept credit cards, bank transfers, and PayPal.",
      },
      {
        q: "Are there any additional costs I should know about?",
        a: "Beyond our design/development fees, you should budget for: domain name (~$15/year), web hosting (~$20-50/month depending on needs), premium plugins or tools if required, and optional ongoing maintenance ($99+/month). We'll clearly outline all expected costs in your proposal.",
      },
      {
        q: "Do you offer refunds?",
        a: "The initial deposit is non-refundable as it covers our discovery, planning, and initial design work. If you need to cancel mid-project, you'll be billed for work completed. We're always transparent about progress, so there are no surprises.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        q: "Do I need to have my own domain and hosting?",
        a: "Not necessarily. We can purchase and set up domain and hosting on your behalf (costs passed through to you), or we can work with your existing providers. We'll discuss the best option during our consultation.",
      },
      {
        q: "Will my website be mobile-friendly?",
        a: "Absolutely! All our websites are built with responsive design, meaning they look and work great on desktops, tablets, and mobile phones. Mobile-friendly design is standard, not an add-on.",
      },
      {
        q: "Will my website be optimized for search engines (SEO)?",
        a: "Yes, we include basic SEO setup with every project - proper page titles, meta descriptions, clean URLs, fast loading times, and mobile optimization. For more comprehensive SEO services (keyword research, content strategy, ongoing optimization), we offer that as an additional service.",
      },
      {
        q: "Can I update the website myself after it's built?",
        a: "Yes! We typically build websites on user-friendly platforms that allow you to make content updates. We also provide training documentation and can schedule a walkthrough session. For more complex changes, we're always here to help.",
      },
      {
        q: "What happens if something breaks on my website?",
        a: "If you're on a maintenance plan, we'll fix issues as part of your plan at no extra cost. If not, we offer support on an hourly basis. We also recommend regular backups (included in maintenance plans) so we can quickly restore your site if needed.",
      },
    ],
  },
  {
    category: "Content & Assets",
    questions: [
      {
        q: "Do I need to provide all the content for my website?",
        a: "Ideally, you know your business best and can provide the core content. However, we can help with copywriting services for an additional fee. We'll work with you to ensure your content is clear, compelling, and optimized for your audience.",
      },
      {
        q: "What about images and photos?",
        a: "You can provide your own photos (high quality preferred), we can source stock images, or we can arrange professional photography. Stock images are included in most packages; custom photography is an additional service.",
      },
      {
        q: "Do I own my website after it's built?",
        a: "Yes! Once the project is paid in full, you own your website, content, and design. We provide all necessary files and credentials. The only exception is any licensed stock images or third-party plugins which may have their own terms.",
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b py-4">
      <summary className="flex cursor-pointer items-center justify-between font-medium">
        <span>{question}</span>
        <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <p className="mt-4 text-muted-foreground leading-relaxed">{answer}</p>
    </details>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <Link href="/" className="text-xl font-bold gradient-text">
              WebCraft
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our web design services, process, and pricing.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {faqs.map((category) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-primary">{category.category}</h2>
              <div className="divide-y border-t">
                {category.questions.map((faq, index) => (
                  <FAQItem key={index} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help. 
            Schedule a free consultation or send us a message.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/schedule">Schedule a Free Call</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
