import { TranslationKey } from '../../shared/i18n/translations';

export interface Offer {
  id: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  icon: string;
}
