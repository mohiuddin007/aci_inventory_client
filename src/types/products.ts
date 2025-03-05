export interface Product {
  id?: string;
  name?: string;
  material: number;
  barcode: string;
  description: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface BarcodeScanResponse {
  status: boolean;
  product: Partial<Product>;
}


export interface ProductCount {
  _id: string;
  count: number;
}