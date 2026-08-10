import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  template: `
    <div
      class="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-slate-100 p-0.5"
      role="group"
      [attr.aria-label]="lang.t('language.label')"
    >
      <button
        type="button"
        class="rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-150"
        [class.bg-white]="lang.currentLanguage() === 'en'"
        [class.shadow-sm]="lang.currentLanguage() === 'en'"
        [class.text-brand-dark]="lang.currentLanguage() === 'en'"
        [class.text-slate-400]="lang.currentLanguage() !== 'en'"
        [attr.aria-pressed]="lang.currentLanguage() === 'en'"
        (click)="lang.setLanguage('en')"
      >
        EN
      </button>
      <button
        type="button"
        class="rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-150"
        [class.bg-white]="lang.currentLanguage() === 'mr'"
        [class.shadow-sm]="lang.currentLanguage() === 'mr'"
        [class.text-brand-dark]="lang.currentLanguage() === 'mr'"
        [class.text-slate-400]="lang.currentLanguage() !== 'mr'"
        [attr.aria-pressed]="lang.currentLanguage() === 'mr'"
        (click)="lang.setLanguage('mr')"
      >
        मर
      </button>
    </div>
  `
})
export class LanguageSwitcherComponent {
  protected readonly lang = inject(LanguageService);
}
