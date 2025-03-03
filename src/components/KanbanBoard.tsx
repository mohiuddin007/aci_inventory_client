"use client";

import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import CategoryColumn from "./CategoryColumn";

const initialData = {
  categories: ["Uncategorized", "Electronics", "Groceries"],
  products: [
    { id: "1", name: "Laptop", category: "Uncategorized" },
    { id: "2", name: "Phone", category: "Electronics" },
    { id: "3", name: "Banana", category: "Groceries" },
  ],
};

export default function KanbanBoard() {
  const [categories, setCategories] = useState(initialData.categories);
  const [products, setProducts] = useState(initialData.products);

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeProduct = products.find((p) => p.id === active.id);
    if (!activeProduct) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === active.id ? { ...p, category: over.id } : p
      )
    );
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-auto p-4">
        <SortableContext items={categories}>
          {categories.map((category) => (
            <CategoryColumn
              key={category}
              category={category}
              products={products.filter((p) => p.category === category)}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
