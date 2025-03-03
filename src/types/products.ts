export interface Product {
    id: string;
    name: string;
    barcode: string;
    category: string;
    price: number; 
    createdAt: string;
  }
  
  export interface Category {
    id: string;
    name: string;
  }
  
  export interface BarcodeScanResponse {
    barcode: string;
    name: string;
    price?: number;
    success: boolean;
  }
  