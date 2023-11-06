import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/header'
import NextAuthSessionProvider from '@/providers/sessionProvider'
// import { Analytics } from '@vercel/analytics/react';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gestão - JPNR',
  description: 'Gestão JPNR Energia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <Header />
          {children}
          <ToastContainer />
        </NextAuthSessionProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}