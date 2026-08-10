import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FurnitureItem } from '../models/furniture.model';

/**
 * Backed by an in-memory mock catalog today. Swap the body of `getCatalog()`
 * for `collectionData(collection(firestore, 'furniture'))` once Firestore is
 * provisioned — every consumer already depends on the `Observable<FurnitureItem[]>`
 * contract, not on how the data is sourced.
 */
@Injectable({ providedIn: 'root' })
export class FurnitureService {
  private readonly catalog: FurnitureItem[] = [
    {
      id: 'sofa-l-shape-grey',
      name: 'Premium L-Shape Grey Sofa',
      category: 'Sofa',
      price: 34999,
      description: 'Plush corner sofa with a durable weave fabric — perfect for family lounging.',
      imageUrl: 'https://placehold.co/400x400/0F766E/FFFCF5?text=L-Shape+Sofa',
      availability: 'in-stock'
    },
    {
      id: 'tv-unit-wooden',
      name: 'Modern Wooden TV Unit',
      category: 'TV Unit',
      price: 14999,
      description: 'Sleek engineered-wood console with hidden cable management.',
      imageUrl: 'https://placehold.co/400x400/14B8A6/0F172A?text=TV+Unit',
      availability: 'in-stock'
    },
    {
      id: 'center-table-luxury',
      name: 'Luxury Center Table',
      category: 'Table',
      price: 7999,
      description: 'Tempered-glass top on a brushed metal frame for a refined centerpiece.',
      imageUrl: 'https://placehold.co/400x400/0F766E/FFFCF5?text=Center+Table',
      availability: 'in-stock'
    },
    {
      id: 'accent-chair-designer',
      name: 'Designer Accent Chair',
      category: 'Chair',
      price: 8999,
      description: 'Statement bouclé armchair that pairs with any living-room palette.',
      imageUrl: 'https://placehold.co/400x400/14B8A6/0F172A?text=Accent+Chair',
      availability: 'in-stock'
    },
    {
      id: 'bookshelf-modern',
      name: 'Modern Bookshelf',
      category: 'Storage',
      price: 12999,
      description: 'Open-cell shelving unit for books, decor, and display pieces.',
      imageUrl: 'https://placehold.co/400x400/0F766E/FFFCF5?text=Bookshelf',
      availability: 'made-to-order'
    },
    {
      id: 'floor-lamp-premium',
      name: 'Premium Floor Lamp',
      category: 'Lighting',
      price: 4999,
      description: 'Warm ambient lighting on a slim brushed-brass stand.',
      imageUrl: 'https://placehold.co/400x400/14B8A6/0F172A?text=Floor+Lamp',
      availability: 'in-stock'
    }
  ];

  getCatalog(): Observable<FurnitureItem[]> {
    return of(this.catalog).pipe(delay(150));
  }

  getById(id: string): FurnitureItem | undefined {
    return this.catalog.find((item) => item.id === id);
  }
}
