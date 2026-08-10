import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '../models/store.model';

/**
 * Backed by an in-memory mock store profile today. Swap `getCurrentStore()`
 * for a `docData(doc(firestore, 'stores', storeId))` read once Firestore is
 * provisioned — consumers only depend on the `Observable<Store>` contract.
 */
@Injectable({ providedIn: 'root' })
export class StoreService {
  private readonly store: Store = {
    id: 'grand-furniture-plaza',
    name: 'Grand Furniture Plaza',
    address: 'Shop 12, FC Road, Shivajinagar, Pune, Maharashtra 411005',
    contact: {
      phone: '+91 98765 43210',
      email: 'hello@grandfurnitureplaza.in'
    },
    offers: [
      { id: 'offer-hdfc', titleKey: 'offers.hdfc.title', descriptionKey: 'offers.hdfc.desc', icon: '💳' },
      { id: 'offer-delivery', titleKey: 'offers.delivery.title', descriptionKey: 'offers.delivery.desc', icon: '🚚' },
      { id: 'offer-today', titleKey: 'offers.today.title', descriptionKey: 'offers.today.desc', icon: '🎁' }
    ]
  };

  getCurrentStore(): Observable<Store> {
    return of(this.store);
  }
}
