// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWP2IuLMGphvlrqLUzlcaIUDXQIhtwAUM",
  authDomain: "maritime-a13c4.firebaseapp.com",
  projectId: "maritime-a13c4",
  storageBucket: "maritime-a13c4.appspot.com",
  messagingSenderId: "1008027151952",
  appId: "1:1008027151952:web:57a692f4f176a8dfceeb55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage=getStorage(app)
export default storage
