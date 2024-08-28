/* eslint-disable @next/next/no-sync-scripts */
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Chatter",
  description: "Generated by create next app",
  icons: {
    icon: "/_next/static/media/WhatsApp.svg.13d31fcc.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* <script
          type="module"
          src="../../public/firebase-messaging-sw.js"
        ></script> */}
      </body>
    </html>
  );
}
