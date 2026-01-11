import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function generateResumeToken(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 15)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function calculateEstimatedQuote(formData: Record<string, unknown>): number {
  let basePrice = 2500; // Starting price

  // Add for e-commerce
  if (formData.needsEcommerce) {
    basePrice += 2000;
    const productCount = formData.productCount as string;
    if (productCount === "51-100") basePrice += 500;
    if (productCount === "101-500") basePrice += 1000;
    if (productCount === "500+") basePrice += 2000;
  }

  // Add for membership
  if (formData.needsMembership) {
    basePrice += 1500;
    if (formData.membershipPaid) basePrice += 500;
  }

  // Add for features
  if (formData.needsBlog) basePrice += 300;
  if (formData.needsCalendar) basePrice += 400;
  if (formData.needsMultiLanguage) basePrice += 800;
  if (formData.needsLiveChat) basePrice += 200;

  // Content services
  if (formData.contentProvider === "need_copywriting") basePrice += 1000;
  if (formData.needsPhotography) basePrice += 500;

  // Technical setup
  if (formData.needsDomainPurchase) basePrice += 20;
  if (formData.needsHostingSetup) basePrice += 100;

  // Maintenance
  if (formData.needsMaintenance) {
    const level = formData.maintenanceLevel as string;
    if (level === "basic") basePrice += 50 * 12;
    if (level === "standard") basePrice += 100 * 12;
    if (level === "premium") basePrice += 200 * 12;
  }

  return basePrice;
}

export const FORM_STEPS = [
  { id: 1, title: "Contact Info", description: "Your basic information" },
  { id: 2, title: "Goals", description: "Website objectives" },
  { id: 3, title: "Features", description: "Required functionality" },
  { id: 4, title: "Design", description: "Visual preferences" },
  { id: 5, title: "Content", description: "Text and media" },
  { id: 6, title: "Technical", description: "Domain and hosting" },
  { id: 7, title: "Timeline", description: "Schedule and budget" },
  { id: 8, title: "Competitors", description: "Market research" },
  { id: 9, title: "Services", description: "Ongoing support" },
  { id: 10, title: "Review", description: "Final review and sign" },
];

export const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Real Estate",
  "E-commerce",
  "Education",
  "Legal",
  "Restaurant/Food",
  "Fitness/Wellness",
  "Non-profit",
  "Construction",
  "Manufacturing",
  "Professional Services",
  "Creative/Design",
  "Other",
];

export const BUDGET_RANGES = [
  { value: "under-2500", label: "Under $2,500" },
  { value: "2500-5000", label: "$2,500 - $5,000" },
  { value: "5000-10000", label: "$5,000 - $10,000" },
  { value: "10000-25000", label: "$10,000 - $25,000" },
  { value: "25000-50000", label: "$25,000 - $50,000" },
  { value: "50000+", label: "$50,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

export const DESIGN_STYLES = [
  { value: "modern", label: "Modern & Clean", description: "Sleek lines, minimal clutter, contemporary feel" },
  { value: "classic", label: "Classic & Traditional", description: "Timeless design, professional, established look" },
  { value: "minimalist", label: "Minimalist", description: "Less is more, focus on essentials" },
  { value: "bold", label: "Bold & Creative", description: "Eye-catching, unique, makes a statement" },
  { value: "playful", label: "Playful & Fun", description: "Bright colors, friendly, approachable" },
  { value: "luxury", label: "Luxury & Elegant", description: "Premium feel, sophisticated, high-end" },
];

export const PRODUCT_COUNT_OPTIONS = [
  { value: "1-10", label: "1-10 products" },
  { value: "11-50", label: "11-50 products" },
  { value: "51-100", label: "51-100 products" },
  { value: "101-500", label: "101-500 products" },
  { value: "500+", label: "500+ products" },
];

export const PAYMENT_GATEWAYS = [
  { value: "stripe", label: "Stripe" },
  { value: "paypal", label: "PayPal" },
  { value: "square", label: "Square" },
  { value: "authorize", label: "Authorize.net" },
  { value: "other", label: "Other" },
];
