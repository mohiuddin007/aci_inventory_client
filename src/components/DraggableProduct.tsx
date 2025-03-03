"use client";

import { useDraggable } from "@dnd-kit/core";

export default function DraggableProduct({ product }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: product.id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : "" }}
      className="p-2 bg-white rounded shadow cursor-pointer"
    >
      {product.name}
    </div>
  );
}
