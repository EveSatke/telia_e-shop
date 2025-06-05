export interface Product {
  id: string;
  type: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  colorOptions: Array<{ color: string; hex: string }>;
  stockAvailability: number;
  popularity: number;
  description: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
}
