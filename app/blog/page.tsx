import Link from "next/link";
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Blog | WebCraft",
  description: "Web design tips, industry insights, and project updates from the WebCraft team.",
};

const posts = [
  {
    id: 1,
    title: "10 Web Design Trends to Watch in 2026",
    excerpt: "From AI-powered personalization to immersive 3D experiences, here are the trends shaping the future of web design.",
    category: "Design Trends",
    author: "Alexandra Chen",
    date: "January 8, 2026",
    image: "https://picsum.photos/seed/blog1/800/400",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Why Your Business Needs a Professional Website",
    excerpt: "In today's digital-first world, your website is often the first impression customers have of your business. Here's why it matters.",
    category: "Business",
    author: "Marcus Williams",
    date: "January 5, 2026",
    image: "https://picsum.photos/seed/blog2/800/400",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "The Ultimate Guide to E-Commerce Website Design",
    excerpt: "Everything you need to know about creating an online store that converts visitors into customers.",
    category: "E-Commerce",
    author: "Sofia Rodriguez",
    date: "December 28, 2025",
    image: "https://picsum.photos/seed/blog3/800/400",
    readTime: "8 min read",
  },
  {
    id: 4,
    title: "How to Prepare Content for Your New Website",
    excerpt: "Content is king. Learn how to organize and prepare your website content before the design process begins.",
    category: "Content Strategy",
    author: "James Park",
    date: "December 20, 2025",
    image: "https://picsum.photos/seed/blog4/800/400",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Understanding Web Hosting: A Beginner's Guide",
    excerpt: "Confused about web hosting? We break down the options and help you choose the right solution for your needs.",
    category: "Technical",
    author: "Marcus Williams",
    date: "December 15, 2025",
    image: "https://picsum.photos/seed/blog5/800/400",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "5 Common Website Mistakes and How to Avoid Them",
    excerpt: "From slow loading times to confusing navigation, learn about the most common website pitfalls and how to fix them.",
    category: "Best Practices",
    author: "Alexandra Chen",
    date: "December 10, 2025",
    image: "https://picsum.photos/seed/blog6/800/400",
    readTime: "5 min read",
  },
];

const categories = ["All", "Design Trends", "Business", "E-Commerce", "Technical", "Best Practices"];

export default function BlogPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Web design tips, industry insights, and project updates from our team.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Featured Post */}
          <Card className="mb-12 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <img
                src={posts[0].image}
                alt={posts[0].title}
                className="w-full h-64 md:h-full object-cover"
              />
              <CardContent className="p-8 flex flex-col justify-center">
                <span className="text-primary text-sm font-medium mb-2">{posts[0].category}</span>
                <h2 className="text-2xl font-bold mb-3">{posts[0].title}</h2>
                <p className="text-muted-foreground mb-4">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {posts[0].author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {posts[0].date}
                  </span>
                  <span>{posts[0].readTime}</span>
                </div>
                <Button className="w-fit">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <span className="text-primary text-sm font-medium">{post.category}</span>
                  <h3 className="font-semibold text-lg mt-2 mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for the latest web design tips and industry news.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
