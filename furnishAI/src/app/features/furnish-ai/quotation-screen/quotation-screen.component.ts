import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FurnitureItem } from '../../../core/models/furniture.model';
import { Quotation } from '../../../core/models/quotation.model';
import { Store } from '../../../core/models/store.model';
import { QuotationService } from '../../../core/services/quotation.service';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import { StoreOffersComponent } from '../../../shared/components/store-offers/store-offers.component';
import { LanguageService } from '../../../shared/services/language.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-quotation-screen',
  standalone: true,
  imports: [StoreOffersComponent, LanguageSwitcherComponent],
  templateUrl: './quotation-screen.component.html'
})
export class QuotationScreenComponent {
  @Input({ required: true }) selectedFurniture: FurnitureItem[] = [];
  @Input({ required: true }) store!: Store;

  @Output() back = new EventEmitter<void>();

  protected readonly quotationService = inject(QuotationService);
  protected readonly lang = inject(LanguageService);
  private readonly toastService = inject(ToastService);

  get quotation(): Quotation {
    return this.quotationService.buildQuotation(this.selectedFurniture);
  }

  get totalPrice(): number {
    return this.selectedFurniture.reduce((total, item) => total + item.price, 0);
  }

  shareOnWhatsApp(): void {
    const message = this.quotationService.buildWhatsAppMessage(this.quotation, this.store);
    const url = this.quotationService.getWhatsAppShareUrl(message, this.store.contact.phone);
    window.open(url, '_blank', 'noopener');
  }

  talkToManager(): void {
    this.quotationService.saveQuotation({ ...this.quotation, status: 'sent' }).subscribe(() => {
      this.toastService.show(this.lang.t('quotation.managerToast'), 'info', 3000);
    });
  }
}
