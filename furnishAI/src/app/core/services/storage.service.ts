import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationKey } from '../../shared/i18n/translations';

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;

export interface ImageValidationResult {
  valid: boolean;
  error?: TranslationKey;
}

/**
 * Wraps browser file handling for the prototype. In production,
 * `uploadRoomImage()` would push the file to Firebase Storage under
 * `rooms/{sessionId}/{timestamp}-{filename}` and return the resulting
 * download URL instead of a local `data:` URL — every caller already treats
 * the result as an opaque string URL, so that swap is isolated to this file.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  validateRoomImage(file: File): ImageValidationResult {
    if (!file.type.startsWith('image/')) {
      return { valid: false, error: 'validation.imageType' };
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return { valid: false, error: 'validation.imageSize' };
    }
    return { valid: true };
  }

  readAsDataUrl(file: File): Observable<string> {
    return new Observable<string>((subscriber) => {
      const reader = new FileReader();
      reader.onload = () => {
        subscriber.next(reader.result as string);
        subscriber.complete();
      };
      reader.onerror = () => subscriber.error(new Error('validation.imageRead'));
      reader.readAsDataURL(file);
      return () => reader.abort();
    });
  }

  uploadRoomImage(file: File): Observable<string> {
    // TODO(firebase): replace with an `uploadBytes` + `getDownloadURL` call
    // against Firebase Storage once a project is provisioned.
    return this.readAsDataUrl(file);
  }
}
