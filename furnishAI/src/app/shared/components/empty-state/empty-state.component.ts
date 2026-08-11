import { Component, EventEmitter, Input, Output } from '@angular/core';

export type EmptyStateVariant = 'empty' | 'error';

/**
 * Reused for every "nothing to show" moment across the customer flow: no
 * furniture loaded, no products selected yet, a catalog fetch that failed,
 * a network error. Keeps those states visually consistent instead of each
 * screen inventing its own placeholder.
 */
@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="flex flex-col items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
      <div
        class="flex h-11 w-11 items-center justify-center rounded-full"
        [class.bg-slate-100]="variant === 'empty'"
        [class.text-slate-400]="variant === 'empty'"
        [class.bg-rose-50]="variant === 'error'"
        [class.text-rose-500]="variant === 'error'"
        aria-hidden="true"
      >
        @if (variant === 'error') {
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.18A1.5 1.5 0 0 0 3.5 20.5h17a1.5 1.5 0 0 0 1.39-2.46L13.71 3.86a1.5 1.5 0 0 0-2.42 0Z" />
          </svg>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25" />
          </svg>
        }
      </div>
      <div>
        <p class="text-sm font-semibold text-brand-dark">{{ title }}</p>
        @if (description) {
          <p class="mt-1 text-sm text-slate-500">{{ description }}</p>
        }
      </div>
      @if (retryLabel) {
        <button
          type="button"
          class="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-brand-dark transition-colors duration-150 hover:bg-slate-50"
          (click)="retry.emit()"
        >
          {{ retryLabel }}
        </button>
      }
    </div>
  `
})
export class EmptyStateComponent {
  @Input() variant: EmptyStateVariant = 'empty';
  @Input({ required: true }) title!: string;
  @Input() description?: string;
  @Input() retryLabel?: string;
  @Output() retry = new EventEmitter<void>();
}
