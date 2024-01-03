"use server"

import { getServerSession } from 'next-auth'
import prisma from './prisma'

/**
 * Fetches user from database based on session email
 * 
 * @returns User object if user is found in database, null otherwise
 */
export async function getUser() {
  const session = await getServerSession()

  if (!session?.user) {
    console.error('User session not found when fetching user')
    return null
  }

  if (!session.user.email) {
    console.error('User email not found when fetching user')
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if (!user) {
    console.error('User not found in database')
    return null
  }

  return user
}

export async function getFiles() {
  const user = await getUser()

  if (!user) {
    console.error('User not found in database when fetching files')
    return null
  }

  const files = await prisma.file.findMany({
    where: {
      userId: user.id
    }
  })
  return files
}

/**
 * Fetches file from database based on id
 * 
 * @param id - id of file to fetch
 * @returns File object if file is found in database, null otherwise
 */
export async function getFile(id: string) {
  const user = await getUser()

  if (!user) {
    console.error('User not found in database when fetching file')
    return null
  }

  const file = await prisma.file.findUnique({
    where: {
      id
    }
  })

  if (!file) {
    console.error('File not found in database when fetching file')
    return null
  }

  if (file.userId !== user.id) {
    console.error('User not authorized to fetch file')
    return null
  }

  return file
}

/**
 * Creates file in database
 * 
 * @param name - name of file to create
 * @param content - content of file to create
 * @returns File object if file is created successfully, null otherwise
 */
export async function createFile(name: string, content: string) {
  const user = await getUser()

  if (!user) {
    console.error('User not found in database when creating file')
    return null
  }

  // Setting size to -1 for now, will be updated later
  const file = await prisma.file.create({
    data: {
      name,
      content,
      userId: user.id,
      size: -1
    }
  })

  return file
}

/**
 * Updates file in database
 *  
 * @param id - id of file to update
 * @param content - content of file to update
 * @returns 
 */
export async function updateFile(id: string, content: string) {
  const user = await getUser()

  if (!user) {
    console.error('User not found in database when updating file')
    return null
  }

  const file = await prisma.file.findUnique({
    where: {
      id
    }
  })

  if (!file) {
    console.error('File not found in database when updating file')
    return null
  }

  if (file.userId !== user.id) {
    console.error('User not authorized to update file')
    return null
  }

  const updatedFile = await prisma.file.update({
    where: {
      id
    },
    data: {
      content
    }
  })

  return updatedFile
}