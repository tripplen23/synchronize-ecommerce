import { ProductType } from "./productType";

export interface CartItemType {
  id?: number;
  product: ProductType;
  quantity: number;
}
