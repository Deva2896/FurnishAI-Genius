export type QuotationStatus = 'draft' | 'sent' | 'confirmed';

export interface QuotationLineItem {
  furnitureId: string;
  name: string;
  category: string;
  price: number;
  /** Percentage off the listed price (0-100), when a discount applies. */
  discount: number;
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
  quotationNumber: string;
  storeId: string;
  customer: CustomerDetails;
  items: QuotationLineItem[];
  subtotal: number;
  discountTotal: number;
  totalPrice: number;
  estimatedDelivery: string;
  createdDate: string;
  status: QuotationStatus;
}
