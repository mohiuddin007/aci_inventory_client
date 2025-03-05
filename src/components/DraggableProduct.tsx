"use client";

import { Product } from "@/types/products";
import { useDraggable } from "@dnd-kit/core";

export default function DraggableProduct({ product }: { product: Product }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: product.barcode,
  });
  
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : "",
      }}
      className="p-2 bg-white rounded shadow cursor-pointer"
    >
      <p className="text-sm">Barcode: {product.barcode}</p>
      <p className="text-sm">{product.name}</p>
      <p className="text-sm">Description: {product.description}</p>
    </div>
  );
}
