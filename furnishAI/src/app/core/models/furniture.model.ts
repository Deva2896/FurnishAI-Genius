export type FurnitureCategory =
  | 'Sofa'
  | 'TV Unit'
  | 'Table'
  | 'Chair'
  | 'Storage'
  | 'Lighting';

export type FurnitureAvailability = 'in-stock' | 'made-to-order' | 'out-of-stock';

/**
 * Mirrors the planned Firestore `furniture` collection document shape, so
 * `FurnitureService` can swap its mock array for `collectionData()` later
 * without touching any component.
 */
export interface FurnitureItem {
  id: string;
  name: string;
  category: FurnitureCategory;
  price: number;
  description: string;
  imageUrl: string;
  availability: FurnitureAvailability;
}
