import React from 'react'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/navigation/NavBar'
import ReduxProvider from '@/redux/ReduxProvider'

const roboto = Roboto({ display: 'swap', weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuantumQuill',
  description: 'AI Assisted Markdown Editor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ReduxProvider>
          <NavBar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
