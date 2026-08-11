import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { LanguageService } from '../../services/language.service';

/**
 * Shared header for all three customer screens. Screen 1 shows the store
 * name with the shop's logo (falling back to a generic brand mark when
 * there's no logo, or its image fails to load); screens 2 and 3 show a
 * screen title with a back button — both share the same brand line,
 * spacing, and language switcher.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LanguageSwitcherComponent],
  template: `
    <header class="app-shell-px sticky top-0 z-20 border-b border-slate-200 bg-white py-3">
      <div class="app-shell-width mx-auto flex items-center gap-3">
        @if (showBack) {
          <button
            type="button"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 text-brand-dark transition-colors duration-150 hover:bg-slate-50"
            (click)="back.emit()"
            [attr.aria-label]="backAriaLabel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        } @else if (logoUrl && !logoFailed()) {
          <img
            [src]="logoUrl"
            [alt]="title"
            class="h-9 w-9 shrink-0 rounded-md border border-slate-200 object-cover"
            (error)="logoFailed.set(true)"
          />
        } @else {
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-teal text-white" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
              <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" />
            </svg>
          </div>
        }
        <div class="min-w-0 flex-1">
          <p class="truncate text-xs font-medium text-brand-teal">{{ lang.t('brand.name') }}</p>
          <h1 class="truncate text-lg font-bold text-brand-dark md:text-xl">{{ title }}</h1>
        </div>
        <app-language-switcher />
      </div>
    </header>
  `
})
export class AppHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() logoUrl?: string;
  @Input() showBack = false;
  @Input() backAriaLabel = 'Go back';
  @Output() back = new EventEmitter<void>();

  protected readonly lang = inject(LanguageService);
  protected readonly logoFailed = signal(false);
}
