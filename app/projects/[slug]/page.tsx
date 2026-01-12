"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ExternalLink, 
  Star, 
  Quote, 
  CheckCircle2,
  Users,
  TrendingUp,
  Clock,
  Globe,
  ShoppingCart,
  CreditCard,
  Truck,
  Calendar,
  Dumbbell,
  Heart,
  Camera,
  Image as ImageIcon,
  Download,
  Scale,
  FileText,
  Shield,
  Zap,
  BarChart3,
  MessageSquare,
  Mail,
  Phone,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { use } from "react";

// Comprehensive project data
const projects: Record<string, ProjectData> = {
  "techflow-saas": {
    title: "TechFlow",
    tagline: "Streamline Your Workflow, Amplify Your Results",
    subtitle: "The all-in-one project management platform trusted by 10,000+ teams worldwide",
    category: "SaaS Platform",
    tags: ["React", "Next.js", "Tailwind", "PostgreSQL"],
    color: "blue",
    gradient: "from-blue-600 via-cyan-500 to-teal-400",
    stats: [
      { value: "10K+", label: "Active Teams" },
      { value: "99.9%", label: "Uptime" },
      { value: "4.9/5", label: "User Rating" },
      { value: "50%", label: "Time Saved" }
    ],
    features: [
      { icon: "BarChart3", title: "Real-time Analytics", description: "Monitor project metrics with beautiful, interactive dashboards that update in real-time" },
      { icon: "Users", title: "Team Collaboration", description: "Work seamlessly with unlimited team members across projects with role-based permissions" },
      { icon: "Zap", title: "100+ Integrations", description: "Connect with Slack, GitHub, Jira, and 100+ other tools your team already uses" },
      { icon: "Shield", title: "Enterprise Security", description: "SOC 2 Type II certified with end-to-end encryption and SSO support" },
      { icon: "MessageSquare", title: "Built-in Chat", description: "Communicate with your team without leaving the platform" },
      { icon: "Clock", title: "Time Tracking", description: "Automatic time tracking with detailed reports for billing and productivity" }
    ],
    screenshots: [
      { url: "https://picsum.photos/seed/techflow-dash/1200/700", caption: "Intuitive Dashboard" },
      { url: "https://picsum.photos/seed/techflow-kanban/1200/700", caption: "Kanban Board View" },
      { url: "https://picsum.photos/seed/techflow-analytics/1200/700", caption: "Analytics & Reporting" }
    ],
    testimonial: {
      quote: "TechFlow transformed how our team works. We've cut meeting time by 60% and increased productivity by 40%. It's not just a tool—it's a game changer.",
      author: "Sarah Chen",
      role: "VP of Engineering",
      company: "Innovate Labs",
      avatar: "https://i.pravatar.cc/100?img=1"
    },
    challenge: "Innovate Labs struggled with scattered project management across multiple tools, leading to missed deadlines and communication gaps.",
    solution: "We built a centralized platform with real-time updates, automated workflows, and seamless integrations that brought all their work into one place.",
    results: ["60% reduction in meeting time", "40% increase in team productivity", "Zero missed deadlines since launch", "95% user adoption within 2 weeks"]
  },
  "stylehub-fashion": {
    title: "StyleHub",
    tagline: "Elevate Your Style, Define Your Look",
    subtitle: "Premium fashion e-commerce destination with 50,000+ curated items from 200+ designers",
    category: "E-Commerce",
    tags: ["WooCommerce", "Custom Theme", "Stripe", "Klaviyo"],
    color: "purple",
    gradient: "from-purple-600 via-pink-500 to-rose-400",
    stats: [
      { value: "$2.5M", label: "Monthly Sales" },
      { value: "50K+", label: "Products" },
      { value: "200+", label: "Designers" },
      { value: "4.8/5", label: "Trust Score" }
    ],
    features: [
      { icon: "Sparkles", title: "AI Style Recommendations", description: "Personalized outfit suggestions powered by machine learning based on your preferences" },
      { icon: "Camera", title: "Virtual Try-On", description: "See how clothes look on you with AR-powered virtual fitting room technology" },
      { icon: "Heart", title: "Wishlist & Alerts", description: "Save favorites and get notified when items go on sale or come back in stock" },
      { icon: "CreditCard", title: "Buy Now, Pay Later", description: "Flexible payment options including Klarna and Afterpay integration" },
      { icon: "Truck", title: "Express Shipping", description: "Free 2-day shipping on orders over $100, with same-day delivery in select cities" },
      { icon: "MessageSquare", title: "Style Consultants", description: "Chat with personal stylists for expert fashion advice anytime" }
    ],
    screenshots: [
      { url: "https://picsum.photos/seed/stylehub-home/1200/700", caption: "Stunning Homepage" },
      { url: "https://picsum.photos/seed/stylehub-product/1200/700", caption: "Product Detail Page" },
      { url: "https://picsum.photos/seed/stylehub-cart/1200/700", caption: "Seamless Checkout" }
    ],
    testimonial: {
      quote: "The new website increased our conversion rate by 150%. The virtual try-on feature alone reduced returns by 40%. Best investment we've made.",
      author: "Marcus Williams",
      role: "Founder & CEO",
      company: "StyleHub",
      avatar: "https://i.pravatar.cc/100?img=3"
    },
    challenge: "StyleHub's outdated website had a 2% conversion rate and 30% return rate due to sizing issues and poor product visualization.",
    solution: "We designed a luxury shopping experience with AR try-on, AI recommendations, and a streamlined checkout that feels as premium as their products.",
    results: ["150% increase in conversion rate", "40% reduction in returns", "3x increase in average session duration", "85% mobile revenue growth"]
  },
  "fitlife-gym": {
    title: "FitLife",
    tagline: "Transform Your Body, Transform Your Life",
    subtitle: "Complete fitness membership platform with 5,000+ active members and 50+ certified trainers",
    category: "Membership Portal",
    tags: ["React", "Node.js", "Stripe", "Twilio"],
    color: "green",
    gradient: "from-green-600 via-emerald-500 to-teal-400",
    stats: [
      { value: "5K+", label: "Active Members" },
      { value: "50+", label: "Trainers" },
      { value: "200+", label: "Classes/Week" },
      { value: "98%", label: "Retention Rate" }
    ],
    features: [
      { icon: "Calendar", title: "Easy Class Booking", description: "Reserve spots in your favorite classes with one tap, up to 7 days in advance" },
      { icon: "Dumbbell", title: "Workout Tracking", description: "Log exercises, track PRs, and monitor progress with detailed analytics" },
      { icon: "Users", title: "Personal Training", description: "Book 1-on-1 sessions with certified trainers directly through the app" },
      { icon: "Heart", title: "Health Metrics", description: "Sync with wearables to track heart rate, sleep, and recovery scores" },
      { icon: "MessageSquare", title: "Community Features", description: "Join challenges, share achievements, and connect with fellow members" },
      { icon: "TrendingUp", title: "Progress Photos", description: "Private photo timeline to visualize your transformation journey" }
    ],
    screenshots: [
      { url: "https://picsum.photos/seed/fitlife-schedule/1200/700", caption: "Class Schedule" },
      { url: "https://picsum.photos/seed/fitlife-workout/1200/700", caption: "Workout Tracker" },
      { url: "https://picsum.photos/seed/fitlife-progress/1200/700", caption: "Progress Dashboard" }
    ],
    testimonial: {
      quote: "Member engagement went through the roof after launching the new platform. Our retention rate increased from 70% to 98%. The ROI has been incredible.",
      author: "Jennifer Martinez",
      role: "Operations Director",
      company: "FitLife Gym",
      avatar: "https://i.pravatar.cc/100?img=5"
    },
    challenge: "FitLife was losing members due to a cumbersome booking process and lack of engagement tools between gym visits.",
    solution: "We created an engaging member portal with seamless booking, gamified challenges, and progress tracking that keeps members motivated 24/7.",
    results: ["98% member retention (up from 70%)", "400% increase in class bookings", "50% reduction in admin time", "35% growth in personal training revenue"]
  },
  "artisan-bakery": {
    title: "Artisan Bakery",
    tagline: "Fresh Daily, Made with Love",
    subtitle: "Award-winning bakery serving the community for 25 years with online ordering and nationwide shipping",
    category: "E-Commerce",
    tags: ["Shopify", "Custom Theme", "Square", "ShipStation"],
    color: "orange",
    gradient: "from-orange-500 via-amber-400 to-yellow-300",
    stats: [
      { value: "1000+", label: "Orders/Week" },
      { value: "25", label: "Years Serving" },
      { value: "4.9/5", label: "Rating" },
      { value: "48", label: "States Shipped" }
    ],
    features: [
      { icon: "ShoppingCart", title: "Online Ordering", description: "Order your favorite breads and pastries for same-day pickup or local delivery" },
      { icon: "Sparkles", title: "Custom Cakes", description: "Design your dream cake with our interactive cake builder and 3D preview" },
      { icon: "Calendar", title: "Subscription Boxes", description: "Weekly or monthly fresh bread subscriptions delivered to your doorstep" },
      { icon: "Truck", title: "Nationwide Shipping", description: "Vacuum-sealed freshness shipped to 48 states in 2-3 business days" },
      { icon: "Users", title: "Catering Services", description: "Full-service catering for events from 10 to 10,000 guests" },
      { icon: "Heart", title: "Loyalty Rewards", description: "Earn points with every purchase and get free treats on your birthday" }
    ],
    screenshots: [
      { url: "https://picsum.photos/seed/bakery-home/1200/700", caption: "Warm & Inviting Homepage" },
      { url: "https://picsum.photos/seed/bakery-cakes/1200/700", caption: "Custom Cake Builder" },
      { url: "https://picsum.photos/seed/bakery-order/1200/700", caption: "Easy Online Ordering" }
    ],
    testimonial: {
      quote: "Our online sales went from $5K to $80K per month. The website captures the warmth of our bakery perfectly. Customers say ordering feels like visiting the shop!",
      author: "Maria Santos",
      role: "Owner",
      company: "Artisan Bakery",
      avatar: "https://i.pravatar.cc/100?img=9"
    },
    challenge: "A beloved local bakery wanted to expand beyond their neighborhood while maintaining the personal, artisanal feel they're known for.",
    solution: "We built a warm, inviting e-commerce experience with gorgeous photography, a custom cake builder, and subscription management that scales their tradition nationwide.",
    results: ["16x increase in online revenue", "Expanded from local to 48 states", "30% of revenue now from subscriptions", "500+ 5-star reviews in first year"]
  },
  "creative-studio": {
    title: "Creative Studio",
    tagline: "Capturing Moments, Creating Memories",
    subtitle: "Award-winning photography studio specializing in weddings, portraits, and commercial work since 2010",
    category: "Portfolio",
    tags: ["Next.js", "Sanity CMS", "Cloudinary", "Calendly"],
    color: "pink",
    gradient: "from-pink-600 via-rose-500 to-red-400",
    stats: [
      { value: "500+", label: "Weddings Shot" },
      { value: "15", label: "Years Experience" },
      { value: "50+", label: "Awards Won" },
      { value: "100%", label: "Happy Clients" }
    ],
    features: [
      { icon: "ImageIcon", title: "Stunning Galleries", description: "Fast-loading, fullscreen galleries organized by category with lightbox viewing" },
      { icon: "Download", title: "Client Proofing", description: "Private password-protected galleries for clients to review and select favorites" },
      { icon: "Calendar", title: "Online Booking", description: "See real-time availability and book sessions with instant confirmation" },
      { icon: "ShoppingCart", title: "Print Shop", description: "Order museum-quality prints, albums, and wall art directly from your gallery" },
      { icon: "Heart", title: "Favorites & Sharing", description: "Save and share your favorite images with family and friends easily" },
      { icon: "Mail", title: "Inquiry System", description: "Detailed inquiry forms that help qualify leads and gather project details" }
    ],
    screenshots: [
      { url: "https://picsum.photos/seed/creative-gallery/1200/700", caption: "Immersive Photo Gallery" },
      { url: "https://picsum.photos/seed/creative-booking/1200/700", caption: "Session Booking" },
      { url: "https://picsum.photos/seed/creative-proof/1200/700", caption: "Client Proofing Portal" }
    ],
    testimonial: {
      quote: "The new website tripled my booking inquiries and the client proofing system saves me 10+ hours every week. It's beautiful, fast, and my clients love it!",
      author: "Alexandra Thompson",
      role: "Lead Photographer",
      company: "Creative Studio",
      avatar: "https://i.pravatar.cc/100?img=16"
    },
    challenge: "A talented photographer was losing bookings to competitors with better online presence, and spending too much time on admin tasks.",
    solution: "We crafted a visually stunning portfolio that showcases their work beautifully, with integrated booking and a client portal that automates their workflow.",
    results: ["3x increase in booking inquiries", "10+ hours saved weekly on admin", "Average project value up 40%", "Ranked #1 local photographer on Google"]
  },
  "legalpro-firm": {
    title: "LegalPro",
    tagline: "Your Trusted Legal Partner",
    subtitle: "Full-service law firm with 50+ attorneys across 5 offices, serving clients nationwide for over 30 years",
    category: "Corporate",
    tags: ["WordPress", "Custom Theme", "Clio Integration", "LiveChat"],
    color: "slate",
    gradient: "from-slate-700 via-slate-600 to-slate-500",
    stats: [
      { value: "$500M+", label: "Cases Won" },
      { value: "50+", label: "Attorneys" },
      { value: "30+", label: "Years Experience" },
      { value: "5000+", label: "Clients Served" }
    ],
    features: [
      { icon: "Scale", title: "Practice Areas", description: "Comprehensive coverage across 12 practice areas with dedicated specialist teams" },
      { icon: "FileText", title: "Case Results", description: "Proven track record with detailed case studies and settlement information" },
      { icon: "Calendar", title: "Free Consultation", description: "Schedule a free 30-minute consultation with an attorney in your area" },
      { icon: "Shield", title: "Client Portal", description: "Secure 24/7 access to case documents, billing, and communication" },
      { icon: "Users", title: "Attorney Profiles", description: "Detailed bios, credentials, and areas of expertise for each attorney" },
      { icon: "MessageSquare", title: "24/7 Live Chat", description: "Connect with a live representative anytime for immediate assistance" }
    ],
    screenshots: [
      { url: "https://picsum.photos/seed/legal-home/1200/700", caption: "Professional Homepage" },
      { url: "https://picsum.photos/seed/legal-team/1200/700", caption: "Attorney Directory" },
      { url: "https://picsum.photos/seed/legal-portal/1200/700", caption: "Secure Client Portal" }
    ],
    testimonial: {
      quote: "The website redesign established our firm as an industry leader. Qualified leads increased 200% and the client portal reduced phone inquiries by 60%.",
      author: "Robert Harrison",
      role: "Managing Partner",
      company: "LegalPro LLP",
      avatar: "https://i.pravatar.cc/100?img=12"
    },
    challenge: "An established law firm had an outdated website that didn't reflect their expertise, losing potential clients to more modern competitors.",
    solution: "We redesigned their digital presence with a sophisticated, trustworthy design, integrated client portal, and content strategy that showcases their expertise.",
    results: ["200% increase in qualified leads", "60% reduction in routine phone calls", "45% improvement in time-on-site", "Top 3 rankings for key practice areas"]
  }
};

