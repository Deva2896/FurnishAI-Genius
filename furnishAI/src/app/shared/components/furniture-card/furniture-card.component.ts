import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FurnitureItem } from '../../../core/models/furniture.model';
import { QuotationService } from '../../../core/services/quotation.service';
import { LanguageService } from '../../services/language.service';

/**
 * Sized to show roughly 1–1.5 cards on mobile, 2–3 on tablet, and a
 * multi-card row on desktop inside a horizontally scrolling catalog —
 * the width is intentionally owned here (not by the flex container) since
 * this component is only ever used in that one horizontal-scroll context.
 *
 * `category`/`availability` are shop-defined free text from Firestore
 * (multi-tenant: no fixed vocabulary), so they're displayed as-is rather
 * than looked up in a translation dictionary.
 */
@Component({
  selector: 'app-furniture-card',
  standalone: true,
  template: `
    <article
      class="flex w-[72%] max-w-[280px] shrink-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card transition-shadow duration-150 hover:shadow-raised sm:w-[46%] sm:max-w-[320px] md:w-[32%] md:max-w-[300px] lg:w-64 lg:max-w-none"
    >
      <div class="relative">
        @if (imageFailed()) {
          <div class="flex h-36 w-full items-center justify-center bg-slate-100 text-slate-400 md:h-40" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-8 w-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14M4 6h16v12H4V6Z" />
            </svg>
          </div>
        } @else {
          <img
            [src]="item.imageUrl"
            [alt]="item.name"
            loading="lazy"
            class="h-36 w-full object-cover md:h-40"
            (error)="onImageError()"
          />
        }
        @if (item.originalPrice && item.originalPrice > item.price) {
          <span class="absolute left-2 top-2 rounded bg-brand-dark px-2 py-0.5 text-[11px] font-semibold text-white">
            {{ lang.t('furniture.discount', { percent: item.discount ?? 0 }) }}
          </span>
        }
      </div>
      <div class="flex flex-1 flex-col gap-1 p-3">
        <span class="text-[11px] font-medium uppercase tracking-wide text-brand-teal">{{ item.category }}</span>
        <h3 class="line-clamp-2 text-sm font-semibold text-brand-dark">{{ item.name }}</h3>

        <div class="flex items-baseline gap-2">
          <p class="text-base font-bold text-brand-dark">{{ quotationService.formatCurrency(item.price) }}</p>
          @if (item.originalPrice && item.originalPrice > item.price) {
            <p class="text-xs text-slate-400 line-through">{{ quotationService.formatCurrency(item.originalPrice) }}</p>
          }
        </div>

        <span
          class="text-xs font-medium"
          [class.text-emerald-600]="isAvailable()"
          [class.text-rose-500]="isOutOfStock()"
          [class.text-amber-600]="!isAvailable() && !isOutOfStock()"
        >
          {{ item.availability }}
        </span>

        <button
          type="button"
          class="mt-auto inline-flex items-center justify-center gap-1.5 rounded-md py-2 text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50"
          [class.bg-brand-teal]="!isSelected"
          [class.text-white]="!isSelected"
          [class.hover:bg-brand-teal-light]="!isSelected"
          [class.bg-slate-100]="isSelected"
          [class.text-brand-dark]="isSelected"
          [disabled]="isOutOfStock()"
          [attr.aria-pressed]="isSelected"
          [attr.aria-label]="(isSelected ? lang.t('furniture.added') : lang.t('furniture.addToDesign')) + ' — ' + item.name"
          (click)="toggle.emit(item)"
        >
          @if (isSelected) {
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-4 w-4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            {{ lang.t('furniture.added') }}
          } @else {
            {{ lang.t('furniture.addToDesign') }}
          }
        </button>
      </div>
    </article>
  `
})
export class FurnitureCardComponent {
  @Input({ required: true }) item!: FurnitureItem;
  @Input() isSelected = false;
  @Output() toggle = new EventEmitter<FurnitureItem>();

  protected readonly quotationService = inject(QuotationService);
  protected readonly lang = inject(LanguageService);
  protected readonly imageFailed = signal(false);

  onImageError(): void {
    this.imageFailed.set(true);
  }

  protected isAvailable(): boolean {
    return /^(available|in stock|yes|true)$/i.test(this.item.availability.trim());
  }

  protected isOutOfStock(): boolean {
    return /^(out of stock|unavailable|sold out|no|false)$/i.test(this.item.availability.trim());
  }
}
