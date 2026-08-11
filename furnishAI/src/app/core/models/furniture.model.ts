/**
 * UI-facing furniture/product view-model. Sourced from
 * `shops/{storeId}/products/{id}` documents (see `Product` for the raw
 * Firestore shape) — `FurnitureService` maps every field here.
 *
 * `category` and `availability` are plain strings, not a fixed enum: this
 * is a multi-tenant app, so each shop defines its own category/availability
 * text in Firestore rather than picking from a shared controlled vocabulary.
 */
export interface FurnitureItem {
  id: string;
  storeId: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  /** Final, payable price — what the customer is actually charged. */
  price: number;
  /** Pre-discount listed price, when the shop set one higher than `price`. */
  originalPrice?: number;
  /** Percentage off `originalPrice`, derived for display (badge/strikethrough). */
  discount?: number;
  imageUrl: string;
  availability: string;
  tags: string[];
  featured: boolean;
}
