import { getInventoryItems, addInventoryItem } from '@/app/actions/inventory'
import InventoryList from './inventory-list'
import AddInventoryForm from './add-inventory-form'
import { Suspense } from 'react'

export default async function Inventory() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inventory Management</h1>
      <AddInventoryForm addItem={addInventoryItem} />
      <Suspense fallback={<div>Loading inventory...</div>}>
        <InventoryListWrapper />
      </Suspense>
    </div>
  )
}

async function InventoryListWrapper() {
  const inventoryItems = await getInventoryItems()
  return <InventoryList items={inventoryItems} />
}

