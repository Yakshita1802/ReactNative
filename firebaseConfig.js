import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, inMemoryPersistence } from 'firebase/auth'; // Use inMemoryPersistence
import { getFirestore } from 'firebase/firestore';
import { ReactNativeAsyncStorage } from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyAvYbKzJNaKRNZtMtAFUEZAtzinnX3laIM",
  authDomain: "cashback-web-app.firebaseapp.com",
  projectId: "cashback-web-app",
  storageBucket: "cashback-web-app.appspot.com",
  messagingSenderId: "1043544354212",
  appId: "1:1043544354212:web:a5bd8e2b574a1ce1cb2531"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage for state persistence
const auth = initializeAuth(app, {
  persistence: inMemoryPersistence, // Use in-memory persistence
  dataConverter: null,
});

const db = getFirestore(app);

export { auth, db };