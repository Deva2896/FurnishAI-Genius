import { Routes } from '@angular/router';
import { FurnishAiComponent } from './features/furnish-ai/furnish-ai.component';

// Convenience default for the bare "/" route only — every actual data read
// (StoreService, FurnitureService) is always parameterized by the route's
// :storeSlug, never by this constant. Update to whichever shop's Firestore
// document id you want "/" to land on.
const DEFAULT_STORE_SLUG = 'oAAANGJ1GIYeq2reCM5N';

export const routes: Routes = [
  { path: '', redirectTo: `store/${DEFAULT_STORE_SLUG}`, pathMatch: 'full' },
  { path: 'store/:storeSlug', component: FurnishAiComponent },
  { path: '**', redirectTo: `store/${DEFAULT_STORE_SLUG}` }
];
