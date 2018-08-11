import firebase from 'firebase/app'
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "intro-to-javascript-c1baa.firebaseapp.com",
  databaseURL: "https://intro-to-javascript-c1baa.firebaseio.com",
  projectId: "intro-to-javascript-c1baa",
  storageBucket: "intro-to-javascript-c1baa.appspot.com",
  messagingSenderId: "907816594906"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore()
firestore.settings({
  timestampsInSnapshots: true
})

export default firebase
