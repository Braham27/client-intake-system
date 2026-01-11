import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | WebCraft",
  description: "Terms and conditions for WebCraft web design services",
};

export default function TermsPage() {
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
          <h1>Terms of Service</h1>
          <p className="lead">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using WebCraft's web design services ("Services"), you agree to be bound by these Terms of Service ("Terms"). 
            If you disagree with any part of these terms, you may not access our Services.
          </p>

          <h2>2. Services Description</h2>
          <p>
            WebCraft provides custom web design and development services, including but not limited to:
          </p>
          <ul>
            <li>Custom website design and development</li>
            <li>Website redesign and updates</li>
            <li>E-commerce solutions</li>
            <li>Website maintenance and support</li>
            <li>Search engine optimization (SEO)</li>
            <li>Content management system setup</li>
          </ul>

          <h2>3. Project Process</h2>
          <h3>3.1 Intake Process</h3>
          <p>
            By completing our intake questionnaire, you provide information about your project requirements. 
            This information is used solely to create a proposal and, if accepted, to develop your website.
          </p>
          <h3>3.2 Proposals and Quotes</h3>
          <p>
            Proposals and price quotes are valid for 30 days from the date of issue. 
            Prices are subject to change based on scope modifications or market conditions.
          </p>
          <h3>3.3 Revisions</h3>
          <p>
            All packages include a specific number of revision rounds as outlined in your proposal. 
            Additional revisions may incur extra charges at our standard hourly rate.
          </p>

          <h2>4. Payment Terms</h2>
          <h3>4.1 Deposit</h3>
          <p>
            A deposit of 50% of the total project cost is required before work begins. 
            This deposit is non-refundable once design work has commenced.
          </p>
          <h3>4.2 Final Payment</h3>
          <p>
            The remaining balance is due upon project completion, before the website goes live. 
            For ongoing maintenance services, payment is due monthly in advance.
          </p>
          <h3>4.3 Late Payments</h3>
          <p>
            Late payments may incur a fee of 1.5% per month on the outstanding balance. 
            We reserve the right to suspend services until payment is received.
          </p>

          <h2>5. Intellectual Property</h2>
          <h3>5.1 Ownership</h3>
          <p>
            Upon full payment, you will own the final website design and all custom graphics created specifically for your project. 
            Third-party elements (stock photos, fonts, plugins) remain licensed according to their respective terms.
          </p>
          <h3>5.2 Portfolio Rights</h3>
          <p>
            We retain the right to display your completed website in our portfolio and marketing materials 
            unless a confidentiality agreement is signed.
          </p>

          <h2>6. Client Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate and complete project information</li>
            <li>Supply all required content (text, images, logos) in a timely manner</li>
            <li>Respond to feedback requests within 5 business days</li>
            <li>Provide timely approvals at each project milestone</li>
            <li>Maintain backup copies of content you provide</li>
          </ul>

          <h2>7. Project Timeline</h2>
          <p>
            Project timelines are estimates based on the scope of work and our current workload. 
            Delays caused by late content delivery, extended review periods, or scope changes may extend the timeline.
          </p>

          <h2>8. Cancellation Policy</h2>
          <p>
            If you wish to cancel a project after work has begun:
          </p>
          <ul>
            <li>Before design begins: Full deposit refund minus a $250 administrative fee</li>
            <li>During design phase: Deposit is non-refundable; you will receive work completed to date</li>
            <li>During development: Payment for work completed to date is required</li>
          </ul>

          <h2>9. Warranty and Support</h2>
          <p>
            We provide a 30-day warranty period after launch during which we will fix any bugs or issues 
            related to the original scope of work at no additional charge.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            WebCraft shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
            resulting from your use of our Services. Our total liability shall not exceed the amount paid for the specific service.
          </p>

          <h2>11. Confidentiality</h2>
          <p>
            We will treat all information you provide as confidential and will not share it with third parties 
            except as necessary to complete your project (e.g., hosting providers, plugin vendors).
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective upon posting to our website. 
            Your continued use of our Services constitutes acceptance of the modified Terms.
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of California, 
            without regard to its conflict of law provisions.
          </p>

          <h2>14. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <ul>
            <li>Email: legal@webcraft.com</li>
            <li>Phone: (555) 123-4567</li>
            <li>Address: 123 Web Street, Suite 100, San Francisco, CA 94102</li>
          </ul>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-0">
              By using our Services or completing our intake questionnaire, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
