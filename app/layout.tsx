import type { Metadata } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "next-themes"
import "./globals.css"
import Sidebar from "./Sidebar"
import { TableOfContents } from "./components/TableOfContents"
import { SidebarBottom } from "./components/SidebarBottom"
import { MobileHeader } from "./components/MobileHeader"
import { ScrollProgress } from "./components/ScrollProgress"

const minecraftFont = localFont({
  src: "./fonts/minecraft.ttf",
  variable: "--font-minecraft",
})

export const metadata: Metadata = {
  title: "Документация AfricaRP",
  description: "Официальная документация проекта AfricaRP",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${minecraftFont.className} bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ScrollProgress />
          <div className="flex flex-col md:flex-row min-h-screen">
            <MobileHeader>
              <Sidebar />
              <SidebarBottom />
            </MobileHeader>
            <aside className="hidden md:flex w-64 border-r border-zinc-200 dark:border-zinc-800 p-4 shrink-0 overflow-y-auto sticky top-0 h-screen flex-col">
              <a href="/" className="block mb-8 flex justify-center shrink-0">
                <img src="/media/logo.svg" alt="AfricaRP Logo" className="w-full max-w-[160px] h-auto object-contain" />
              </a>
              <Sidebar />
              <SidebarBottom />
            </aside>
            <div className="flex-1 flex justify-between min-w-0">
              <main className="flex-1 px-4 sm:px-8 lg:px-16 py-8 overflow-y-auto prose prose-zinc dark:prose-invert max-w-4xl min-w-0 mx-auto">
                {children}
              </main>
              <aside className="py-8 pr-8 hidden xl:block w-64 shrink-0 sticky top-0 h-screen overflow-y-auto">
                <TableOfContents />
              </aside>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}