interface ProjectData {
  title: string;
  tagline: string;
  subtitle: string;
  category: string;
  tags: string[];
  color: string;
  gradient: string;
  stats: { value: string; label: string }[];
  features: { icon: string; title: string; description: string }[];
  screenshots: { url: string; caption: string }[];
  testimonial: { quote: string; author: string; role: string; company: string; avatar: string };
  challenge: string;
  solution: string;
  results: string[];
}

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3, Users, Zap, Shield, MessageSquare, Clock, Sparkles, Camera, Heart, CreditCard, 
  Truck, Calendar, Dumbbell, TrendingUp, ShoppingCart, ImageIcon, Download, Scale, FileText, Mail
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProjectPreviewPage({ params }: Props) {
  const { slug } = use(params);
  const project = projects[slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link href="/#portfolio" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">Case Study</span>
              <Link href="/intake">
                <Button size="sm">Start Your Project</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-background" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${project.gradient} text-white shadow-lg`}>
                {project.category}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${project.gradient}`}
            >
              {project.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl text-foreground font-light mb-4"
            >
              {project.tagline}
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              {project.subtitle}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-2 mb-10"
            >
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm rounded-full bg-muted/80 border backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" className={`gap-2 bg-gradient-to-r ${project.gradient} border-0 shadow-lg hover:shadow-xl transition-shadow`}>
                <ExternalLink className="h-5 w-5" />
                View Live Site
              </Button>
              <Link href="/schedule">
                <Button size="lg" variant="outline" className="gap-2">
                  <Phone className="h-5 w-5" />
                  Discuss Your Project
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {project.stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${project.gradient}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Screenshot */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className={`rounded-2xl overflow-hidden shadow-2xl border-2 border-opacity-20 bg-gradient-to-r ${project.gradient} p-1`}>
              <div className="rounded-xl overflow-hidden bg-background">
                <div className="bg-muted/50 px-4 py-2 flex items-center gap-2 border-b">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-muted-foreground bg-background/50 px-4 py-1 rounded-full">
                      {project.title.toLowerCase().replace(/\s/g, '')}.com
                    </span>
                  </div>
                </div>
                <img
                  src={project.screenshots[0].url}
                  alt={project.screenshots[0].caption}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-4">{project.screenshots[0].caption}</p>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Story</h2>
              <p className="text-muted-foreground">How we transformed challenges into success</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20"
              >
                <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-sm">1</span>
                  The Challenge
                </h3>
                <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-green-500/5 border border-green-500/20"
              >
                <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-sm">2</span>
                  Our Solution
                </h3>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl bg-gradient-to-r ${project.gradient} text-white`}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">3</span>
                The Results
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.results.map((result, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <span>{result}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground">What makes this project special</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.features.map((feature, index) => {
                const IconComponent = iconComponents[feature.icon] || Zap;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* More Screenshots */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">More Screens</h2>
              <p className="text-muted-foreground">A closer look at the user experience</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {project.screenshots.slice(1).map((screenshot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="rounded-xl overflow-hidden shadow-xl border">
                    <img
                      src={screenshot.url}
                      alt={screenshot.caption}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-center text-muted-foreground mt-3">{screenshot.caption}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Quote className="w-16 h-16 mx-auto mb-8 text-muted-foreground/30" />
            
            <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8 text-foreground">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            
            <div className="flex items-center justify-center gap-4">
              <img
                src={project.testimonial.avatar}
                alt={project.testimonial.author}
                className="w-14 h-14 rounded-full border-2 border-primary"
              />
              <div className="text-left">
                <div className="font-semibold">{project.testimonial.author}</div>
                <div className="text-sm text-muted-foreground">
                  {project.testimonial.role}, {project.testimonial.company}
                </div>
              </div>
              <div className="flex ml-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 bg-gradient-to-r ${project.gradient} text-white`}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Results Like These?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Let&apos;s discuss how we can create a custom solution that drives real results for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/intake">
                <Button size="lg" variant="secondary" className="gap-2 shadow-xl">
                  Start Your Project
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </Button>
              </Link>
              <Link href="/#portfolio">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent border-white text-white hover:bg-white/20">
                  View More Projects
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>This is a case study preview. Actual client results may vary.</p>
        </div>
      </footer>
    </div>
  );
}
