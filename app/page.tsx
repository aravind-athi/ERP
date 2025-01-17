import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Manufacturing ERP</h1>
      <p className="text-xl mb-8">Welcome to our multi-tenant ERP system for the manufacturing industry.</p>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </div>
  )
}

