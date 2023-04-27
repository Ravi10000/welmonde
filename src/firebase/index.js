// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnsYSrGQZAIl4Am_ASAy6xAX_LHVSzI2A",
  authDomain: "digi-agreements.firebaseapp.com",
  projectId: "digi-agreements",
  storageBucket: "digi-agreements.appspot.com",
  messagingSenderId: "287552582042",
  appId: "1:287552582042:web:cdf3afbcbff6890c040a23",
  measurementId: "G-2C79HF0TKT",
};

console.log("initializing firebase");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
