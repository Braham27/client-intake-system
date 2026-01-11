import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const EMAIL_FROM = process.env.EMAIL_FROM || "WebCraft <hello@webcraft.com>";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

export async function sendConfirmationEmail({
  to,
  name,
  intakeFormId,
  wantsConsultation,
}: {
  to: string;
  name: string;
  intakeFormId: string;
  wantsConsultation: boolean;
}) {
  const subject = "Thank You for Your Website Project Inquiry";
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #7c3aed; margin: 0;">WebCraft</h1>
      </div>
      
      <h2 style="color: #1f2937;">Thank You, ${name}!</h2>
      
      <p>We've received your website project questionnaire and we're excited to learn about your project!</p>
      
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #1f2937;">What Happens Next?</h3>
        <ol style="margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 10px;">Our team will review your requirements within 24-48 hours</li>
          <li style="margin-bottom: 10px;">You'll receive a detailed proposal with pricing and timeline</li>
          <li style="margin-bottom: 10px;">We'll schedule a call to discuss your project and answer questions</li>
        </ol>
      </div>
      
      ${wantsConsultation ? `
        <div style="background: #ede9fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #5b21b6;">📅 Schedule Your Consultation</h3>
          <p style="margin-bottom: 15px;">You requested a free consultation. Book your preferred time now:</p>
          <a href="${APP_URL}/schedule?intake=${intakeFormId}" 
             style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
            Schedule Consultation
          </a>
        </div>
      ` : ''}
      
      <p>If you have any immediate questions, feel free to reply to this email or call us at <strong>(555) 123-4567</strong>.</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px; margin: 0;">
          Best regards,<br>
          <strong>The WebCraft Team</strong>
        </p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
        <p>Reference ID: ${intakeFormId}</p>
        <p>© ${new Date().getFullYear()} WebCraft. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to, subject, html });
}

export async function sendResumeEmail({
  to,
  resumeToken,
  name,
}: {
  to: string;
  resumeToken: string;
  name: string;
}) {
  const resumeUrl = `${APP_URL}/intake?resume=${resumeToken}`;
  const subject = "Continue Your Website Project Questionnaire";
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #7c3aed; margin: 0;">WebCraft</h1>
      </div>
      
      <h2 style="color: #1f2937;">Hi ${name}!</h2>
      
      <p>Your website project questionnaire has been saved. You can continue filling it out at any time using the link below:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resumeUrl}" 
           style="display: inline-block; background: #7c3aed; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">
          Continue Questionnaire
        </a>
      </div>
      
      <p style="color: #6b7280;">Or copy and paste this link into your browser:</p>
      <p style="background: #f3f4f6; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 14px;">
        ${resumeUrl}
      </p>
      
      <p>This link will work for the next 30 days. If you have any questions, just reply to this email!</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px; margin: 0;">
          Best regards,<br>
          <strong>The WebCraft Team</strong>
        </p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to, subject, html });
}

