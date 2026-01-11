import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Professional Web Design Services | Client Intake",
  description: "Transform your online presence with our professional web design services. Start your project with our comprehensive intake form.",
  keywords: "web design, website development, professional websites, intake form, client onboarding",
  openGraph: {
    title: "Professional Web Design Services",
    description: "Transform your online presence with our professional web design services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
