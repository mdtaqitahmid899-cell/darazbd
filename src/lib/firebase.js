import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration using environment variables
const firebaseConfig = {
    apiKey: "AIzaSyBWLAki7U5DJq39Hd-3BeGyhdozcj3fSAw",
    authDomain: "daraz-bd-8584b.firebaseapp.com",
    projectId: "daraz-bd-8584b",
    storageBucket: "daraz-bd-8584b.firebasestorage.app",
    messagingSenderId: "354504884461",
    appId: "1:354504884461:web:2320a16c9a50ffdbe1cce4",
    measurementId: "G-LYBF8J1DXC"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Analytics (client-side only)
let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { db, auth, analytics };
