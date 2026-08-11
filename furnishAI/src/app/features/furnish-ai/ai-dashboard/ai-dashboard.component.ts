import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { AIRecommendation } from '../../../core/models/ai-recommendation.model';
import { FurnitureItem } from '../../../core/models/furniture.model';
import { Store } from '../../../core/models/store.model';
import { FurnitureService } from '../../../core/services/furniture.service';
import { QuotationService } from '../../../core/services/quotation.service';
import { AiHotspotComponent } from '../../../shared/components/ai-hotspot/ai-hotspot.component';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { FurnitureCardComponent } from '../../../shared/components/furniture-card/furniture-card.component';
import { LanguageService } from '../../../shared/services/language.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-ai-dashboard',
  standalone: true,
  imports: [AiHotspotComponent, FurnitureCardComponent, AppHeaderComponent, EmptyStateComponent],
  templateUrl: './ai-dashboard.component.html'
})
export class AiDashboardComponent implements OnInit {
  @Input({ required: true }) store!: Store;
  @Input({ required: true }) roomImageUrl!: string;
  @Input({ required: true }) searchText = '';
  @Input({ required: true }) recommendations: AIRecommendation[] = [];
  @Input({ required: true }) selectedFurniture: FurnitureItem[] = [];

  @Output() back = new EventEmitter<void>();
  @Output() toggleFurniture = new EventEmitter<FurnitureItem>();
  @Output() proceed = new EventEmitter<void>();

  private readonly furnitureService = inject(FurnitureService);
  protected readonly quotationService = inject(QuotationService);
  private readonly toastService = inject(ToastService);
  protected readonly lang = inject(LanguageService);

  protected readonly catalog = signal<FurnitureItem[]>([]);
  protected readonly catalogLoading = signal(true);
  protected readonly catalogError = signal(false);
  protected readonly activeRecommendationId = signal<string | null>(null);

  ngOnInit(): void {
    this.loadCatalog();
  }

  loadCatalog(): void {
    this.catalogLoading.set(true);
    this.catalogError.set(false);
    this.furnitureService.searchCatalog(this.store.id, this.searchText).subscribe({
      next: (items) => {
        this.catalog.set(items);
        this.catalogLoading.set(false);
      },
      error: () => {
        this.catalog.set([]);
        this.catalogError.set(true);
        this.catalogLoading.set(false);
      }
    });
  }

  get activeRecommendation(): AIRecommendation | undefined {
    return this.recommendations.find((rec) => rec.id === this.activeRecommendationId());
  }

  /**
   * The AI hotspot recommendations are generic zone placeholders (position +
   * caption), not tied to any specific shop's catalog. Once the real
   * Firestore results load, each hotspot is matched to a catalog item by
   * id first (in case it ever lines up), falling back to its position in
   * the recommendation list so every hotspot still opens on a real product
   * instead of silently doing nothing when the id never matches.
   */
  getFurnitureFor(recommendation: AIRecommendation): FurnitureItem | undefined {
    const items = this.catalog();
    const exactMatch = items.find((item) => item.id === recommendation.furnitureId);
    if (exactMatch) {
      return exactMatch;
    }
    const index = this.recommendations.indexOf(recommendation);
    return items[index];
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
