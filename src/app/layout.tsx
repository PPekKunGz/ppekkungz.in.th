import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { Suspense } from 'react'
import Loading from './loading'
import Navbar from './(root)/_components/layouts/Navbar'
import Footer from './(root)/_components/layouts/Footer'

export const metadata: Metadata = {
  title: "It's me @PPekKunGzDev",
  description: 'รับทำเว็บไซต์ ขนาดเล็ก รับทำเว็บไซต์รองรับมือถือ และ คอม Responsive Website, @PPekKunGzDev',
  keywords: 'PPekKunGzDev,PPekKunGz_Dev,เพ็กคุง,รับทำเว็บไซต์,รับทำเว็บไซต์ราคาถูก,รับทำเว็บไซต์อื่นๆ,เว็บไซต์PPekKunGz,เพ็กคุงทำเว็บ',
  icons: 'https://dms-api-gateway.mckimkung.in.th/public/dimension/image/img/bg.png',

  metadataBase: new URL('https://ppekkungz.in.th'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'th-TH': '/th-TH',
    },
  },
  openGraph: {
    images: 'https://dms-api-gateway.mckimkung.in.th/public/dimension/image/img/bg.png',
    url: 'https://ppekkungz.in.th',
    type: 'article', // or website
    locale: 'th_TH',
    title: "It's me @PPekKunGzDev",
    description: 'รับทำเว็บไซต์ ขนาดเล็ก รับทำเว็บไซต์รองรับมือถือ และ คอม Responsive Website, @PPekKunGzDev',
  },
  twitter: {
    images: 'https://dms-api-gateway.mckimkung.in.th/public/dimension/image/img/bg.png',
    title: "It's me @PPekKunGzDev",
  description: 'รับทำเว็บไซต์ ขนาดเล็ก รับทำเว็บไซต์รองรับมือถือ และ คอม Responsive Website, @PPekKunGzDev',
    card: 'summary_large_image',
    site: '@PPekKunGzDev',
    creator: '@PPekKunGzDev',
  },

}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className="">
        <Suspense fallback={<Loading/>}>
            <ThemeProvider
              enableSystem
              attribute='class'
              defaultTheme='system'
              disableTransitionOnChange
              themes={['light', 'dark']}
            >
              <Navbar />
              {children}
              <Footer />
            </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}