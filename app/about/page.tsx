import Link from "next/link";
import { ArrowRight, Users, Award, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | WebCraft",
  description: "Learn about WebCraft - a passionate team of web designers and developers dedicated to creating stunning websites.",
};

const stats = [
  { label: "Projects Completed", value: "500+", icon: Award },
  { label: "Happy Clients", value: "450+", icon: Heart },
  { label: "Years Experience", value: "8+", icon: Clock },
  { label: "Team Members", value: "12", icon: Users },
];

const team = [
  {
    name: "Alexandra Chen",
    role: "Founder & Creative Director",
    bio: "With 15 years in web design, Alex leads our creative vision and ensures every project exceeds expectations.",
    image: "https://picsum.photos/seed/team1/400/400",
  },
  {
    name: "Marcus Williams",
    role: "Lead Developer",
    bio: "Marcus brings complex ideas to life with clean, efficient code and a passion for modern web technologies.",
    image: "https://picsum.photos/seed/team2/400/400",
  },
  {
    name: "Sofia Rodriguez",
    role: "UX/UI Designer",
    bio: "Sofia crafts intuitive user experiences that delight users and drive conversions.",
    image: "https://picsum.photos/seed/team3/400/400",
  },
  {
    name: "James Park",
    role: "Project Manager",
    bio: "James ensures every project runs smoothly, on time, and within budget with his meticulous attention to detail.",
    image: "https://picsum.photos/seed/team4/400/400",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We Build Websites That <span className="gradient-text">Drive Results</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              WebCraft is a passionate team of designers and developers dedicated to creating 
              stunning, high-performance websites that help businesses grow and succeed online.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/intake">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/schedule">Book a Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2018, WebCraft started with a simple mission: to create websites that 
                  not only look beautiful but actually drive business results. We believed that 
                  every business, regardless of size, deserves a professional online presence.
                </p>
                <p>
                  Over the years, we&apos;ve grown from a small team of two to a full-service web 
                  design agency with over 500 successful projects under our belt. Our approach 
                  combines creative design with strategic thinking, ensuring every website we 
                  build serves a purpose.
                </p>
                <p>
                  Today, we continue to push the boundaries of web design, embracing new 
                  technologies and trends while staying true to our core values: quality, 
                  transparency, and client satisfaction.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://picsum.photos/seed/office/600/400"
                alt="Our office"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl">
                <div className="text-3xl font-bold">8+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Behind every great project is a team of talented individuals passionate about 
              creating exceptional digital experiences.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-semibold text-xl mb-2">Quality First</h3>
              <p className="text-muted-foreground">
                We never cut corners. Every pixel, every line of code is crafted with care and attention to detail.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-semibold text-xl mb-2">Transparency</h3>
              <p className="text-muted-foreground">
                Clear communication, honest pricing, and no surprises. We keep you informed every step of the way.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-semibold text-xl mb-2">Results-Driven</h3>
              <p className="text-muted-foreground">
                A beautiful website is great, but one that converts visitors into customers is even better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let&apos;s create something amazing. Start your project today or schedule a free consultation to discuss your vision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/intake">Start Your Project</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/schedule">Schedule a Call</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer link */}
      <div className="py-8 text-center border-t">
        <Link href="/" className="text-primary hover:underline">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
