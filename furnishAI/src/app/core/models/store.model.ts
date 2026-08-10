import { Offer } from './offer.model';

export interface StoreContact {
  phone: string;
  email: string;
}

/**
 * Mirrors the planned Firestore `stores` collection document shape.
 */
export interface Store {
  id: string;
  name: string;
  address: string;
  contact: StoreContact;
  offers: Offer[];
}
