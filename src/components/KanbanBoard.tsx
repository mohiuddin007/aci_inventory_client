"use client";

import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import CategoryColumn from "./CategoryColumn";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api/category";
import { fetchAllProducts, updateProductCategory } from "@/lib/api/products";
import { Category, Product } from "@/types/products";

export default function KanbanBoard() {
  const queryClient = useQueryClient();

  // Fetch products
  const { data: products = [], isLoading: isLoadingProducts, error: productError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  // Fetch categories
  const { data: categories = [], isLoading: isLoadingCategories, error: categoryError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Mutation for updating product category
  const updateCategoryMutation = useMutation({
    mutationFn: ({ barcode, newCategory }: { barcode: string; newCategory: string }) =>
      updateProductCategory(barcode, newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Refetch products after update
    },
  });

  if (isLoadingProducts || isLoadingCategories) return <p>Loading...</p>;
  if (productError || categoryError) return <p>Error loading data</p>;

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeProduct = products.find((p: Product) => p.barcode === active.id);
    if (!activeProduct) return;

    const newCategory = over.id;
    if (activeProduct.category !== newCategory) {
      updateCategoryMutation.mutate({ barcode: activeProduct.barcode, newCategory });
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-auto p-4">
        <SortableContext items={categories.map((c: Category) => c.name)}>
          {categories.map((category: Category) => (
            <CategoryColumn
              key={category.id}
              category={category.name}
              products={products.filter((p: Product) => p.category === category.name)}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
