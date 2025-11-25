import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXvE4ekmH1rWamPKIqAlWPGs83EUG0FXE",
  authDomain: "studybuddies-48475.firebaseapp.com",
  projectId: "studybuddies-48475",
  storageBucket: "studybuddies-48475.appspot.com",
  messagingSenderId: "367331500343",
  appId: "1:367331500343:web:6da0399e841baefbcbfab2",
  measurementId: "G-GL88X6JD69"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Auth for React Native with persistence
let authInstance;
try {
  authInstance = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  // If already initialized (e.g., Fast Refresh), reuse existing instance
  authInstance = getAuth(app);
}
export const auth = authInstance;
export const db = getFirestore(app);

// Optional: Initialize other Firebase services as needed
// export const storage = getStorage(app);


//android maps api key AIzaSyBbrhsqE8qa1-9t6ecUvNDrrizNjIWK1gY