import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecommendationPosition } from '../../../core/models/ai-recommendation.model';

/**
 * Pulsing "+" marker anchored on the room image. Deliberately dumb — it only
 * knows where to sit and what to emit; the recommendation popup content is
 * owned by the AI Dashboard screen so hotspots stay easy to reuse.
 */
@Component({
  selector: 'app-ai-hotspot',
  standalone: true,
  template: `
    <button
      type="button"
      class="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-teal text-white shadow-raised ring-2 ring-white transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
      [class.animate-pulse-soft]="!isOpen"
      [style.left.%]="position.xPercent"
      [style.top.%]="position.yPercent"
      [attr.aria-label]="ariaLabel"
      [attr.aria-expanded]="isOpen"
      (click)="activate.emit()"
    >
      <span class="text-lg font-bold leading-none text-white" aria-hidden="true">+</span>
    </button>
  `
})
export class AiHotspotComponent {
  @Input({ required: true }) position!: RecommendationPosition;
  @Input({ required: true }) ariaLabel!: string;
  @Input() isOpen = false;
  @Output() activate = new EventEmitter<void>();
}
