import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AIRecommendation } from '../../../core/models/ai-recommendation.model';
import { FurnitureItem } from '../../../core/models/furniture.model';
import { FurnitureService } from '../../../core/services/furniture.service';
import { QuotationService } from '../../../core/services/quotation.service';
import { AiHotspotComponent } from '../../../shared/components/ai-hotspot/ai-hotspot.component';
import { FurnitureCardComponent } from '../../../shared/components/furniture-card/furniture-card.component';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import { LanguageService } from '../../../shared/services/language.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-ai-dashboard',
  standalone: true,
  imports: [AiHotspotComponent, FurnitureCardComponent, LanguageSwitcherComponent],
  templateUrl: './ai-dashboard.component.html'
})
export class AiDashboardComponent {
  @Input({ required: true }) roomImageUrl!: string;
  @Input({ required: true }) recommendations: AIRecommendation[] = [];
  @Input({ required: true }) selectedFurniture: FurnitureItem[] = [];

  @Output() back = new EventEmitter<void>();
  @Output() toggleFurniture = new EventEmitter<FurnitureItem>();
  @Output() proceed = new EventEmitter<void>();

  private readonly furnitureService = inject(FurnitureService);
  protected readonly quotationService = inject(QuotationService);
  private readonly toastService = inject(ToastService);
  protected readonly lang = inject(LanguageService);

  protected readonly catalog = toSignal(this.furnitureService.getCatalog(), { initialValue: [] as FurnitureItem[] });
  protected readonly activeRecommendationId = signal<string | null>(null);

  get activeRecommendation(): AIRecommendation | undefined {
    return this.recommendations.find((rec) => rec.id === this.activeRecommendationId());
  }

  getFurnitureFor(recommendation: AIRecommendation): FurnitureItem | undefined {
    return this.furnitureService.getById(recommendation.furnitureId);
  }

  isSelected(item: FurnitureItem): boolean {
    return this.selectedFurniture.some((f) => f.id === item.id);
  }

  selectedTotal(): number {
    return this.quotationService.getTotal(this.selectedFurniture);
  }

  openHotspot(id: string): void {
    this.activeRecommendationId.set(id);
  }

  closePopup(): void {
    this.activeRecommendationId.set(null);
  }

  addFromPopup(item: FurnitureItem): void {
    this.toggleFurniture.emit(item);
    this.closePopup();
  }

  handleProceed(): void {
    if (this.selectedFurniture.length === 0) {
      this.toastService.show(this.lang.t('validation.selectFurniture'), 'error');
      return;
    }
    this.proceed.emit();
  }
}
