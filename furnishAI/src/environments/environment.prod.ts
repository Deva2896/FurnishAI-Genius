/**
 * Production environment configuration.
 *
 * Same shape as `environment.ts` — see that file for why `firebaseConfig`
 * ships empty. Populate via a secure build/deploy pipeline, never by
 * committing real keys to source control.
 */
export const environment = {
  production: true,
  useFirebase: false,
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  },
  whatsappStorePhone: '910000000000'
};
