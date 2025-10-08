import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { QueryProvider } from "@/lib/query-provider";
import { Toaster } from "react-hot-toast";
import AuthInitializer from "@/components/AuthInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FeedBook",
  description: "Created by Pranav Ojha",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ReduxProvider>
          <AuthInitializer />
          <QueryProvider>
            <Toaster />
            {children}
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}