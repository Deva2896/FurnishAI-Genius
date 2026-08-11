import { FirebaseApp, initializeApp } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { Firestore, getFirestore } from 'firebase/firestore';
import { environment } from '../../../environments/environment';

/**
 * Single Firebase app instance for the whole application. This module is
 * imported once from `app.config.ts`, which is shared by both the browser
 * and server bootstrap paths, so `initializeApp` also runs during SSR.
 *
 * `firestore` is now used for real (`shops` + `shops/{shopId}/products`),
 * so it's loaded eagerly like `app`. `firebase/storage` and `firebase/auth`
 * are still unused — pull those in from within the service that first
 * needs them rather than bundling them into every page up front.
 *
 * `getAnalytics` needs real browser APIs (`window`, `document`) that don't
 * exist on the server, so it's guarded and left `undefined` outside the
 * browser.
 */
export const firebaseApp: FirebaseApp = initializeApp(environment.firebaseConfig);

export const firestore: Firestore = getFirestore(firebaseApp);

export const analytics: Analytics | undefined =
  typeof window !== 'undefined' ? getAnalytics(firebaseApp) : undefined;
