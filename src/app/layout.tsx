import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Timely management",
  description: "Timely management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className}`}>
        <SidebarProvider>
        <AppSidebar />
          <main className="w-full">
            <SidebarTrigger />
            <div className="p-4">
              {children}  
            </div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
