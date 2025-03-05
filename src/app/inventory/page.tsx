"use client";

import CategoryForm from "@/components/CategoryForm";
import KanbanBoard from "@/components/KanbanBoard";
import ProductForm from "@/components/ProductForm";

export default function InventoryPage() {
  return (
    <div className="p-8 w-full">
      <h1 className="text-xl font-bold mb-4 ">Inventory Kanban Board</h1>
      <div className="flex justify-start space-x-4 mb-5">
        <CategoryForm />
        <ProductForm />
      </div>
      <div className="bg-gray-100 w-[100%]">
        <KanbanBoard />
      </div>
    </div>
  );
}
