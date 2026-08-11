import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FurnitureItem } from '../models/furniture.model';
import { CustomerDetails, Quotation, QuotationLineItem } from '../models/quotation.model';
import { Store } from '../models/store.model';
import { LanguageService } from '../../shared/services/language.service';

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

let nextQuotationSequence = 1024;

/**
 * Builds and (eventually) persists quotations. `saveQuotation()` currently
 * resolves locally; wire it to `addDoc(collection(firestore, 'quotations'), ...)`
 * once Firestore is provisioned — the `Quotation` shape already mirrors the
 * planned document schema.
 */
@Injectable({ providedIn: 'root' })
export class QuotationService {
  private readonly lang = inject(LanguageService);

  formatCurrency(amount: number): string {
    return inrFormatter.format(Math.round(amount));
  }

  /** Firestore already stores the final, payable price on `price` — nothing further to subtract. */
  getDiscountedPrice(item: FurnitureItem): number {
    return item.price;
  }

  getTotal(items: FurnitureItem[]): number {
    return items.reduce((total, item) => total + item.price, 0);
  }

  buildQuotation(items: FurnitureItem[], store: Store, customer: CustomerDetails = {}): Quotation {
    const lineItems: QuotationLineItem[] = items.map((item) => ({
      furnitureId: item.id,
      name: item.name,
      category: item.category,
      price: item.originalPrice ?? item.price,
      discount: item.discount ?? 0,
      quantity: 1
    }));

    const subtotal = items.reduce((total, item) => total + (item.originalPrice ?? item.price), 0);
    const totalPrice = this.getTotal(items);

    return {
      id: `quote-${Date.now()}`,
      quotationNumber: `FG-${nextQuotationSequence++}`,
      storeId: store.id,
      customer,
      items: lineItems,
      subtotal,
      discountTotal: subtotal - totalPrice,
      totalPrice,
      estimatedDelivery: store.estimatedDelivery,
      createdDate: new Date().toISOString(),
      status: 'draft'
    };
  }

  saveQuotation(quotation: Quotation): Observable<Quotation> {
    return of(quotation).pipe(delay(150));
  }

  buildWhatsAppMessage(quotation: Quotation, store: Store): string {
    const lines = quotation.items.map(
      (item) => `${item.name} — ${this.formatCurrency(item.price)}`
    );

    return [
      this.lang.t('brand.name'),
      store.name,
      '',
      `${this.lang.t('quotation.number')}: ${quotation.quotationNumber}`,
      '',
      `${this.lang.t('quotation.whatsappHeading')}`,
      '',
      ...lines,
      '',
      `${this.lang.t('quotation.total')}: ${this.formatCurrency(quotation.totalPrice)}`
    ].join('\n');
  }

  getWhatsAppShareUrl(message: string, phone: string): string {
    const digitsOnly = phone.replace(/[^\d]/g, '');
    return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
  }
}
