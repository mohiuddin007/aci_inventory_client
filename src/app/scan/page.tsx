"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchProductByBarcode, saveProduct } from "@/lib/api/products";
import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";
import { Product } from "@/types/products";

type FormValues = {
  barcode: string;
};

interface Barcode {
  rawValue: string;
}

export default function ScanPage() {
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const [isScanning, setIsScanning] = useState(false);
  const lastScannedBarcode = useRef<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchProductMutation = useMutation({
    mutationFn: fetchProductByBarcode,
    onSuccess: (data) => {
      setIsScanning(false);
      setProduct({ ...data.product, category: "Uncategorized" });
      saveProductMutation.mutate({
        ...data.product,
        category: "Uncategorized",
      });
    },
    onError: (error) => {
      setIsScanning(false);
      console.error("Fetch Error:", error);
      setError("Product not found or API error.");
    },
  });

  const saveProductMutation = useMutation({
    mutationFn: saveProduct,
    onError: () => setError("Error saving product to database."),
  });

  const handleScan = (barcodes: Barcode[]) => {
    if (barcodes.length > 0) {
      const scannedData = barcodes[0].rawValue;

      if (scannedData === lastScannedBarcode.current) return; // Prevent duplicate scans
      lastScannedBarcode.current = scannedData;

      console.log("Scanned barcode:", scannedData);
      setValue("barcode", scannedData);
      fetchProductMutation.mutate(scannedData);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
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
          {!isScanning && (
            <div className="flex justify-center">
              <Button onClick={() => setIsScanning(true)}>Open Scanner</Button>
            </div>
          )}

          {isScanning && (
            <div className="mt-4">
              <BarcodeScanner
                options={{ formats: ["ean_13", "upc_a", "code_128"] }}
                onCapture={handleScan}
              />
              <Button className="mt-2" onClick={() => setIsScanning(false)}>
                Close Scanner
              </Button>
            </div>
          )}

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
