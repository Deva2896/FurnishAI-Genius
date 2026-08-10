export type QuotationStatus = 'draft' | 'sent' | 'confirmed';

export interface QuotationLineItem {
  furnitureId: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface CustomerDetails {
  name?: string;
  phone?: string;
  email?: string;
}

/**
 * Mirrors the planned Firestore `quotations` collection document shape.
 */
export interface Quotation {
  id: string;
  customer: CustomerDetails;
  items: QuotationLineItem[];
  totalPrice: number;
  createdDate: string;
  status: QuotationStatus;
}
