import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Cookie Policy | WebCraft",
  description: "Learn how WebCraft uses cookies and similar technologies on our website.",
};

export default function CookiesPage() {
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

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-2">Cookie Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 1, 2026</p>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when 
              you visit a website. They are widely used to make websites work more efficiently and 
              provide information to the owners of the site.
            </p>

            <h2>How We Use Cookies</h2>
            <p>We use cookies and similar technologies for several purposes:</p>

            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable basic 
              functions like page navigation, access to secure areas, and form submissions. The 
              website cannot function properly without these cookies.
            </p>
            <ul>
              <li><strong>Session cookies:</strong> Remember your preferences during your visit</li>
              <li><strong>Security cookies:</strong> Protect against fraud and unauthorized access</li>
              <li><strong>Form cookies:</strong> Save your progress in our intake forms</li>
            </ul>

            <h3>Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our website by collecting 
              and reporting information anonymously. This helps us improve our website and services.
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> Tracks page views, time on site, and navigation patterns</li>
              <li><strong>Performance monitoring:</strong> Helps us identify and fix technical issues</li>
            </ul>

            <h3>Functional Cookies</h3>
            <p>
              These cookies enable enhanced functionality and personalization, such as remembering 
              your preferences and providing features like live chat support.
            </p>
            <ul>
              <li><strong>Preference cookies:</strong> Remember settings like language or region</li>
              <li><strong>Chat cookies:</strong> Enable our live chat support feature</li>
            </ul>

            <h3>Marketing Cookies</h3>
            <p>
              These cookies may be set by our advertising partners to build a profile of your 
              interests and show you relevant ads on other sites. They do not directly store 
              personal information but are based on uniquely identifying your browser and device.
            </p>

            <h2>Cookie Categories</h2>
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-3 text-left">Category</th>
                  <th className="border p-3 text-left">Purpose</th>
                  <th className="border p-3 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">Essential</td>
                  <td className="border p-3">Required for site functionality</td>
                  <td className="border p-3">Session / 1 year</td>
                </tr>
                <tr>
                  <td className="border p-3">Analytics</td>
                  <td className="border p-3">Usage statistics</td>
                  <td className="border p-3">2 years</td>
                </tr>
                <tr>
                  <td className="border p-3">Functional</td>
                  <td className="border p-3">Enhanced features</td>
                  <td className="border p-3">1 year</td>
                </tr>
                <tr>
                  <td className="border p-3">Marketing</td>
                  <td className="border p-3">Advertising personalization</td>
                  <td className="border p-3">90 days</td>
                </tr>
              </tbody>
            </table>

            <h2>Managing Cookies</h2>
            <p>
              You can control and manage cookies in various ways. Please note that removing or 
              blocking cookies may impact your user experience and some functionality may no 
              longer be available.
            </p>

            <h3>Browser Settings</h3>
            <p>
              Most browsers allow you to refuse to accept cookies and to delete cookies. The 
              methods for doing so vary from browser to browser. You can find instructions for 
              popular browsers here:
            </p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Edge</a></li>
            </ul>

            <h3>Opt-Out Tools</h3>
            <p>You can also opt out of certain types of cookies using these tools:</p>
            <ul>
              <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
              <li><a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Network Advertising Initiative Opt-out</a></li>
            </ul>

            <h2>Third-Party Cookies</h2>
            <p>
              Some cookies are placed by third-party services that appear on our pages. We do 
              not control these third parties&apos; cookies. You can check the third-party websites 
              for more information about their cookies and how to manage them.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, 
              regulation, or our business practices. Any changes will be posted on this page with 
              an updated revision date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at:
            </p>
            <ul>
              <li>Email: <a href="mailto:privacy@webcraft.com" className="text-primary hover:underline">privacy@webcraft.com</a></li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Design Street, Creative City, ST 12345</li>
            </ul>
          </div>

          <div className="mt-12 flex gap-4">
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
