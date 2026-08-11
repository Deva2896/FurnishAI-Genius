import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FurnitureItem } from '../../../core/models/furniture.model';
import { LeadRequest } from '../../../core/models/lead.model';
import { Quotation } from '../../../core/models/quotation.model';
import { Store } from '../../../core/models/store.model';
import { LeadService } from '../../../core/services/lead.service';
import { QuotationService } from '../../../core/services/quotation.service';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { EnquiryFormComponent, EnquiryFormValue } from '../../../shared/components/enquiry-form/enquiry-form.component';
import { StoreOffersComponent } from '../../../shared/components/store-offers/store-offers.component';
import { LanguageService } from '../../../shared/services/language.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-quotation-screen',
  standalone: true,
  imports: [StoreOffersComponent, AppHeaderComponent, EmptyStateComponent, EnquiryFormComponent, DatePipe],
  templateUrl: './quotation-screen.component.html'
})
export class QuotationScreenComponent implements OnInit {
  @Input({ required: true }) selectedFurniture: FurnitureItem[] = [];
  @Input({ required: true }) store!: Store;

  @Output() back = new EventEmitter<void>();

  protected readonly quotationService = inject(QuotationService);
  protected readonly lang = inject(LanguageService);
  private readonly toastService = inject(ToastService);
  private readonly leadService = inject(LeadService);

  protected quotation!: Quotation;
  protected readonly showEnquiryForm = signal(false);
  protected readonly submittingEnquiry = signal(false);

  ngOnInit(): void {
    this.quotation = this.quotationService.buildQuotation(this.selectedFurniture, this.store);
  }

  shareOnWhatsApp(): void {
    const message = this.quotationService.buildWhatsAppMessage(this.quotation, this.store);
    const url = this.quotationService.getWhatsAppShareUrl(message, this.store.contact.phone);
    window.open(url, '_blank', 'noopener');
  }

  openEnquiryForm(): void {
    this.showEnquiryForm.set(true);
  }

  closeEnquiryForm(): void {
    this.showEnquiryForm.set(false);
  }

  submitEnquiry(value: EnquiryFormValue): void {
    this.submittingEnquiry.set(true);
    const request: LeadRequest = {
      storeId: this.store.id,
      name: value.name,
      phone: value.phone,
      preferredContactTime: value.preferredContactTime,
      message: value.message || undefined,
      quotationId: this.quotation.id
    };

    this.leadService.submitEnquiry(request).subscribe(() => {
      this.submittingEnquiry.set(false);
      this.showEnquiryForm.set(false);
      this.toastService.show(this.lang.t('enquiry.success'), 'success');
    });
  }
}
