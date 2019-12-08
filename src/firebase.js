import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBDYQP-QF8MJhrHTWEkd6pV81YPlwh-KG8',
  authDomain: 'lush-scents-plu-tool.firebaseapp.com',
  databaseURL: 'https://lush-scents-plu-tool.firebaseio.com',
  projectId: 'lush-scents-plu-tool',
  storageBucket: 'lush-scents-plu-tool.appspot.com',
  messagingSenderId: '762138444480',
  appId: '1:762138444480:web:67c6abfa4af0e3c9f22325',
  measurementId: 'G-DCHTLHHZT7',
};

Firebase.initializeApp(firebaseConfig);
Firebase.analytics();

// Export the database for components to use.
// eslint-disable-next-line import/prefer-default-export
export const db = firebaseConfig.database();
