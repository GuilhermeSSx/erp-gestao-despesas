import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/header'
import NextAuthSessionProvider from '@/providers/sessionProvider'
import { CrudStore } from './contexts/crudContext'
import { Analytics } from '@vercel/analytics/react';

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
          <CrudStore>
            <Header />
            {children}
          </CrudStore>
        </NextAuthSessionProvider>
        <Analytics />
      </body>
    </html>
  )
}