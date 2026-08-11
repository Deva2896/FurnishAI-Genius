import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  template: `
    <div
      class="inline-flex shrink-0 items-center gap-0.5 rounded-md border border-slate-200 bg-white p-0.5"
      role="group"
      [attr.aria-label]="lang.t('language.label')"
    >
      <button
        type="button"
        class="rounded px-2.5 py-1 text-xs font-semibold transition-colors duration-150"
        [class.bg-brand-teal]="lang.currentLanguage() === 'en'"
        [class.text-white]="lang.currentLanguage() === 'en'"
        [class.text-slate-500]="lang.currentLanguage() !== 'en'"
        [attr.aria-pressed]="lang.currentLanguage() === 'en'"
        (click)="lang.setLanguage('en')"
      >
        English
      </button>
      <button
        type="button"
        class="rounded px-2.5 py-1 text-xs font-semibold transition-colors duration-150"
        [class.bg-brand-teal]="lang.currentLanguage() === 'mr'"
        [class.text-white]="lang.currentLanguage() === 'mr'"
        [class.text-slate-500]="lang.currentLanguage() !== 'mr'"
        [attr.aria-pressed]="lang.currentLanguage() === 'mr'"
        (click)="lang.setLanguage('mr')"
      >
        
       मराठी
      </button>
    </div>
  `
})
export class LanguageSwitcherComponent {
  protected readonly lang = inject(LanguageService);
}
