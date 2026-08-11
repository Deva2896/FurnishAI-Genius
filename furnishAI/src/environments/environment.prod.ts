/**
 * Production environment configuration.
 *
 * Same shape as `environment.ts`. This prototype points both environments
 * at the same Firebase project; split into separate dev/prod Firebase
 * projects before real customer data flows through this app.
 */
export const environment = {
  production: true,
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
