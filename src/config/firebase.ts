import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional: Initialize other Firebase services as needed
// export const storage = getStorage(app);


//android maps api key AIzaSyBbrhsqE8qa1-9t6ecUvNDrrizNjIWK1gY