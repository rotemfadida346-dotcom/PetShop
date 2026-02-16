import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

const assistant = Assistant({ subsets: ["latin", "hebrew"], variable: "--font-assistant", weight: ["300", "400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: { default: `${SITE_NAME} - חנות חיות מחמד`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${assistant.variable} font-sans antialiased bg-bg text-text-primary`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
