import { IntakeFormWrapper } from "@/components/intake/intake-form-wrapper";

export const metadata = {
  title: "Project Intake Form | WebCraft",
  description: "Tell us about your project. Our comprehensive questionnaire helps us understand your needs and create the perfect website for you.",
};

export default function IntakePage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <IntakeFormWrapper />
    </main>
  );
}
