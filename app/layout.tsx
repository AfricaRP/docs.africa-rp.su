import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Lora } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import "katex/dist/katex.min.css";
import Sidebar from "./Sidebar";
import { TableOfContents } from "./components/TableOfContents";
import { SidebarBottom } from "./components/SidebarBottom";
import { MobileHeader } from "./components/MobileHeader";
import { ScrollProgress } from "./components/ScrollProgress";
import { ScrollHandler } from "./components/ScrollHandler";

import { ServerStatus } from "./components/ServerStatus";

const minecraftFont = localFont({
  src: "./fonts/minecraft.ttf",
  variable: "--font-minecraft",
});

const interFont = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const loraFont = Lora({
  subsets: ["latin", "cyrillic"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Документация AfricaRP",
  description: "Официальная документация проекта AfricaRP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var font = localStorage.getItem('docs-font') || 'minecraft';
                document.documentElement.setAttribute('data-font', font);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${minecraftFont.variable} ${interFont.variable} ${loraFont.variable} bg-transparent text-zinc-800 dark:text-zinc-100 min-h-screen selection:bg-blue-200 dark:selection:bg-blue-900 font-main`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {}
          <div className="fixed inset-0 z-[-2] bg-gradient-to-bl from-zinc-200 via-zinc-50 to-zinc-50 dark:from-zinc-800 dark:via-zinc-950 dark:to-zinc-950" />
          
          {}
          <div className="absolute top-0 left-0 right-0 h-[600px] z-[-1] bg-grid-pattern text-zinc-900 dark:text-white opacity-[0.07] dark:opacity-[0.06] [mask-image:linear-gradient(to_bottom,black_10%,transparent_100%)] pointer-events-none" />

          <ScrollProgress />
          <ScrollHandler />
          <div className="flex flex-col md:flex-row min-h-screen">
            <MobileHeader>
              <ServerStatus />
              <Sidebar />
              <SidebarBottom />
            </MobileHeader>
            <aside className="hidden md:flex w-64 border-r border-zinc-200 dark:border-zinc-800 p-4 shrink-0 overflow-y-auto sticky top-0 h-screen flex-col">
              <a href="/" className="block mb-4 flex justify-center shrink-0">
                <img
                  src="/media/logo.png"
                  alt="AfricaRP Logo"
                  className="w-full h-auto object-contain"
                />
              </a>
              <ServerStatus />
              <Sidebar />
              <SidebarBottom />
            </aside>
            <div className="flex-1 flex justify-between min-w-0">
              <main className="flex-1 px-4 sm:px-8 lg:px-16 py-8 prose prose-zinc dark:prose-invert max-w-4xl min-w-0 mx-auto font-main">
                {children}
              </main>
              <aside className="py-8 pr-8 hidden xl:block w-64 shrink-0 sticky top-0 h-screen overflow-y-auto font-main">
                <TableOfContents />
              </aside>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
