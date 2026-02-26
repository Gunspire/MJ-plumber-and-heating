import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { LeadProvider, LeadProviderFallback } from "../lib/lead-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MJ plumber and heating",
  description: "Plumbing & heating in London. Leaks, boilers, central heating, drain unblocking, and emergency call-outs.",
  icons: {
    icon: "/vf-logo.png",
    shortcut: "/vf-logo.png",
    apple: "/vf-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Suspense fallback={<LeadProviderFallback>{children}</LeadProviderFallback>}>
          <LeadProvider>{children}</LeadProvider>
        </Suspense>
      </body>
    </html>
  );
}
