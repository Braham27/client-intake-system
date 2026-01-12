import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Project data
const projects = {
  "techflow-saas": {
    title: "TechFlow SaaS",
    tagline: "Streamline Your Workflow, Amplify Your Results",
    description: "Modern SaaS platform with sleek UI/UX design",
    category: "Corporate",
    tags: ["React", "Next.js", "Tailwind"],
    heroImage: "https://picsum.photos/seed/techflow-hero/1200/600",
    color: "blue",
    features: [
      { title: "Real-time Analytics", description: "Monitor your metrics in real-time with beautiful dashboards" },
      { title: "Team Collaboration", description: "Work seamlessly with your team across all projects" },
      { title: "API Integration", description: "Connect with 100+ tools and services" },
      { title: "Advanced Security", description: "Enterprise-grade security and compliance" }
    ]
  },
  "stylehub-fashion": {
    title: "StyleHub Fashion",
    tagline: "Elevate Your Style, Define Your Look",
    description: "High-end fashion e-commerce with 500+ products",
    category: "E-Commerce",
    tags: ["WooCommerce", "Custom Theme"],
    heroImage: "https://picsum.photos/seed/stylehub-hero/1200/600",
    color: "purple",
    features: [
      { title: "Curated Collections", description: "Handpicked fashion items from top designers" },
      { title: "Virtual Try-On", description: "See how clothes look before you buy" },
      { title: "Personal Stylist", description: "Get personalized fashion recommendations" },
      { title: "Express Shipping", description: "Fast and reliable worldwide delivery" }
    ]
  },
  "fitlife-gym": {
    title: "FitLife Gym",
    tagline: "Transform Your Body, Transform Your Life",
    description: "Fitness membership portal with booking system",
    category: "Membership",
    tags: ["Membership", "Bookings"],
    heroImage: "https://picsum.photos/seed/fitlife-hero/1200/600",
    color: "green",
    features: [
      { title: "Class Booking", description: "Reserve your spot in favorite classes instantly" },
      { title: "Personal Training", description: "One-on-one sessions with certified trainers" },
      { title: "Progress Tracking", description: "Monitor your fitness journey with detailed analytics" },
      { title: "Nutrition Plans", description: "Custom meal plans to support your goals" }
    ]
  },
  "artisan-bakery": {
    title: "Artisan Bakery",
    tagline: "Fresh Daily, Made with Love",
    description: "Local bakery with online ordering system",
    category: "E-Commerce",
    tags: ["Shopify", "Custom"],
    heroImage: "https://picsum.photos/seed/bakery-hero/1200/600",
    color: "orange",
    features: [
      { title: "Online Ordering", description: "Order your favorites for pickup or delivery" },
      { title: "Custom Cakes", description: "Design your perfect celebration cake" },
      { title: "Subscription Boxes", description: "Weekly fresh bread delivered to your door" },
      { title: "Catering Services", description: "Perfect pastries for your special events" }
    ]
  },
  "creative-studio": {
    title: "Creative Studio",
    tagline: "Capturing Moments, Creating Memories",
    description: "Photography portfolio with stunning galleries",
    category: "Portfolio",
    tags: ["Portfolio", "Gallery"],
    heroImage: "https://picsum.photos/seed/creative-hero/1200/600",
    color: "pink",
    features: [
      { title: "Portfolio Gallery", description: "Beautifully organized photo collections" },
      { title: "Client Proofing", description: "Private galleries for client review" },
      { title: "Online Booking", description: "Schedule your photoshoot session" },
      { title: "Print Shop", description: "Order professional prints and products" }
    ]
  },
  "legalpro-firm": {
    title: "LegalPro Firm",
    tagline: "Your Trusted Legal Partner",
    description: "Professional law firm website with case studies",
    category: "Corporate",
    tags: ["Corporate", "CMS"],
    heroImage: "https://picsum.photos/seed/legalpro-hero/1200/600",
    color: "slate",
    features: [
      { title: "Practice Areas", description: "Expertise across multiple legal domains" },
      { title: "Case Results", description: "Proven track record of success" },
      { title: "Free Consultation", description: "Initial case review at no cost" },
      { title: "Client Portal", description: "Secure access to case documents" }
    ]
  }
};

const colorClasses = {
  blue: {
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/20"
  },
  purple: {
    gradient: "from-purple-500 to-pink-500",
    bg: "bg-purple-500/10",
    text: "text-purple-600",
    border: "border-purple-500/20"
  },
  green: {
    gradient: "from-green-500 to-emerald-500",
    bg: "bg-green-500/10",
    text: "text-green-600",
    border: "border-green-500/20"
  },
  orange: {
    gradient: "from-orange-500 to-amber-500",
    bg: "bg-orange-500/10",
    text: "text-orange-600",
    border: "border-orange-500/20"
  },
  pink: {
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/10",
    text: "text-pink-600",
    border: "border-pink-500/20"
  },
  slate: {
    gradient: "from-slate-700 to-slate-900",
    bg: "bg-slate-500/10",
    text: "text-slate-700",
    border: "border-slate-500/20"
  }
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug,
  }));
}

export default async function ProjectPreviewPage({ params }: Props) {
  const { slug } = await params;
  const project = projects[slug as keyof typeof projects];

  if (!project) {
    notFound();
  }

  const colors = colorClasses[project.color as keyof typeof colorClasses];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link href="/#portfolio" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
            <span className="text-sm text-muted-foreground">Project Preview</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-10`} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4">
              <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
                {project.category}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              {project.title}
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-light mb-8">
              {project.tagline}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-md bg-muted border"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Button size="lg" className="gap-2">
              <ExternalLink className="h-5 w-5" />
              View Live Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl border">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border ${colors.border} ${colors.bg} hover:shadow-lg transition-all duration-300`}
                >
                  <h3 className={`text-xl font-semibold mb-2 ${colors.text}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Want a Website Like This?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We can create a custom solution tailored to your business needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/intake">
                <Button size="lg">
                  Start Your Project
                </Button>
              </Link>
              <Link href="/#portfolio">
                <Button size="lg" variant="outline">
                  View More Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
