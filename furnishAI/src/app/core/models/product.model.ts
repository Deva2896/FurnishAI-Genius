/**
 * Raw Firestore document shape at `shops/{shopId}/products/{productId}`.
 * Kept separate from the UI-facing `FurnitureItem` model — `FurnitureService`
 * maps `Product` -> `FurnitureItem` at the service boundary. `category` and
 * `availability` are shop-defined free text (this is a multi-tenant app, so
 * they can't be a fixed enum) rather than a controlled vocabulary.
 */
export interface Product {
  name: string;
  category: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  availability: string;
  /** Shop owners enter this by hand in the Firebase console — seen as both a single string and a real array in practice. */
  tags?: string | string[];
  show: boolean;
}
