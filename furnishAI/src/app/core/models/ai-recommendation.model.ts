import { TranslationKey } from '../../shared/i18n/translations';

/**
 * Position expressed as a percentage of the room image's width/height, so
 * hotspots stay correctly anchored regardless of the rendered image size.
 */
export interface RecommendationPosition {
  xPercent: number;
  yPercent: number;
}

/**
 * Mirrors the planned Firestore `aiRecommendations` collection document
 * shape: one document per hotspot generated for a given room image.
 *
 * `titleKey`/`descriptionKey` point into the i18n dictionary rather than
 * holding literal text, so the same recommendation renders in whichever
 * language the user has selected.
 */
export interface AIRecommendation {
  id: string;
  room: string;
  titleKey: TranslationKey;
  furnitureId: string;
  position: RecommendationPosition;
  descriptionKey: TranslationKey;
}
