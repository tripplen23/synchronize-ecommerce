export interface ProductType {
  id: number;
  title: string;
  price: number;
  description?: string;
  category: string;
  image: string;
  rating?: Rating;
}

export type ModifiedProductType = Omit<ProductType, "id">;

export interface Rating {
  rate: number;
  count: number;
}
