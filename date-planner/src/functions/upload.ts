
// Function to handle file uploads, returns the URL and ID of the uploaded file
export const uploadFile = async (file: File | null): Promise<{ url: string; publicId: string } | null> => {

  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "Upload failed");
  }

  return json;
}

// Function to handle file deletion based on its public ID
export const deleteFile = async (publicId: string): Promise<void> => {
  if (!publicId) return;

  const response = await fetch("/api/upload", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ publicId }),
  });

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.error || "Delete failed");
  }
};