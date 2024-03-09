
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cn } from "../lib/utils"
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { ThemeProvider } from "../components/theme-provider";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: '@PPekKunGzDev - Developer',
  description: 'รับทำเว็บไซต์ ขนาดเล็ก รับทำเว็บไซต์รองรับมือถือ และ คอม Responsive Website, @PPekKunGzDev',
  keywords: 'PPekKunGzDev,PPekKunGz_Dev,เพ็กคุง,รับทำเว็บไซต์,รับทำเว็บไซต์ราคาถูก,รับทำเว็บไซต์อื่นๆ,เว็บไซต์PPekKunGz,เพ็กคุงทำเว็บ',
  icons: '/ppekkungz.svg',

  metadataBase: new URL('https://ppekkungz.in.th'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'th-TH': '/th-TH',
    },
  },
  openGraph: {
    images: '/ppekkungz.svg',
    url: 'https://ppekkungz.in.th',
    type: 'article', // or website
    locale: 'th_TH',
    description: 'รับทำเว็บไซต์ ขนาดเล็ก รับทำเว็บไซต์รองรับมือถือ และ คอม Responsive Website, @PPekKunGzDev',
  },
  twitter: {
    images: '/ppekkungz.svg',
    title: '@PPekKunGzDev (developer) - รับทำเว็บไซต์',
    card: 'summary_large_image',
    site: '@PPekKunGzDev',
    creator: '@PPekKunGzDev',
    description: 'รับทำเว็บไซต์ ขนาดเล็ก รับทำเว็บไซต์รองรับมือถือ และ คอม Responsive Website, @PPekKunGzDev',
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(poppins.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader />
          <Navbar />
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
