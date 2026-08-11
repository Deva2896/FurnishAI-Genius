import { Injectable } from '@angular/core';
import { doc, getDoc } from 'firebase/firestore';
import { Observable, catchError, from, map, of } from 'rxjs';
import { firestore } from '../firebase/firebase';
import { Shop } from '../models/shop.model';
import { Store } from '../models/store.model';
import { environment } from '../../../environments/environment';

const SHOPS_COLLECTION = 'shops';

/**
 * Reads the current shop from Firestore at `shops/{shopId}`, where
 * `shopId` is the `:storeSlug` route param — never hardcoded. Maps the raw
 * `Shop` document onto the UI-facing `Store` model; fields Firestore
 * doesn't carry yet (contact, offers, delivery estimate) get sensible
 * defaults rather than being left to break bindings downstream.
 */
@Injectable({ providedIn: 'root' })
export class StoreService {
  getStoreBySlug(slug: string): Observable<Store | undefined> {
    const shopRef = doc(firestore, SHOPS_COLLECTION, slug);

    return from(getDoc(shopRef)).pipe(
      map((snapshot) => {
        if (!snapshot.exists()) {
          console.warn(`[StoreService] No document at shops/${slug} — check the shop's document ID matches the URL slug exactly.`);
          return undefined;
        }
        return this.mapShopToStore(slug, snapshot.data() as Shop);
      }),
      catchError((error) => {
        console.error(`[StoreService] Failed to read shops/${slug}:`, error);
        return of(undefined);
      })
    );
  }

  private mapShopToStore(shopId: string, shop: Shop): Store {
    return {
      id: shopId,
      slug: shopId,
      name: shop.shopName,
      logoUrl: shop.logoUrl,
      address: shop.city ?? '',
      contact: { phone: environment.whatsappStorePhone, email: '' },
      estimatedDelivery: '5–7 business days',
      offers: []
    };
  }
}
