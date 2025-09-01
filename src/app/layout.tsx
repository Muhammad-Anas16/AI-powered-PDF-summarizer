import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Toaster } from "@/components/ui/sonner";
import SessionWrapper from "@/components/common/SessionWrapper";
import ReduxProvider from "@/components/common/ReduxProvider";
import StoringUserId from "@/components/storingUserId";

const geistSans = FontSans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lubb - AI-powered PDF summarizer",
  description:
    "Save hours of reading time. Transform Lengthy PDFs into clear, accurate summaries in seconds with our advanced AI technology.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <ReduxProvider>
          <SessionWrapper>
            <div className="relative flex flex-col min-h-screen">
              <Header />
              <StoringUserId />
              <main>{children}</main>
              <Footer />
            </div>
            <Toaster />
          </SessionWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
