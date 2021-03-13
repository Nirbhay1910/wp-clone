// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDNASkXy3VB7nIzMopCHzIqgttgel2k4ck',
  authDomain: 'wp-clone-a6cf8.firebaseapp.com',
  projectId: 'wp-clone-a6cf8',
  storageBucket: 'wp-clone-a6cf8.appspot.com',
  messagingSenderId: '463366004681',
  appId: '1:463366004681:web:37bea26e257fe5f0cad218',
  measurementId: 'G-6YLCKXYF8E',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
