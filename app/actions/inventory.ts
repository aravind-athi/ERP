'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function getInventoryItems() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.tenantId) {
    throw new Error('Unauthorized')
  }

  try {
    const items = await prisma.inventoryItem.findMany({
      where: {
        tenantId: session.user.tenantId
      }
    })
    return items
  } catch (error) {
    console.error('Failed to fetch inventory items:', error)
    throw new Error('Failed to fetch inventory items')
  }
}

export async function addInventoryItem(data: { name: string; quantity: number; category: string }) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.tenantId) {
    throw new Error('Unauthorized')
  }

  try {
    const newItem = await prisma.inventoryItem.create({
      data: {
        ...data,
        tenantId: session.user.tenantId,
      },
    })
    revalidatePath('/dashboard/inventory')
    return newItem
  } catch (error) {
    console.error('Failed to add inventory item:', error)
    throw new Error('Failed to add inventory item')
  }
}

