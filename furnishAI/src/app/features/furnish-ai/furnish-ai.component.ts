import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AIRecommendation } from '../../core/models/ai-recommendation.model';
import { FurnitureItem } from '../../core/models/furniture.model';
import { StoreService } from '../../core/services/store.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { LanguageService } from '../../shared/services/language.service';
import { ToastService } from '../../shared/services/toast.service';
import { AiDashboardComponent } from './ai-dashboard/ai-dashboard.component';
import { QuotationScreenComponent } from './quotation-screen/quotation-screen.component';
import { RoomScannerComponent, RoomScannerResult } from './room-scanner/room-scanner.component';

type ScreenId = 1 | 2 | 3;

@Component({
  selector: 'app-furnish-ai',
  standalone: true,
  imports: [RoomScannerComponent, AiDashboardComponent, QuotationScreenComponent, ToastComponent],
  templateUrl: './furnish-ai.component.html'
})
export class FurnishAiComponent {
  private readonly storeService = inject(StoreService);
  private readonly toastService = inject(ToastService);
  private readonly lang = inject(LanguageService);

  protected readonly currentScreen = signal<ScreenId>(1);
  protected readonly roomImageUrl = signal<string | null>(null);
  protected readonly recommendations = signal<AIRecommendation[]>([]);
  protected readonly selectedFurniture = signal<FurnitureItem[]>([]);
  protected readonly store = toSignal(this.storeService.getCurrentStore());

  onGenerated(result: RoomScannerResult): void {
    this.roomImageUrl.set(result.roomImageUrl);
    this.recommendations.set(result.recommendations);
    this.currentScreen.set(2);
  }

  onToggleFurniture(item: FurnitureItem): void {
    const isSelected = this.selectedFurniture().some((f) => f.id === item.id);
    if (isSelected) {
      this.selectedFurniture.update((items) => items.filter((f) => f.id !== item.id));
      this.toastService.show(this.lang.t('toast.removed', { name: item.name }), 'info');
    } else {
      this.selectedFurniture.update((items) => [...items, item]);
      this.toastService.show(this.lang.t('toast.added', { name: item.name }), 'success');
    }
  }
}
