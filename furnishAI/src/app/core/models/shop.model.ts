/**
 * Raw Firestore document shape at `shops/{shopId}`. Kept separate from the
 * UI-facing `Store` model — `StoreService` maps `Shop` -> `Store` at the
 * service boundary so the rest of the app (header, quotation, offers)
 * doesn't need to know about the Firestore field names.
 */
export interface Shop {
  shopName: string;
  city?: string;
  logoUrl?: string;
  status?: string;
}
