import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AuthInitializer } from "@/context/AuthInitializer";
import { Sora } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";

// personnal Font for the project
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora"
})

export const metadata: Metadata = {
  title: "Viati",
  description: "plan you dates, event or vacations with your loved ones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sora.variable} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/*Wrap the application in the Theme provider to switch properly from Dark Mode to Light Mode */}
        <ThemeProvider>
          {/*Wrap the application with the AuthProvider to provide authentication context to all components */}
          <AuthProvider>
            <AuthInitializer>{children}</AuthInitializer>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
