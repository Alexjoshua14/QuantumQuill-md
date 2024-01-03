'use client'

import ReduxProvider from '@/redux/ReduxProvider'
import { FC } from 'react'
import OAuthProvider from './oauth/OAuthProvider'

interface ProvidersProps {
  children: React.ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <OAuthProvider>
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </OAuthProvider>
  )
}

export default Providers