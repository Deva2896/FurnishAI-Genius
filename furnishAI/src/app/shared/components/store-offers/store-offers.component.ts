import { Component, Input, inject } from '@angular/core';
import { Offer } from '../../../core/models/offer.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-store-offers',
  standalone: true,
  template: `
    <section class="rounded-2xl bg-gradient-to-br from-brand-teal to-brand-teal-light p-4 text-brand-warm-white shadow-premium" aria-labelledby="store-offers-heading">
      <h2 id="store-offers-heading" class="mb-3 text-base font-bold">{{ lang.t('offers.title') }}</h2>
      <ul class="flex flex-col gap-2.5">
        @for (offer of offers; track offer.id) {
          <li class="flex items-start gap-3 rounded-xl bg-white/10 p-3">
            <span class="text-xl leading-none" aria-hidden="true">{{ offer.icon }}</span>
            <div>
              <p class="text-sm font-semibold">{{ lang.t(offer.titleKey) }}</p>
              <p class="text-xs text-brand-warm-white/80">{{ lang.t(offer.descriptionKey) }}</p>
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
