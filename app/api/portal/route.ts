import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

// Store verification codes temporarily (in production, use Redis or database)
const verificationCodes = new Map<string, { code: string; expires: number; verified: boolean }>();

// Generate a 6-digit verification code
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Clean expired codes
function cleanExpiredCodes() {
  const now = Date.now();
  verificationCodes.forEach((value, key) => {
    if (value.expires < now) {
      verificationCodes.delete(key);
    }
  });
}

// POST: Request verification code or verify code
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code, action } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // Action: request - Send verification code
    if (action === "request") {
      // Check if email exists in our system
      const client = await prisma.client.findUnique({
        where: { email: normalizedEmail },
      });

      const intakeForm = await prisma.intakeForm.findFirst({
        where: { contactEmail: normalizedEmail },
      });

      const consultation = await prisma.consultation.findFirst({
        where: { email: normalizedEmail },
      });

      if (!client && !intakeForm && !consultation) {
        return NextResponse.json(
          { error: "No records found for this email address" },
          { status: 404 }
        );
      }

      // Generate and store verification code
      const verificationCode = generateVerificationCode();
      verificationCodes.set(normalizedEmail, {
        code: verificationCode,
        expires: Date.now() + 10 * 60 * 1000, // 10 minutes
        verified: false,
      });

      // Clean old codes periodically
      cleanExpiredCodes();

      // Send verification email
      const firstName = client?.firstName || intakeForm?.contactFirstName || consultation?.firstName || "Client";
      
      try {
        await sendEmail({
          to: normalizedEmail,
          subject: "Your WebCraft Portal Verification Code",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
                .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
                .code { font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; 
                        background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; 
                        padding: 20px; border-radius: 8px; margin: 30px 0; }
                .warning { font-size: 14px; color: #666; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Hello ${firstName}!</h1>
                <p>You requested access to your Client Portal. Use this verification code to continue:</p>
                <div class="code">${verificationCode}</div>
                <p class="warning">
                  This code expires in 10 minutes. If you didn't request this code, please ignore this email.
                </p>
                <p>Best regards,<br>The WebCraft Team</p>
              </div>
            </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send verification email:", emailError);
        // Still return success but note the email issue
      }

      return NextResponse.json({
        success: true,
        message: "Verification code sent to your email",
      });
    }

    // Action: verify - Verify the code
    if (action === "verify") {
      if (!code) {
        return NextResponse.json(
          { error: "Verification code is required" },
          { status: 400 }
        );
      }

      const storedData = verificationCodes.get(normalizedEmail);

      if (!storedData) {
        return NextResponse.json(
          { error: "No verification code found. Please request a new one." },
          { status: 400 }
        );
      }

      if (storedData.expires < Date.now()) {
        verificationCodes.delete(normalizedEmail);
        return NextResponse.json(
          { error: "Verification code expired. Please request a new one." },
          { status: 400 }
        );
      }

      if (storedData.code !== code) {
        return NextResponse.json(
          { error: "Invalid verification code" },
          { status: 400 }
        );
      }

      // Mark as verified
      storedData.verified = true;
      verificationCodes.set(normalizedEmail, storedData);

      // Create a session token for the client
      const sessionToken = `${Date.now()}:${Math.random().toString(36).substring(2)}`;

      return NextResponse.json({
        success: true,
        message: "Verification successful",
        sessionToken,
      });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Portal verification error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    const sessionToken = request.nextUrl.searchParams.get("token");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // Check if email is verified
    const storedData = verificationCodes.get(normalizedEmail);
    if (!storedData?.verified) {
      return NextResponse.json(
        { error: "Please verify your email first", requiresVerification: true },
        { status: 401 }
      );
    }

    // Clean up after successful access
    verificationCodes.delete(normalizedEmail);

    // First, try to find a registered client
    const client = await prisma.client.findUnique({
      where: { email: normalizedEmail },
      include: {
        intakeForms: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            status: true,
            currentStep: true,
            businessName: true,
            resumeToken: true,
            createdAt: true,
            submittedAt: true,
            estimatedQuote: true,
          },
        },
        consultations: {
          orderBy: { scheduledDate: "desc" },
          select: {
            id: true,
            scheduledDate: true,
            status: true,
            meetingType: true,
            meetingLink: true,
            duration: true,
          },
        },
      },
    });

    if (client) {
      return NextResponse.json({
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        company: client.company,
        intakeForms: client.intakeForms,
        consultations: client.consultations,
      });
    }

    // If no client, look for intake forms or consultations by email
    const [intakeForms, consultations] = await Promise.all([
      prisma.intakeForm.findMany({
        where: { contactEmail: email.toLowerCase() },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          currentStep: true,
          businessName: true,
          resumeToken: true,
          createdAt: true,
          submittedAt: true,
          estimatedQuote: true,
          contactFirstName: true,
          contactLastName: true,
        },
      }),
      prisma.consultation.findMany({
        where: { email: email.toLowerCase() },
        orderBy: { scheduledDate: "desc" },
        select: {
          id: true,
          scheduledDate: true,
          status: true,
          meetingType: true,
          meetingLink: true,
          duration: true,
          firstName: true,
          lastName: true,
        },
      }),
    ]);

    if (intakeForms.length === 0 && consultations.length === 0) {
      return NextResponse.json(
        { error: "No records found for this email address" },
        { status: 404 }
      );
    }

    // Get the first name from either intake form or consultation
    const firstName = intakeForms[0]?.contactFirstName || consultations[0]?.firstName || "Client";
    const lastName = intakeForms[0]?.contactLastName || consultations[0]?.lastName || "";

    return NextResponse.json({
      id: null,
      firstName,
      lastName,
      email,
      company: null,
      intakeForms: intakeForms.map((form) => ({
        id: form.id,
        status: form.status,
        currentStep: form.currentStep,
        businessName: form.businessName,
        resumeToken: form.resumeToken,
        createdAt: form.createdAt,
        submittedAt: form.submittedAt,
        estimatedQuote: form.estimatedQuote,
      })),
      consultations: consultations.map((c) => ({
        id: c.id,
        scheduledDate: c.scheduledDate,
        status: c.status,
        meetingType: c.meetingType,
        meetingLink: c.meetingLink,
        duration: c.duration,
      })),
    });
  } catch (error) {
    console.error("Portal API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch records" },
      { status: 500 }
    );
  }
}
