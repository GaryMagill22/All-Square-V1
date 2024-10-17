// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFunctions, connectFunctionsEmulator} from 'firebase/functions';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlxvlcTeZ4GVywmVbFdn6r1AWySEkgBco",
  authDomain: "reactnativegolfapp.firebaseapp.com",
  projectId: "reactnativegolfapp",
  storageBucket: "reactnativegolfapp.appspot.com",
  messagingSenderId: "466683770848",
  appId: "1:466683770848:web:91cc0133b6286202235d85"
};




// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

if (process.env.NODE_ENV === 'development') {
  const functions = getFunctions(FIREBASE_APP);
  connectFunctionsEmulator(functions, 'localhost', 8080);
}