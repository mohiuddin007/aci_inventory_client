"use client";

import { useEffect, useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import CategoryColumn from "./CategoryColumn";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api/category";
import { fetchAllProducts, updateProductCategory } from "@/lib/api/products";
import { Category, Product } from "@/types/products";
import { API_ENDPOINTS } from "@/lib/api_endpoints";

export default function KanbanBoard() {
  const queryClient = useQueryClient();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoryError,
  } = useQuery({
    queryKey: [API_ENDPOINTS.CATEGORIES],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, 
  });

  // Fetch products once categories are available
  const {
    data: products = [],
    isLoading: isLoadingProducts,
    error: productError,
  } = useQuery({
    queryKey: [API_ENDPOINTS.PRODUCTS],
    queryFn: () => fetchAllProducts(),
    enabled: isClient && categories.length > 0, 
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({
      barcode,
      newCategory,
    }: {
      barcode: string;
      newCategory: number | string;
    }) => updateProductCategory(barcode, newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.PRODUCTS] });
    },
  });

  if (!isClient || isLoadingCategories || isLoadingProducts)
    return <p>Loading...</p>;
  if (categoryError || productError) return <p>Error loading data</p>;

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeProduct = products.find(
      (p: Product) => p.barcode === active.id
    );
    if (!activeProduct) return;

    const newCategory = over.id;
    if (activeProduct.category !== newCategory) {
      updateCategoryMutation.mutate({
        barcode: activeProduct.barcode,
        newCategory,
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <div className="w-full overflow-x-auto">
        <div className="flex gap-4 p-4 border rounded-xl min-w-max">
          <SortableContext items={categories.map((c: Category) => c.name)}>
            {categories.map((category: Category) => (
              <CategoryColumn
                key={category.id}
                category={category.name}
                products={products.filter(
                  (p: Product) => p.category === category.name
                )}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}
