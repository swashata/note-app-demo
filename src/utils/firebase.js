import firebase from 'firebase';

// side-effect
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCdN8hilShcgYm7NSKF3N6c8G7SlYKpEi8',
  authDomain: 'note-app-demo-ab78b.firebaseapp.com',
  databaseURL: 'https://note-app-demo-ab78b.firebaseio.com',
  projectId: 'note-app-demo-ab78b',
  storageBucket: 'note-app-demo-ab78b.appspot.com',
  messagingSenderId: '862671779807',
  appId: '1:862671779807:web:97778057ddfc1bc757366a',
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.firestore();
