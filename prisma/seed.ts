import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create a tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Demo Manufacturing Co.',
    },
  })

  // Create an admin user
  const hashedPassword = await bcrypt.hash('adminpassword', 10)
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@demo.com',
      password: hashedPassword,
      role: 'admin',
      tenantId: tenant.id,
    },
  })

  // Create some inventory items
  await prisma.inventoryItem.createMany({
    data: [
      { name: 'Widget A', quantity: 100, category: 'Electronics', tenantId: tenant.id },
      { name: 'Gadget B', quantity: 50, category: 'Mechanics', tenantId: tenant.id },
      { name: 'Tool C', quantity: 200, category: 'Hardware', tenantId: tenant.id },
    ],
  })

  console.log('Database has been seeded.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

