'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    router.push('/login')
    return null
  }

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <p className="mb-4">Welcome, {session.user?.name}</p>
        <p className="mb-4">Tenant: {session.user?.tenantName}</p>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="text-blue-500 hover:underline">
              Overview
            </Link>
          </li>
          <li>
            <Link href="/dashboard/inventory" className="text-blue-500 hover:underline">
              Inventory
            </Link>
          </li>
          <li>
            <Link href="/dashboard/users" className="text-blue-500 hover:underline">
              User Management
            </Link>
          </li>
        </ul>
        <Button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="mt-6 bg-red-500 hover:bg-red-600"
        >
          Logout
        </Button>
      </nav>
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  )
}

