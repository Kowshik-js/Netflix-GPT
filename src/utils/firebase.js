// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5Z9AdeoIBlRcDr21WN8zB7yu2Cg_V4PA",
  authDomain: "netflixgpt-bc7b5.firebaseapp.com",
  projectId: "netflixgpt-bc7b5",
  storageBucket: "netflixgpt-bc7b5.appspot.com",
  messagingSenderId: "1072422203976",
  appId: "1:1072422203976:web:aec127fba4fe96c59d9e7d",
  measurementId: "G-D2KJPBLQVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();