import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const footerLinks = {
  services: [
    { label: "Web Design", href: "#services" },
    { label: "E-Commerce", href: "#services" },
    { label: "Membership Sites", href: "#services" },
    { label: "SEO Optimization", href: "#services" },
    { label: "Maintenance", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Process", href: "#process" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/webcraft", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/webcraft", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/webcraft", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/webcraft", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold mb-4 block">
              WebCraft
            </Link>
            <p className="text-background/70 mb-6 max-w-sm">
              We create stunning, high-performance websites that help businesses 
              grow and succeed in the digital world.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:hello@webcraft.com"
                className="flex items-center gap-2 text-background/70 hover:text-background transition-colors"
              >
                <Mail className="h-5 w-5" />
                hello@webcraft.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-background/70 hover:text-background transition-colors"
              >
                <Phone className="h-5 w-5" />
                (123) 456-7890
              </a>
              <div className="flex items-center gap-2 text-background/70">
                <MapPin className="h-5 w-5" />
                123 Design Street, Creative City
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} WebCraft. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-background/50">
            <Link href="/privacy" className="hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-background transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-background transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
