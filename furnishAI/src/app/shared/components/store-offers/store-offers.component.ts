import { Component, Input, inject } from '@angular/core';
import { Offer } from '../../../core/models/offer.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-store-offers',
  standalone: true,
  template: `
    <section class="rounded-lg border border-slate-200 bg-white p-4 shadow-card" aria-labelledby="store-offers-heading">
      <h2 id="store-offers-heading" class="mb-3 text-sm font-bold uppercase tracking-wide text-brand-teal">
        {{ lang.t('offers.title') }}
      </h2>
      <ul class="flex flex-col gap-3">
        @for (offer of offers; track offer.id) {
          <li class="flex items-start gap-3">
            <span class="text-lg leading-none" aria-hidden="true">{{ offer.icon }}</span>
            <div>
              <p class="text-sm font-semibold text-brand-dark">{{ lang.t(offer.titleKey) }}</p>
              <p class="text-xs text-slate-500">{{ lang.t(offer.descriptionKey) }}</p>
            </div>
          </li>
        }
      </ul>
    </section>
  `
})
export class StoreOffersComponent {
  @Input({ required: true }) offers: Offer[] = [];
  protected readonly lang = inject(LanguageService);
}
