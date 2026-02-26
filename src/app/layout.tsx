import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MJ plumber and heating",
  description: "Fast response plumbing and heating in London. Leaks, boilers, central heating, and emergency call-outs.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Script
          id="leadconnector-chat-widget"
          src="https://beta.leadconnectorhq.com/loader.js"
          data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="69a04d87c13c9044b12a5259"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