export async function sendConsultationConfirmation({
  to,
  name,
  date,
  time,
  timezone,
  consultationId,
}: {
  to: string;
  name: string;
  date: string;
  time: string;
  timezone: string;
  consultationId: string;
}) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const subject = `Consultation Confirmed - ${formattedDate} at ${time}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #7c3aed; margin: 0;">WebCraft</h1>
      </div>
      
      <h2 style="color: #1f2937;">Your Consultation is Confirmed!</h2>
      
      <p>Hi ${name},</p>
      
      <p>Your free consultation has been scheduled. We're looking forward to discussing your project!</p>
      
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #1f2937;">📅 Consultation Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Date:</td>
            <td style="padding: 8px 0; font-weight: 600;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Time:</td>
            <td style="padding: 8px 0; font-weight: 600;">${time} (${timezone})</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Duration:</td>
            <td style="padding: 8px 0; font-weight: 600;">30 minutes</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Format:</td>
            <td style="padding: 8px 0; font-weight: 600;">Video Call (Zoom)</td>
          </tr>
        </table>
      </div>
      
      <div style="background: #ede9fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h4 style="margin-top: 0; color: #5b21b6;">📝 Before Your Call</h4>
        <ul style="margin: 0; padding-left: 20px;">
          <li>Review your website questionnaire responses</li>
          <li>Prepare any questions you'd like to ask</li>
          <li>Have examples of websites you like ready to share</li>
        </ul>
      </div>
      
      <p style="font-size: 14px; color: #6b7280;">
        Need to reschedule? <a href="${APP_URL}/schedule/manage?id=${consultationId}" style="color: #7c3aed;">Click here</a>
      </p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px; margin: 0;">
          Best regards,<br>
          <strong>The WebCraft Team</strong>
        </p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to, subject, html });
}

export async function sendAdminNotification({
  type,
  intakeFormId,
  consultationId,
  clientName,
  clientEmail,
  businessName,
  date,
  time,
  wantsConsultation,
}: {
  type: "new_intake" | "new_consultation";
  intakeFormId?: string;
  consultationId?: string;
  clientName: string;
  clientEmail: string;
  businessName?: string;
  date?: string;
  time?: string;
  wantsConsultation?: boolean;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  
  if (!adminEmail) {
    console.warn("No admin email configured");
    return;
  }

  let subject: string;
  let content: string;

  if (type === "new_intake") {
    subject = `🎉 New Intake Form: ${clientName}${businessName ? ` (${businessName})` : ''}`;
    content = `
      <h2>New Client Intake Received</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; background: #f3f4f6;"><strong>Client:</strong></td>
          <td style="padding: 8px; background: #f3f4f6;">${clientName}</td>
        </tr>
        <tr>
          <td style="padding: 8px;"><strong>Email:</strong></td>
          <td style="padding: 8px;">${clientEmail}</td>
        </tr>
        ${businessName ? `
        <tr>
          <td style="padding: 8px; background: #f3f4f6;"><strong>Business:</strong></td>
          <td style="padding: 8px; background: #f3f4f6;">${businessName}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px;"><strong>Wants Consultation:</strong></td>
          <td style="padding: 8px;">${wantsConsultation ? 'Yes' : 'No'}</td>
        </tr>
      </table>
      <p style="margin-top: 20px;">
        <a href="${APP_URL}/admin/intakes/${intakeFormId}" 
           style="display: inline-block; background: #7c3aed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
          View Intake Form
        </a>
      </p>
    `;
  } else {
    subject = `📅 New Consultation: ${clientName} - ${date} at ${time}`;
    content = `
      <h2>New Consultation Scheduled</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; background: #f3f4f6;"><strong>Client:</strong></td>
          <td style="padding: 8px; background: #f3f4f6;">${clientName}</td>
        </tr>
        <tr>
          <td style="padding: 8px;"><strong>Email:</strong></td>
          <td style="padding: 8px;">${clientEmail}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f3f4f6;"><strong>Date:</strong></td>
          <td style="padding: 8px; background: #f3f4f6;">${date}</td>
        </tr>
        <tr>
          <td style="padding: 8px;"><strong>Time:</strong></td>
          <td style="padding: 8px;">${time}</td>
        </tr>
      </table>
      <p style="margin-top: 20px;">
        <a href="${APP_URL}/admin/consultations/${consultationId}" 
           style="display: inline-block; background: #7c3aed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
          View Consultation
        </a>
      </p>
    `;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      ${content}
    </body>
    </html>
  `;

  return sendEmail({ to: adminEmail, subject, html });
}

export async function sendFollowUpEmail({
  to,
  name,
  resumeToken,
  daysSinceStart,
}: {
  to: string;
  name: string;
  resumeToken: string;
  daysSinceStart: number;
}) {
  const resumeUrl = `${APP_URL}/intake?resume=${resumeToken}`;
  const scheduleUrl = `${APP_URL}/schedule`;
  
  const subject = daysSinceStart === 1 
    ? "Need Help Completing Your Questionnaire?" 
    : "We're Still Here to Help!";
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #7c3aed; margin: 0;">WebCraft</h1>
      </div>
      
      <h2 style="color: #1f2937;">Hi ${name}!</h2>
      
      <p>We noticed you started our website project questionnaire but haven't finished yet. No worries – we know it takes time to gather all the details!</p>
      
      <p>Your progress has been saved, and you can continue whenever you're ready:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resumeUrl}" 
           style="display: inline-block; background: #7c3aed; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">
          Continue Where You Left Off
        </a>
      </div>
      
      <div style="background: #ede9fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h4 style="margin-top: 0; color: #5b21b6;">💬 Would you prefer to talk first?</h4>
        <p style="margin-bottom: 15px;">If you have questions or would like to discuss your project before continuing, we're happy to help!</p>
        <a href="${scheduleUrl}" 
           style="display: inline-block; background: white; color: #7c3aed; padding: 10px 20px; text-decoration: none; border-radius: 6px; border: 2px solid #7c3aed; font-weight: 600;">
          Schedule a Free Consultation
        </a>
      </div>
      
      <p>If you have any questions, just reply to this email!</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px; margin: 0;">
          Best regards,<br>
          <strong>The WebCraft Team</strong>
        </p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to, subject, html });
}
