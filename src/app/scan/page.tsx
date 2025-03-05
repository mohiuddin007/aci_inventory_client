"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchProductByBarcode, saveProduct } from "@/lib/api/products";
import BarcodeReader from "react-barcode-reader";
import { Product } from "@/types/products";

type FormValues = {
  barcode: string;
};

export default function ScanPage() {
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchProductMutation = useMutation({
    mutationFn: fetchProductByBarcode,
    onSuccess: (data) => {
      setProduct({ ...data.product, category: "Uncategorized" });
      saveProductMutation.mutate({
        ...data.product,
        category: "Uncategorized",
      });
    },
    onError: (error) => {
      console.error("Fetch Error:", error);
      setError("Product not found or API error.");
    },
  });

  const saveProductMutation = useMutation({
    mutationFn: saveProduct,
    onError: () => setError("Error saving product to database."),
  });

  const handleScan = (scannedData: string) => {
    if (scannedData) {
      console.log("Scanned barcode:", scannedData);
      setValue("barcode", scannedData);
      fetchProductMutation.mutate(scannedData);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data: { barcode: string }) => {
    if (data.barcode) {
      fetchProductMutation.mutate(data.barcode);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>
            Scan Barcode{" "}
            <span className="text-sm">
              (Retrieve details from an external API)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BarcodeReader
            onScan={handleScan}
            onError={() => setError("Scanning error")}
          />
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <Input
              type="text"
              placeholder="Enter barcode manually"
              {...register("barcode")}
            />
            <Button type="submit" className="mt-2">
              Find Product
            </Button>
          </form>

          {fetchProductMutation.isPending && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {product && (
            <div className="mt-4 p-4 border rounded">
              <h3 className="text-lg font-bold">Barcode: {product?.barcode}</h3>
              <p>Description: {product?.description}</p>
              <p>Category: Uncategorized</p>
              <Button
                onClick={() => router.push("/inventory")}
                className="mt-2"
              >
                Go to Inventory
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
