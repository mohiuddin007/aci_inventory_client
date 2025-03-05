"use client";

import CategoryForm from "@/components/CategoryForm";
import KanbanBoard from "@/components/KanbanBoard";
import ProductForm from "@/components/ProductForm";

export default function InventoryPage() {
  return (
    <div className="p-8">
      <div className="flex justify-end space-x-4">
        <CategoryForm />
        <ProductForm />
      </div>
      <h1 className="text-xl font-bold mb-4 ml-4">Inventory Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}
