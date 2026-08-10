import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AIRecommendation } from '../../../core/models/ai-recommendation.model';
import { AiDesignService } from '../../../core/services/ai-design.service';
import { StorageService } from '../../../core/services/storage.service';
import { StoreService } from '../../../core/services/store.service';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import { LanguageService } from '../../../shared/services/language.service';
import { ToastService } from '../../../shared/services/toast.service';

export interface RoomScannerResult {
  roomImageUrl: string;
  prompt: string;
  recommendations: AIRecommendation[];
}

@Component({
  selector: 'app-room-scanner',
  standalone: true,
  imports: [LanguageSwitcherComponent],
  templateUrl: './room-scanner.component.html'
})
export class RoomScannerComponent {
  @Output() generated = new EventEmitter<RoomScannerResult>();

  private readonly storageService = inject(StorageService);
  private readonly aiDesignService = inject(AiDesignService);
  private readonly storeService = inject(StoreService);
  protected readonly toastService = inject(ToastService);
  protected readonly lang = inject(LanguageService);

  protected readonly store = toSignal(this.storeService.getCurrentStore());

  protected readonly previewUrl = signal<string | null>(null);
  protected readonly prompt = signal('');
  protected readonly isDragging = signal(false);
  protected readonly isGenerating = signal(false);
  protected readonly imageError = signal<string | null>(null);
  protected readonly promptError = signal<string | null>(null);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.handleFile(file);
    }
    input.value = '';
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.handleFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(): void {
    this.isDragging.set(false);
  }

  removeImage(event: Event): void {
    event.stopPropagation();
    this.previewUrl.set(null);
    this.imageError.set(null);
  }

  onPromptInput(value: string): void {
    this.prompt.set(value);
    if (value.trim()) {
      this.promptError.set(null);
    }
  }

  generate(): void {
    if (this.isGenerating()) {
      return;
    }

    let hasError = false;
    if (!this.previewUrl()) {
      this.imageError.set('validation.imageRequired');
      hasError = true;
    }
    if (!this.prompt().trim()) {
      this.promptError.set('validation.promptRequired');
      hasError = true;
    }
    if (hasError) {
      this.toastService.show(this.lang.t('validation.bothRequired'), 'error');
      return;
    }

    this.isGenerating.set(true);
    this.aiDesignService.generateRecommendations(this.previewUrl()!, this.prompt()).subscribe({
      next: (recommendations) => {
        this.isGenerating.set(false);
        this.generated.emit({
          roomImageUrl: this.previewUrl()!,
          prompt: this.prompt(),
          recommendations
        });
      },
      error: (error: Error) => {
        this.isGenerating.set(false);
        this.toastService.show(this.lang.t(error.message || 'validation.generationFailed'), 'error');
      }
    });
  }

  private handleFile(file: File): void {
    const validation = this.storageService.validateRoomImage(file);
    if (!validation.valid) {
      this.imageError.set(validation.error ?? null);
      this.toastService.show(this.lang.t(validation.error ?? 'validation.imageType'), 'error');
      return;
    }

    this.imageError.set(null);
    this.storageService.uploadRoomImage(file).subscribe({
      next: (url) => this.previewUrl.set(url),
      error: (error: Error) => {
        this.imageError.set(error.message);
        this.toastService.show(this.lang.t(error.message), 'error');
      }
    });
  }
}
