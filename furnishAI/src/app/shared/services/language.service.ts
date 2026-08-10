import { Injectable, signal } from '@angular/core';
import { Language, TRANSLATIONS, TranslationKey } from '../i18n/translations';

export type { Language };

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly currentLanguage = signal<Language>('en');

  setLanguage(language: Language): void {
    this.currentLanguage.set(language);
  }

  // The `(string & {})` union member preserves autocomplete for known
  // `TranslationKey` literals while still accepting a plain runtime string
  // (e.g. an `Error.message` that was thrown as a translation key).
  t(key: TranslationKey | (string & {}), params?: Record<string, string | number>): string {
    const entry = (TRANSLATIONS as Record<string, { en: string; mr: string } | undefined>)[key];
    let text: string = entry ? entry[this.currentLanguage()] : key;

    if (params) {
      for (const [paramKey, value] of Object.entries(params)) {
        text = text.replace(`{{${paramKey}}}`, String(value));
      }
    }

    return text;
  }
}
