"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saveProduct } from "@/lib/api/products";
import { fetchCategories } from "@/lib/api/category";
import { Category, Product } from "@/types/products";
import { toast } from "sonner";

export default function ProductForm() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: { barcode: generateBarcode() },
  });
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const mutation = useMutation({
    mutationFn: saveProduct,
    onSuccess: () => {
      toast.success("Successfully saved product");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset({ barcode: generateBarcode() });
      setOpen(false);
    },
  });

  const onSubmit = (data: Product) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="p-6">
        <h2 className="text-lg font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2">
              Product Name
            </Label>
            <Input id="name" {...register("name")} placeholder="Optional" />
          </div>
          <div>
            <Label htmlFor="material" className="mb-2">
              Material
            </Label>
            <Input
              id="material"
              type="number"
              {...register("material", { required: "Material ID is required" })}
            />
            {errors.material && (
              <p className="text-red-500 text-sm">{errors.material.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="barcode" className="mb-2">
              Barcode
            </Label>
            <Input
              id="barcode"
              {...register("barcode", { required: "Barcode is required" })}
            />
            {errors.barcode && (
              <p className="text-red-500 text-sm">{errors.barcode.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="description" className="mb-3">
              Description
            </Label>
            <Input
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="category" className="mb-2">
              Category
            </Label>
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Generate random barcode (for example)
function generateBarcode() {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
}
