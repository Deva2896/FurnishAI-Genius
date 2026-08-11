import { Injectable } from '@angular/core';
import { QueryDocumentSnapshot, collection, getDocs, query, where } from 'firebase/firestore';
import { Observable, catchError, from, map, throwError } from 'rxjs';
import { firestore } from '../firebase/firebase';
import { FurnitureItem } from '../models/furniture.model';
import { Product } from '../models/product.model';

const SHOPS_COLLECTION = 'shops';
const PRODUCTS_SUBCOLLECTION = 'products';

/**
 * Known furniture categories a shop is likely to use, each with the
 * phrasings a customer might type in the room-scanner prompt. Firestore has
 * no full-text search, so free text is normalized down to one of these
 * canonical `category` values before matching — see the class doc for why.
 */
const CATEGORY_ALIASES: ReadonlyArray<{ canonical: string; keywords: readonly string[] }> = [
  { canonical: 'sofa', keywords: ['sofa', 'couch', 'l-shape', 'l shape', 'sectional', 'recliner'] },
  { canonical: 'tv unit', keywords: ['tv unit', 'tv console', 'television unit', 'tv stand', 'tv'] },
  { canonical: 'center table', keywords: ['center table', 'centre table', 'coffee table'] },
  { canonical: 'chair', keywords: ['chair', 'armchair', 'accent chair'] },
  { canonical: 'storage', keywords: ['storage', 'bookshelf', 'shelf', 'wardrobe', 'cabinet'] },
  { canonical: 'lighting', keywords: ['lighting', 'lamp', 'light'] }
];

/**
 * Reads furniture from Firestore at `shops/{storeId}/products`, scoped to
 * one shop's subcollection so tenants can never see each other's catalog.
 *
 * Firestore has no partial/full-text search, and shop owners hand-enter
 * `category`/`tags` in the console — casing is inconsistent in practice
 * (`"Sofa"` vs `"sofa"`), and Firestore string equality is case-sensitive.
 * So only `show == true` is filtered server-side (a single equality filter,
 * no index needed); category/tag matching against the normalized search
 * term happens client-side, case-insensitively, against both fields. Free
 * text like "L-shaped sofa for my hall" is normalized to a canonical
 * category via `CATEGORY_ALIASES` first. A shop with a handful to a few
 * hundred products makes fetching-then-filtering perfectly reasonable; it's
 * the standard workaround for search Firestore can't do natively.
 */
@Injectable({ providedIn: 'root' })
export class FurnitureService {
  searchCatalog(storeId: string, searchText: string): Observable<FurnitureItem[]> {
    if (!storeId) {
      return throwError(() => new Error('A store id is required to search the catalog.'));
    }

    const category = this.resolveCategory(searchText);
    const productsRef = collection(firestore, SHOPS_COLLECTION, storeId, PRODUCTS_SUBCOLLECTION);
    const visibleProductsQuery = query(productsRef, where('show', '==', true));

    return from(getDocs(visibleProductsQuery)).pipe(
      map((snapshot) => {
        const matches = snapshot.docs
          .map((docSnapshot) => this.mapProductToFurnitureItem(storeId, docSnapshot))
          .filter((item) => this.matchesCategory(item, category));

        console.info(
          `[FurnitureService] "${searchText}" -> category "${category}" matched ${matches.length}/${snapshot.size} visible product(s) in shops/${storeId}/products.`
        );
        return matches;
      }),
      catchError((error) => {
        console.error(`[FurnitureService] Failed to query shops/${storeId}/products:`, error);
        return throwError(() => error);
      })
    );
  }

  private resolveCategory(searchText: string): string {
    const normalized = searchText.toLowerCase().trim();
    const alias = CATEGORY_ALIASES.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)));
    return alias?.canonical ?? normalized;
  }

  private matchesCategory(item: FurnitureItem, category: string): boolean {
    const haystack = [item.category, ...item.tags].map((value) => value.toLowerCase().trim());
    return haystack.includes(category);
  }

  private normalizeTags(rawTags: Product['tags']): string[] {
    if (!rawTags) {
      return [];
    }
    return Array.isArray(rawTags) ? rawTags : [rawTags];
  }

  private mapProductToFurnitureItem(storeId: string, docSnapshot: QueryDocumentSnapshot): FurnitureItem {
    const product = docSnapshot.data() as Product;
    const hasDiscount = !!product.originalPrice && product.originalPrice > product.price;

    return {
      id: docSnapshot.id,
      storeId,
      name: product.name,
      sku: docSnapshot.id,
      category: product.category,
      description: '',
      price: product.price,
      originalPrice: product.originalPrice,
      discount: hasDiscount ? Math.round((1 - product.price / product.originalPrice!) * 100) : undefined,
      imageUrl: product.imageUrl,
      availability: product.availability,
      tags: this.normalizeTags(product.tags),
      featured: false
    };
  }
}
