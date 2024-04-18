import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import ToastProvider from "./providers/ToastProvider";
import { SessionProvider } from "../app/providers/SessionProvider";
import Sidebar from "@/components/sidebar";
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <ToastProvider>
            <SessionProvider>
              <div className="h-full">
                <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                  <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
                    {/* <MobileSidebar /> */}
                    <Navbar />
                  </div>
                </div>
                <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                  <Sidebar />
                </div>
                <main className="md:pl-56 pt-[80px] h-full">{children}</main>
              </div>
            </SessionProvider>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
