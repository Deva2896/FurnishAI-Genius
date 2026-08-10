import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { AIRecommendation } from '../models/ai-recommendation.model';

const GENERATION_DELAY_MS = 2000;

/**
 * Stands in for a future AI Processing API call. In production this would
 * POST the Firebase Storage room-image URL + prompt to the AI service and
 * write the returned hotspots into the Firestore `aiRecommendations`
 * collection. For the prototype it simulates network latency and returns a
 * fixed set of hotspots tied to real catalog furniture ids.
 */
@Injectable({ providedIn: 'root' })
export class AiDesignService {
  generateRecommendations(roomImageDataUrl: string, prompt: string): Observable<AIRecommendation[]> {
    if (!roomImageDataUrl) {
      return throwError(() => new Error('validation.imageRequired'));
    }
    if (!prompt.trim()) {
      return throwError(() => new Error('validation.promptRequired'));
    }

    return timer(GENERATION_DELAY_MS).pipe(
      map(() => [
        {
          id: 'rec-sofa-area',
          room: 'Living Room',
          titleKey: 'hotspot.sofaArea.title',
          furnitureId: 'sofa-l-shape-grey',
          position: { xPercent: 26, yPercent: 62 },
          descriptionKey: 'hotspot.sofaArea.desc'
        },
        {
          id: 'rec-tv-area',
          room: 'Living Room',
          titleKey: 'hotspot.tvArea.title',
          furnitureId: 'tv-unit-wooden',
          position: { xPercent: 72, yPercent: 32 },
          descriptionKey: 'hotspot.tvArea.desc'
        },
        {
          id: 'rec-corner-area',
          room: 'Living Room',
          titleKey: 'hotspot.cornerArea.title',
          furnitureId: 'center-table-luxury',
          position: { xPercent: 50, yPercent: 82 },
          descriptionKey: 'hotspot.cornerArea.desc'
        }
      ] satisfies AIRecommendation[])
    );
  }
}
