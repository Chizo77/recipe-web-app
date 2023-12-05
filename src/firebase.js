import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider } from 'firebase/auth';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDrG_nfzi_5z_YQTxvpfDUNWC-AGmYj6nI",
    authDomain: "recipe-app-e1a5c.firebaseapp.com",
    projectId: "recipe-app-e1a5c",
    storageBucket: "recipe-app-e1a5c.appspot.com",
    messagingSenderId: "655921300021",
    appId: "1:655921300021:web:04616f9d9d376629b0677c",
    measurementId: "G-5LQLFSLRXH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app);

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log('Firebase initialized with session persistence.');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

export { auth, db, facebookProvider };
