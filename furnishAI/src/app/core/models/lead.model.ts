export type PreferredContactTime = 'morning' | 'afternoon' | 'evening';
export type LeadStatus = 'new' | 'contacted' | 'closed';

/**
 * Mirrors the planned Firestore `leads` collection document shape. Created
 * when a customer submits the "Contact Store" enquiry form.
 */
export interface Lead {
  id: string;
  storeId: string;
  name: string;
  phone: string;
  preferredContactTime: PreferredContactTime;
  message?: string;
  quotationId?: string;
  createdDate: string;
  status: LeadStatus;
}

export type LeadRequest = Pick<Lead, 'storeId' | 'name' | 'phone' | 'preferredContactTime' | 'message' | 'quotationId'>;
