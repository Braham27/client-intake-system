import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendConsultationConfirmation, sendAdminNotification } from "@/lib/email";

// Get available time slots
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    
    // In production, integrate with calendar API (Google Calendar, Calendly, etc.)
    // For now, return mock available slots
    
    const slots = [
      { time: "09:00", available: true },
      { time: "10:00", available: true },
      { time: "11:00", available: false },
      { time: "13:00", available: true },
      { time: "14:00", available: true },
      { time: "15:00", available: true },
      { time: "16:00", available: false },
    ];

    if (!date) {
      return NextResponse.json({
        success: true,
        date: null,
        slots: slots,
      });
    }

    // Filter out already booked slots by checking scheduledDate
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookedSlots = await prisma.consultation.findMany({
      where: {
        scheduledDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: { in: ["scheduled", "confirmed"] },
      },
      select: { scheduledDate: true },
    });

    // Extract hours from booked scheduled dates
    const bookedTimes = bookedSlots.map(s => {
      const hours = s.scheduledDate.getHours();
      const minutes = s.scheduledDate.getMinutes();
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    });
    
    const availableSlots = slots.map(slot => ({
      ...slot,
      available: slot.available && !bookedTimes.includes(slot.time),
    }));

    return NextResponse.json({
      success: true,
      date,
      slots: availableSlots,
    });
  } catch (error) {
    console.error("Get slots error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get available slots" },
      { status: 500 }
    );
  }
}

// Book a consultation
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      date,
      time,
      timezone,
      topics,
      notes,
    } = data;

    // Create or find client
    let client = await prisma.client.findUnique({
      where: { email },
    });

    if (!client) {
      client = await prisma.client.create({
        data: {
          email,
          firstName,
          lastName,
          phone,
          company,
        },
      });
    }

    // Combine date and time into a single DateTime
    const [hours, minutes] = time.split(':').map(Number);
    const scheduledDateTime = new Date(date);
    scheduledDateTime.setHours(hours, minutes, 0, 0);

    // Check if slot is still available
    const startOfSlot = new Date(scheduledDateTime);
    const endOfSlot = new Date(scheduledDateTime);
    endOfSlot.setMinutes(endOfSlot.getMinutes() + 30); // 30 min buffer

    const existingBooking = await prisma.consultation.findFirst({
      where: {
        scheduledDate: {
          gte: startOfSlot,
          lt: endOfSlot,
        },
        status: { in: ["scheduled", "confirmed"] },
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { success: false, error: "This time slot is no longer available" },
        { status: 409 }
      );
    }

    // Create consultation
    const consultation = await prisma.consultation.create({
      data: {
        clientId: client.id,
        firstName,
        lastName,
        email,
        phone,
        company,
        status: "scheduled",
        scheduledDate: scheduledDateTime,
        timezone: timezone || "America/New_York",
        duration: 30, // 30 minute consultation
        topics: topics || "",
        meetingNotes: notes || "",
      },
    });

    // Send confirmation email to client
    try {
      await sendConsultationConfirmation({
        to: email,
        name: firstName,
        date,
        time,
        timezone: timezone || "America/New_York",
        consultationId: consultation.id,
      });

      // Notify admin
      await sendAdminNotification({
        type: "new_consultation",
        clientName: `${firstName} ${lastName}`,
        clientEmail: email,
        date,
        time,
        consultationId: consultation.id,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return NextResponse.json({
      success: true,
      consultation: {
        id: consultation.id,
        date,
        time,
      },
      message: "Consultation scheduled successfully",
    });
  } catch (error) {
    console.error("Book consultation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to book consultation" },
      { status: 500 }
    );
  }
}

// Cancel or reschedule consultation
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { consultationId, action, newDate, newTime } = data;

    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
      include: { client: true },
    });

    if (!consultation) {
      return NextResponse.json(
        { success: false, error: "Consultation not found" },
        { status: 404 }
      );
    }

    if (action === "cancel") {
      await prisma.consultation.update({
        where: { id: consultationId },
        data: { status: "cancelled" },
      });

      return NextResponse.json({
        success: true,
        message: "Consultation cancelled",
      });
    }

    if (action === "reschedule" && newDate && newTime) {
      // Check new slot availability
      const existingBooking = await prisma.consultation.findFirst({
        where: {
          scheduledDate: new Date(newDate),
          scheduledTime: newTime,
          status: { in: ["scheduled", "confirmed"] },
          id: { not: consultationId },
        },
      });

      if (existingBooking) {
        return NextResponse.json(
          { success: false, error: "New time slot is not available" },
          { status: 409 }
        );
      }

      await prisma.consultation.update({
        where: { id: consultationId },
        data: {
          scheduledDate: new Date(newDate),
          scheduledTime: newTime,
          status: "scheduled",
        },
      });

      return NextResponse.json({
        success: true,
        message: "Consultation rescheduled",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Update consultation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update consultation" },
      { status: 500 }
    );
  }
}
