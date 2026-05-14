export type ProductStatus = "bought" | "liked" | "disliked" | "not_seen";

export interface Product {
  title: string;
  status: ProductStatus;
}
