import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user?.tenantId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const lowStockItems = await prisma.inventoryItem.findMany({
      where: {
        tenantId: session.user.tenantId,
        quantity: { lt: 10 } // Example: items with less than 10 in stock
      },
      select: {
        id: true,
        name: true,
        quantity: true,
        category: true
      }
    })

    return NextResponse.json(lowStockItems)
  } catch (error) {
    console.error('Failed to fetch low stock items:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

