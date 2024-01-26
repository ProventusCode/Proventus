import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Poppins as DefaultFont } from "next/font/google";
import "../styles/globals.css";

const defaultFont = DefaultFont({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Proventus",
  description: "Competitive programming statistics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${defaultFont.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
