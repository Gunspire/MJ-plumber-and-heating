import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LeadConnectorChatWidget } from "../components/LeadConnectorChatWidget";

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
        <LeadConnectorChatWidget
          src="https://beta.leadconnectorhq.com/loader.js"
          resourcesUrl="https://beta.leadconnectorhq.com/chat-widget/loader.js"
          widgetId="69a04d87c13c9044b12a5259"
        />
      </body>
    </html>
  );
}
