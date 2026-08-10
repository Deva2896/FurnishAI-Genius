/**
 * Development environment configuration.
 *
 * Firebase is not wired up yet in this prototype — `firebaseConfig` is left
 * empty on purpose. When Firebase is provisioned, paste the config object
 * from the Firebase console here (or better, inject it via CI secrets) and
 * flip `useFirebase` to `true`. Every service in `core/services` already
 * reads `useFirebase` and falls back to mock, in-memory data when it is
 * `false`, so no other code needs to change.
 */
export const environment = {
  production: false,
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
