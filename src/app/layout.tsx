import React from 'react'
import type { Metadata } from 'next'
import { Roboto, Roboto_Slab, Roboto_Mono } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/navigation/NavBar'
import Providers from '@/components/Providers'

const roboto =
  Roboto({
    display: 'swap',
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin'],
    variable: '--font-roboto-regular'
  })
const robotoSlab =
  Roboto_Slab({
    display: 'swap',
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin'],
    variable: '--font-roboto-slab'
  })
const robotoMono =
  Roboto_Mono({
    display: 'swap',
    weight: ['100', '300', '400', '500', '700'],
    subsets: ['latin'],
    variable: '--font-roboto-mono'
  })

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
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable} ${robotoSlab.variable}`}>
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
