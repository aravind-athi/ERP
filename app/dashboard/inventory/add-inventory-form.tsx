'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface AddInventoryItemData {
  name: string
  quantity: number
  category: string
}

export default function AddInventoryForm({ addItem }: { addItem: (data: AddInventoryItemData) => Promise<any> }) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await addItem({ name, quantity: parseInt(quantity), category })
      setName('')
      setQuantity('')
      setCategory('')
      // You might want to add some feedback here, like a success message
    } catch (error) {
      console.error('Failed to add item:', error)
      // You might want to add some error feedback here
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Inventory Item</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Add Item</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

