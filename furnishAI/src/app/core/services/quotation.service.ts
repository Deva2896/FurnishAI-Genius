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

/**
 * Builds and (eventually) persists quotations. `saveQuotation()` currently
 * resolves locally; wire it to `addDoc(collection(firestore, 'quotations'), ...)`
 * once Firestore is provisioned — the `Quotation` shape already mirrors the
 * planned document schema.
 */
@Injectable({ providedIn: 'root' })
export class QuotationService {
  private readonly lang = inject(LanguageService);

  getTotal(items: FurnitureItem[]): number {
    return items.reduce((total, item) => total + item.price, 0);
  }

  formatCurrency(amount: number): string {
    return inrFormatter.format(amount);
  }

  buildQuotation(items: FurnitureItem[], customer: CustomerDetails = {}): Quotation {
    const lineItems: QuotationLineItem[] = items.map((item) => ({
      furnitureId: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      quantity: 1
    }));

    return {
      id: `quote-${Date.now()}`,
      customer,
      items: lineItems,
      totalPrice: this.getTotal(items),
      createdDate: new Date().toISOString(),
      status: 'draft'
    };
  }

  saveQuotation(quotation: Quotation): Observable<Quotation> {
    return of(quotation).pipe(delay(150));
  }

  buildWhatsAppMessage(quotation: Quotation, store: Store): string {
    const lines = quotation.items.map(
      (item) => `• ${item.name} — ${this.formatCurrency(item.price)}`
    );

    return [
      `*${store.name}*`,
      this.lang.t('quotation.whatsappReady'),
      '',
      ...lines,
      '',
      `*${this.lang.t('quotation.whatsappTotal')}: ${this.formatCurrency(quotation.totalPrice)}*`
    ].join('\n');
  }

  getWhatsAppShareUrl(message: string, phone: string): string {
    const digitsOnly = phone.replace(/[^\d]/g, '');
    return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
  }
}
