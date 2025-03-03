"use client";

import { useDroppable } from "@dnd-kit/core";
import DraggableProduct from "./DraggableProduct";

export default function CategoryColumn({ category, products }) {
  const { setNodeRef } = useDroppable({ id: category });

  return (
    <div ref={setNodeRef} className="w-64 min-h-[300px] p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="font-bold text-lg mb-2">{category}</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <DraggableProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
