import { NextResponse } from "next/server";

// API route to handle file uploads to Cloudinary
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// Allowed MIME types for upload
const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];

// Handle file upload and return url from Cloudinary
export async function POST(req: Request) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { error: "Cloudinary credentials are not configured." },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file"); // The file is expected to be sent in the "file" field of the form data

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (!allowedMimeTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Only images and PDFs are allowed." },
      { status: 400 }
    );
  }

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`; // use auto to let Cloudinary detect the resource type
  const uploadForm = new FormData();

  uploadForm.append("file", file as Blob, file.name); // Append the file with its original name
  uploadForm.append("resource_type", "auto"); // Let Cloudinary auto-detect the resource type (image, raw, etc.)
  uploadForm.append("folder", "date_planner"); // Optional: specify a folder in Cloudinary to organize uploads

  const auth = Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString("base64"); // Basic auth for Cloudinary API
  
  // Upload the file to Cloudinary and handle the response
  const response = await fetch(cloudinaryUrl, {
    method: "POST",
    body: uploadForm,
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: "Cloudinary upload failed.", details: errorText },
      { status: 500 }
    );
  }

  const json = await response.json();
  return NextResponse.json({ url: json.secure_url, publicId: json.public_id }); // Return the secure URL and public ID of the uploaded file
}

// Handle DELETE requests to remove files from Cloudinary
export async function DELETE(req: Request) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { error: "Cloudinary credentials are not configured." },
      { status: 500 }
    );
  }

  const body = await req.json()
  const publicId = body.publicId

  if (!publicId || typeof publicId !== "string") {
    return NextResponse.json({ error: "No valid public ID provided." }, { status: 400 });
  }

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`;
  const deleteForm = new FormData();

  deleteForm.append("public_id", publicId);
  deleteForm.append("resource_type", "auto");

  const auth = Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString("base64");

  const response = await fetch(cloudinaryUrl, {
    method: "POST",
    body: deleteForm,
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: "Cloudinary deletion failed.", details: errorText },
      { status: 500 }
    );
  }

  const json = await response.json();
  return NextResponse.json({ message: "File deleted successfully.", result: json });
}
