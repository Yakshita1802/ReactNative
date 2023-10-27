import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAvYbKzJNaKRNZtMtAFUEZAtzinnX3laIM",
  authDomain: "cashback-web-app.firebaseapp.com",
  projectId: "cashback-web-app",
  storageBucket: "cashback-web-app.appspot.com",
  messagingSenderId: "1043544354212",
  appId: "1:1043544354212:web:a5bd8e2b574a1ce1cb2531"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);