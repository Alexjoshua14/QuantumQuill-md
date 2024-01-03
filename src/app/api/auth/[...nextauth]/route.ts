
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import prisma from '@/lib/prisma/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Adapter } from 'next-auth/adapters'

const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }