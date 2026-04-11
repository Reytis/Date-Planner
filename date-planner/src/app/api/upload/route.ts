import { NextResponse } from "next/server";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: Request) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { error: "Cloudinary credentials are not configured." },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (!allowedMimeTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Only images and PDFs are allowed." },
      { status: 400 }
    );
  }

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;
  const uploadForm = new FormData();
  uploadForm.append("file", file as Blob, file.name);
  uploadForm.append("resource_type", "auto");
  uploadForm.append("folder", "date_planner");

  const auth = Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString("base64");
  
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
  return NextResponse.json({ url: json.secure_url, publicId: json.public_id });
}
