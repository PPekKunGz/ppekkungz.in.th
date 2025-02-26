import type React from "react"
import "./globals.css"
import 'aos/dist/aos.css';
import GridPatternDashed from "@/components/_components/grid-pattern-dashed"
import Footer from "@/components/layouts/Footer"
import Header from "@/components/layouts/Header"
import AppProvider from "@/provider/AppProvider"

export const metadata = {
  title: "เว็ปไซต์ของ @PPekKunGzDev",
  description: "อยากรู้ว่าผมเป็นใครทำงานอะไรหรือทุกวันนี้มีประวัติการทำงานอะไรมาบ้างสามารถเช็คได้ที่เว็ปผมเลย!!",
  metadataBase: new URL('https://ppekkungz.in.th'),

  openGraph: {
    url: 'https://ppekkungz.in.th',
    type: 'website',
    locale: 'th_TH',
    title: "เว็ปไซต์ของ @PPekKunGzDev",
    description: "อยากรู้ว่าผมเป็นใครทำงานอะไรหรือทุกวันนี้มีประวัติการทำงานอะไรมาบ้างสามารถเช็คได้ที่เว็ปผมเลย!!",
    images: [
      {
        url: '/favicon.ico',
        width: 200,
        height: 200,
        alt: 'ppekkungz',
      },
    ],
  },
  twitter: {
    title: "เว็ปไซต์ของ @PPekKunGzDev",
    description: "อยากรู้ว่าผมเป็นใครทำงานอะไรหรือทุกวันนี้มีประวัติการทำงานอะไรมาบ้างสามารถเช็คได้ที่เว็ปผมเลย!!",
    card: 'summary_large_image',
    site: 'เว็ปไซต์ของ @PPekKunGzDev',
    creator: '@PPekKunGzDev',
    images: [
      '/favicon.ico',
    ],
  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={""}>
        <AppProvider>
        <GridPatternDashed />
          <Header />
          <main className="relative z-10 pt-14">{children}</main>
          <Footer/>
        </AppProvider>
      </body>
    </html>
  )
}

