import { Routes } from '@angular/router';
import { FurnishAiComponent } from './features/furnish-ai/furnish-ai.component';

export const routes: Routes = [
  { path: '', component: FurnishAiComponent },
  { path: '**', redirectTo: '' }
];
