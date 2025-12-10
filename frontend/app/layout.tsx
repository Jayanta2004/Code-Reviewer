import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Review Assistant - AI-Powered Code Analysis",
  description: "Get instant feedback on code quality, security vulnerabilities, and performance issues with our AI-powered code review tool.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{__html: `
          #webpack-dev-server-client-overlay,
          #webpack-dev-server-client-overlay-div,
          nextjs-portal,
          [data-nextjs-dialog-overlay],
          [data-nextjs-toast],
          [id^="__next-build-watcher"] {
            display: none !important;
          }
        `}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
