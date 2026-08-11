import { Offer } from './offer.model';

export interface StoreContact {
  phone: string;
  email: string;
}

/**
 * Mirrors the planned Firestore `stores` collection document shape.
 * `slug` is the public identifier used in the customer-facing route
 * (`/store/:storeSlug`) and is looked up via `StoreService.getStoreBySlug()`.
 */
export interface Store {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  address: string;
  contact: StoreContact;
  estimatedDelivery: string;
  offers: Offer[];
}
