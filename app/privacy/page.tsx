import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | WebCraft",
  description: "Privacy policy for WebCraft web design services",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <Link href="/" className="text-xl font-bold gradient-text">
              WebCraft
            </Link>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

          <h2>1. Introduction</h2>
          <p>
            WebCraft ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website 
            and services.
          </p>

          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Personal Information</h3>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li><strong>Contact Information:</strong> Name, email address, phone number, business address</li>
            <li><strong>Business Information:</strong> Company name, industry, website URL, business goals</li>
            <li><strong>Project Information:</strong> Design preferences, content, branding materials, competitor information</li>
            <li><strong>Payment Information:</strong> Credit card details, billing address (processed securely through Stripe)</li>
            <li><strong>Communications:</strong> Messages, feedback, and correspondence with our team</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>When you visit our website, we automatically collect:</p>
          <ul>
            <li>IP address and device information</li>
            <li>Browser type and operating system</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website addresses</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Create and deliver your custom website</li>
            <li>Communicate with you about your project</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your questions and requests</li>
            <li>Process payments and prevent fraud</li>
            <li>Analyze usage patterns to improve our website</li>
            <li>Send marketing communications (with your consent)</li>
          </ul>

          <h2>4. Information Sharing</h2>
          <p>We do not sell your personal information. We may share your information with:</p>
          
          <h3>4.1 Service Providers</h3>
          <p>
            We work with third-party service providers who help us operate our business, including:
          </p>
          <ul>
            <li>Hosting providers (e.g., Vercel, AWS)</li>
            <li>Payment processors (Stripe)</li>
            <li>Email service providers</li>
            <li>Analytics providers (Google Analytics)</li>
            <li>Customer support tools</li>
          </ul>

          <h3>4.2 Legal Requirements</h3>
          <p>
            We may disclose your information if required by law, court order, or government request, 
            or if we believe disclosure is necessary to protect our rights or the safety of others.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information, including:
          </p>
          <ul>
            <li>SSL/TLS encryption for data in transit</li>
            <li>Encrypted storage for sensitive data</li>
            <li>Access controls and authentication</li>
            <li>Regular security assessments</li>
            <li>Employee training on data protection</li>
          </ul>
          <p>
            However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide our services and fulfill the purposes 
            described in this policy. Specifically:
          </p>
          <ul>
            <li>Project data: Retained for the duration of our business relationship plus 7 years</li>
            <li>Saved intake forms: 30 days (or until submission)</li>
            <li>Communication records: 3 years</li>
            <li>Payment records: As required by tax and accounting laws</li>
          </ul>

          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of your personal information</li>
            <li><strong>Correction:</strong> Request correction of inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Portability:</strong> Receive your data in a portable format</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            <li><strong>Restriction:</strong> Request we limit how we use your data</li>
          </ul>
          <p>
            To exercise these rights, please contact us at privacy@webcraft.com.
          </p>

          <h2>8. Cookies and Tracking</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Remember your preferences and settings</li>
            <li>Understand how you use our website</li>
            <li>Improve our services</li>
            <li>Provide personalized content</li>
          </ul>
          <p>
            You can control cookies through your browser settings. Note that disabling cookies may affect site functionality.
          </p>

          <h2>9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices 
            of these websites. We encourage you to read their privacy policies.
          </p>

          <h2>10. Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13. We do not knowingly collect personal information from children. 
            If you believe we have collected information from a child, please contact us immediately.
          </p>

          <h2>11. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own. 
            We ensure appropriate safeguards are in place to protect your information in accordance with applicable law.
          </p>

          <h2>12. California Privacy Rights</h2>
          <p>
            California residents have additional rights under the California Consumer Privacy Act (CCPA), including:
          </p>
          <ul>
            <li>The right to know what personal information we collect</li>
            <li>The right to request deletion of personal information</li>
            <li>The right to opt-out of the sale of personal information (we do not sell your data)</li>
            <li>The right to non-discrimination for exercising your privacy rights</li>
          </ul>

          <h2>13. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material changes by posting 
            the new policy on our website and updating the "Last updated" date.
          </p>

          <h2>14. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
          </p>
          <ul>
            <li>Email: privacy@webcraft.com</li>
            <li>Phone: (555) 123-4567</li>
            <li>Address: 123 Web Street, Suite 100, San Francisco, CA 94102</li>
          </ul>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-0">
              By using our website and services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
