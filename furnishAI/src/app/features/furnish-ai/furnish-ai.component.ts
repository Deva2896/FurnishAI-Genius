import { isPlatformBrowser } from '@angular/common';
import { Component, Input, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { AIRecommendation } from '../../core/models/ai-recommendation.model';
import { FurnitureItem } from '../../core/models/furniture.model';
import { Store } from '../../core/models/store.model';
import { StoreService } from '../../core/services/store.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
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
  imports: [RoomScannerComponent, AiDashboardComponent, QuotationScreenComponent, ToastComponent, EmptyStateComponent],
  templateUrl: './furnish-ai.component.html'
})
export class FurnishAiComponent implements OnInit {
  @Input() storeSlug = '';

  private readonly storeService = inject(StoreService);
  private readonly toastService = inject(ToastService);
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly lang = inject(LanguageService);

  protected readonly loadingStore = signal(true);
  protected readonly store = signal<Store | undefined>(undefined);

  protected readonly currentScreen = signal<ScreenId>(1);
  protected readonly roomImageUrl = signal<string | null>(null);
  protected readonly searchText = signal('');
  protected readonly recommendations = signal<AIRecommendation[]>([]);
  protected readonly selectedFurniture = signal<FurnitureItem[]>([]);

  ngOnInit(): void {
    // Firestore's Node-side transport (gRPC) is unreliable/blocked on many
    // server/dev-machine networks and can hang SSR entirely. Every screen
    // here is customer/session-specific anyway (no SEO upside to
    // pre-rendering it), so the shop is only fetched in the browser — SSR
    // just ships the loading state for a fast first paint, then this runs
    // for real once the client hydrates.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.storeService.getStoreBySlug(this.storeSlug).subscribe((store) => {
      this.store.set(store);
      this.loadingStore.set(false);
    });
  }

  onGenerated(result: RoomScannerResult): void {
    this.roomImageUrl.set(result.roomImageUrl);
    this.searchText.set(result.prompt);
    this.recommendations.set(result.recommendations);
    this.currentScreen.set(2);
  }

  onToggleFurniture(item: FurnitureItem): void {
    const isSelected = this.selectedFurniture().some((f) => f.id === item.id);
    if (isSelected) {
      this.selectedFurniture.update((items) => items.filter((f) => f.id !== item.id));
      this.toastService.show(this.lang.t('toast.removed'), 'info');
    } else {
      this.selectedFurniture.update((items) => [...items, item]);
      this.toastService.show(this.lang.t('toast.added'), 'success');
    }
  }
}
