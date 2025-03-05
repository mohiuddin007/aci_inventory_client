"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/api_endpoints";
import { saveCategory } from "@/lib/api/category";
import { toast } from "sonner";

export default function CategoryForm() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: saveCategory,
    onSuccess: () => {
      toast("Successfully created.");
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.CATEGORIES] });
      reset();
      setOpen(false);
    },
  });

  const onSubmit = (data: { name: string }) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Category</Button>
      </DialogTrigger>
      <DialogContent className="p-6">
        <h2 className="text-lg font-bold mb-4">Add Category</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="category" className="mb-3">
              Category Name
            </Label>
            <Input
              placeholder="Write category name"
              id="category"
              {...register("name", { required: "Category name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
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
            <Button type="submit">Add Category</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
