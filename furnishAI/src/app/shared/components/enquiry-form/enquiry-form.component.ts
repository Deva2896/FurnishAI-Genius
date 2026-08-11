import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PreferredContactTime } from '../../../core/models/lead.model';
import { LanguageService } from '../../services/language.service';

export interface EnquiryFormValue {
  name: string;
  phone: string;
  preferredContactTime: PreferredContactTime;
  message: string;
}

const MOBILE_PATTERN = /^[6-9]\d{9}$/;

/**
 * "Contact Store" enquiry dialog. Deliberately form-only: it validates and
 * emits the entered details, but leaves calling `LeadService` (and closing
 * itself on success) to the screen that hosts it, so the submit/loading
 * state stays owned by one place.
 */
@Component({
  selector: 'app-enquiry-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/40 sm:items-center sm:p-6" (click)="cancelled.emit()">
      <div
        class="w-full max-w-md rounded-t-lg border border-slate-200 bg-white p-5 shadow-raised sm:rounded-lg"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="'enquiry-form-title'"
        (click)="$event.stopPropagation()"
      >
        <div class="mb-1 flex items-center justify-between">
          <h2 id="enquiry-form-title" class="text-base font-bold text-brand-dark">{{ lang.t('enquiry.title') }}</h2>
          <button type="button" class="text-slate-400 transition-colors hover:text-slate-600" [attr.aria-label]="lang.t('enquiry.closeAria')" (click)="cancelled.emit()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="mb-4 text-sm text-slate-500">{{ lang.t('enquiry.subtitle') }}</p>

        <form class="flex flex-col gap-4" [formGroup]="form" (ngSubmit)="handleSubmit()">
          <div>
            <label for="enquiry-name" class="mb-1.5 block text-sm font-medium text-brand-dark">{{ lang.t('enquiry.name.label') }}</label>
            <input
              id="enquiry-name"
              type="text"
              formControlName="name"
              [placeholder]="lang.t('enquiry.name.placeholder')"
              class="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-brand-dark outline-none transition-colors focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
              [attr.aria-invalid]="isInvalid('name')"
            />
            @if (isInvalid('name')) {
              <p class="mt-1 text-xs font-medium text-rose-500" role="alert">{{ lang.t('enquiry.name.required') }}</p>
            }
          </div>

          <div>
            <label for="enquiry-phone" class="mb-1.5 block text-sm font-medium text-brand-dark">{{ lang.t('enquiry.phone.label') }}</label>
            <input
              id="enquiry-phone"
              type="tel"
              inputmode="numeric"
              formControlName="phone"
              [placeholder]="lang.t('enquiry.phone.placeholder')"
              class="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-brand-dark outline-none transition-colors focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
              [attr.aria-invalid]="isInvalid('phone')"
            />
            @if (form.get('phone')?.touched && form.get('phone')?.hasError('required')) {
              <p class="mt-1 text-xs font-medium text-rose-500" role="alert">{{ lang.t('enquiry.phone.required') }}</p>
            } @else if (form.get('phone')?.touched && form.get('phone')?.hasError('pattern')) {
              <p class="mt-1 text-xs font-medium text-rose-500" role="alert">{{ lang.t('enquiry.phone.invalid') }}</p>
            }
          </div>

          <div>
            <label for="enquiry-time" class="mb-1.5 block text-sm font-medium text-brand-dark">{{ lang.t('enquiry.time.label') }}</label>
            <select
              id="enquiry-time"
              formControlName="preferredContactTime"
              class="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-brand-dark outline-none transition-colors focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
              [attr.aria-invalid]="isInvalid('preferredContactTime')"
            >
              <option value="" disabled>{{ lang.t('enquiry.time.placeholder') }}</option>
              <option value="morning">{{ lang.t('enquiry.time.morning') }}</option>
              <option value="afternoon">{{ lang.t('enquiry.time.afternoon') }}</option>
              <option value="evening">{{ lang.t('enquiry.time.evening') }}</option>
            </select>
            @if (isInvalid('preferredContactTime')) {
              <p class="mt-1 text-xs font-medium text-rose-500" role="alert">{{ lang.t('enquiry.time.required') }}</p>
            }
          </div>

          <div>
            <label for="enquiry-message" class="mb-1.5 block text-sm font-medium text-brand-dark">{{ lang.t('enquiry.message.label') }}</label>
            <textarea
              id="enquiry-message"
              rows="3"
              formControlName="message"
              [placeholder]="lang.t('enquiry.message.placeholder')"
              class="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-brand-dark outline-none transition-colors focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
            ></textarea>
          </div>

          <div class="mt-1 flex gap-3">
            <button
              type="button"
              class="flex-1 rounded-md border border-slate-300 py-2.5 text-sm font-semibold text-brand-dark transition-colors duration-150 hover:bg-slate-50"
              (click)="cancelled.emit()"
            >
              {{ lang.t('enquiry.cancel') }}
            </button>
            <button
              type="submit"
              class="flex-1 rounded-md bg-brand-teal py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-teal-light disabled:cursor-not-allowed disabled:opacity-60"
              [disabled]="isSubmitting"
            >
              {{ isSubmitting ? lang.t('enquiry.submitting') : lang.t('enquiry.submit') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class EnquiryFormComponent {
  @Input() isSubmitting = false;
  @Output() submitted = new EventEmitter<EnquiryFormValue>();
  @Output() cancelled = new EventEmitter<void>();

  protected readonly lang = inject(LanguageService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(MOBILE_PATTERN)]],
    preferredContactTime: ['' as PreferredContactTime | '', [Validators.required]],
    message: ['']
  });

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.touched && control.invalid;
  }

  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.submitted.emit({
      name: value.name!.trim(),
      phone: value.phone!.trim(),
      preferredContactTime: value.preferredContactTime as PreferredContactTime,
      message: value.message?.trim() ?? ''
    });
  }
}
