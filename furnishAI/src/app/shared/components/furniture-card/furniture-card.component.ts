import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FurnitureCategory, FurnitureItem } from '../../../core/models/furniture.model';
import { QuotationService } from '../../../core/services/quotation.service';
import { LanguageService } from '../../services/language.service';
import { TranslationKey } from '../../i18n/translations';

const CATEGORY_KEYS: Record<FurnitureCategory, TranslationKey> = {
  Sofa: 'furniture.category.Sofa',
  'TV Unit': 'furniture.category.TV Unit',
  Table: 'furniture.category.Table',
  Chair: 'furniture.category.Chair',
  Storage: 'furniture.category.Storage',
  Lighting: 'furniture.category.Lighting'
};

@Component({
  selector: 'app-furniture-card',
  standalone: true,
  template: `
    <article
      class="flex w-40 shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-premium ring-1 ring-slate-100 transition-transform duration-200 hover:-translate-y-0.5 sm:w-44 md:w-full md:shrink"
    >
      <img
        [src]="item.imageUrl"
        [alt]="item.name"
        loading="lazy"
        class="h-32 w-full object-cover md:h-40"
      />
      <div class="flex flex-1 flex-col gap-1 p-3">
        <span class="text-[11px] font-medium uppercase tracking-wide text-brand-teal">{{ lang.t(categoryKey(item.category)) }}</span>
        <h3 class="line-clamp-2 text-sm font-semibold text-brand-dark">{{ item.name }}</h3>
        <p class="text-base font-bold text-brand-dark">{{ quotationService.formatCurrency(item.price) }}</p>

        @if (item.availability === 'in-stock') {
          <span class="text-xs font-medium text-emerald-600">{{ lang.t('furniture.availability.in-stock') }}</span>
        } @else if (item.availability === 'made-to-order') {
          <span class="text-xs font-medium text-amber-600">{{ lang.t('furniture.availability.made-to-order') }}</span>
        } @else {
          <span class="text-xs font-medium text-rose-500">{{ lang.t('furniture.availability.out-of-stock') }}</span>
        }

        <button
          type="button"
          class="mt-auto inline-flex items-center justify-center gap-1 rounded-full py-2 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
          [class.bg-brand-teal]="!isSelected"
          [class.text-white]="!isSelected"
          [class.bg-emerald-100]="isSelected"
          [class.text-emerald-700]="isSelected"
          [disabled]="item.availability === 'out-of-stock'"
          [attr.aria-pressed]="isSelected"
          [attr.aria-label]="(isSelected ? lang.t('furniture.added') : lang.t('furniture.addToRoom')) + ' — ' + item.name"
          (click)="toggle.emit(item)"
        >
          @if (isSelected) {
            <span aria-hidden="true">✓</span> {{ lang.t('furniture.addedLabel') }}
          } @else {
            {{ lang.t('furniture.addToRoom') }}
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

  protected categoryKey(category: FurnitureCategory): TranslationKey {
    return CATEGORY_KEYS[category];
  }
}
