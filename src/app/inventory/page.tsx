"use client";

import KanbanBoard from "@/components/KanbanBoard";

export default function InventoryPage() {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4 ml-4">Inventory Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}