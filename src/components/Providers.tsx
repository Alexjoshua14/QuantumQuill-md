'use client'

import ReduxProvider from '@/redux/ReduxProvider'
import { FC } from 'react'
import OAuthProvider from './oauth/OAuthProvider'
import { ThemeProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

interface ProvidersProps extends ThemeProviderProps {
  children: React.ReactNode

}

const Providers: FC<ProvidersProps> = ({ children, ...props }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <OAuthProvider>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </OAuthProvider>
    </ThemeProvider>
  )
}

export default Providers