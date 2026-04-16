// Function to convert file URLs for inline viewing, especially for PDFs
export const fileToInline = (url: string) => {
  url = url.replace("/upload/", "/upload/pg_1/"); // Get the first page of the PDF as a preview

  // If the file is a PDF, replace the extension with .png to show a preview image instead of the PDF
  const endExt = url.split('.').pop()?.toLowerCase();
  if (endExt === "pdf") {
    url = url.replace(".pdf", ".png");
  }

  return url;
}