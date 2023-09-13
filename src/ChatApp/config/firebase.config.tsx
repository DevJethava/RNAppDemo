import { getApp, getApps, initializeApp } from 'firebase/app'
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyC926wjN66jxLDm3MJ-zjYkKQW-a1QktPA",
    authDomain: "rnpractice-9790b.firebaseapp.com",
    projectId: "rnpractice-9790b",
    storageBucket: "rnpractice-9790b.appspot.com",
    messagingSenderId: "666668137586",
    appId: "1:666668137586:web:a2d67678899edda442d6eb",
    measurementId: "G-V41XMJ4L6R"
};

const firebaseApp = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const firebaseAuth = getAuth(firebaseApp)
const firestoreDB = getFirestore(firebaseApp)

export { firebaseApp, firebaseAuth, firestoreDB }