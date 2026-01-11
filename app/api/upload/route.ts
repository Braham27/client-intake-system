import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "./uploads";
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || "10485760", 10); // 10MB default

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/svg+xml",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const intakeFormId = formData.get("intakeFormId") as string | null;
    const fileType = formData.get("fileType") as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "File type not allowed" },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    const uploadPath = path.join(process.cwd(), UPLOAD_DIR);
    await mkdir(uploadPath, { recursive: true });

    // Generate unique filename
    const ext = path.extname(file.name);
    const uniqueFilename = `${uuidv4()}${ext}`;
    const filePath = path.join(uploadPath, uniqueFilename);

    // Write file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Save file record to database
    const uploadedFile = await prisma.uploadedFile.create({
      data: {
        filename: uniqueFilename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        path: filePath,
        url: `/uploads/${uniqueFilename}`,
        fileType: fileType || "general",
        intakeFormId: intakeFormId || undefined,
      },
    });

    return NextResponse.json({
      success: true,
      file: {
        id: uploadedFile.id,
        filename: uploadedFile.filename,
        originalName: uploadedFile.originalName,
        url: uploadedFile.url,
        size: uploadedFile.size,
        mimeType: uploadedFile.mimeType,
      },
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get("id");

    if (!fileId) {
      return NextResponse.json(
        { success: false, error: "File ID required" },
        { status: 400 }
      );
    }

    const file = await prisma.uploadedFile.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 }
      );
    }

    // Delete from database
    await prisma.uploadedFile.delete({
      where: { id: fileId },
    });

    // Optionally delete from filesystem
    // await unlink(file.path);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("File delete error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
