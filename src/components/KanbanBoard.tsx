"use client";

import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import CategoryColumn from "./CategoryColumn";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api/category";
import { Category } from "@/types/products";

const initialData = {
  categories: ["Uncategorized", "Electronics", "Groceries"],
  products: [
    { id: "1", name: "Laptop", category: "Uncategorized" },
    { id: "2", name: "Phone", category: "Electronics" },
    { id: "3", name: "Banana", category: "Groceries" },
  ],
};

export default function KanbanBoard() {
    const { data: categories, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories</p>;
  // const [categories, setCategories] = useState(initialData.categories);
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
          {categories.map((category: Category) => (
            <CategoryColumn
              key={category?.id}
              category={category?.name}
              products={products.filter((p) => p.category === category?.name)}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
