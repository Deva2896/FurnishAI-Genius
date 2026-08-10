import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div
      class="app-shell-width pointer-events-none fixed inset-x-0 bottom-24 z-50 mx-auto flex flex-col items-center gap-2 px-4 lg:bottom-8"
      role="status"
      aria-live="polite"
    >
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="animate-fade-up pointer-events-auto flex max-w-full items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-brand-warm-white shadow-premium"
          [class.bg-brand-teal]="toast.type === 'success'"
          [class.bg-rose-600]="toast.type === 'error'"
          [class.bg-slate-800]="toast.type === 'info'"
        >
          @if (toast.type === 'success') {
            <span aria-hidden="true">✓</span>
          } @else if (toast.type === 'error') {
            <span aria-hidden="true">⚠</span>
          } @else {
            <span aria-hidden="true">ℹ</span>
          }
          <span>{{ toast.text }}</span>
        </div>
      }
    </div>
  `
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);
}
