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
import { MobileSidebar } from "@/components/MobileSidebar";
import { ThemeProvider } from "./providers/theme-provider";
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
          "min-h-screen bg-off-white font-sans antialiased dark:bg-background-dark",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <ToastProvider>
              <SessionProvider>
                <div className="h-full dark:bg-background-dark ">
                  <div className="h-[80px] fixed inset-y-0 w-full z-40 bg-blue-light dark:bg-blue-dark">
                    <div className="ml-4 md:p-4 border-b h-full flex items-center shadow-sm z-50 dark:bg-blue-25 dark:text-off-white">
                      <MobileSidebar />
                      <Navbar />
                    </div>
                  </div>
                  <div className="hidden md:flex h-full w-64 lg:w-72 xl:w-80 flex-col fixed inset-y-0 z-40 pt-20">
                    <Sidebar />
                  </div>
                  <main className="md:pl-64 lg:pl-72 xl:pl-80 pt-[80px] h-full">
                    {children}
                  </main>
                </div>
              </SessionProvider>
            </ToastProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
