/**
 * Development environment configuration.
 *
 * `firebaseConfig` points at the provisioned FurnishAI Genius Firebase
 * project (see `core/firebase/firebase.ts` for how it's initialized).
 * `useFirebase` is a readiness flag for later work: every service under
 * `core/services` still returns mock, in-memory data today — flip a
 * service over to Firestore/Storage reads and gate it behind this flag
 * when that migration happens, so mock data remains the default until
 * each service is deliberately switched.
 */
export const environment = {
  production: false,
  useFirebase: true,
  firebaseConfig: {
    apiKey: 'AIzaSyBruUOYMokk-AU9hqZCX5K5oji5qKi-wk0',
    authDomain: 'furnishai-92cf3.firebaseapp.com',
    projectId: 'furnishai-92cf3',
    storageBucket: 'furnishai-92cf3.firebasestorage.app',
    messagingSenderId: '980872590366',
    appId: '1:980872590366:web:a1aaac421fe13e1759aa0f',
    measurementId: 'G-FR1PXRYYR3'
  },
  whatsappStorePhone: '910000000000'
};
