import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkv-oQSP1oMdpA_GiPEI4TDhDOQhf1HUk",
  authDomain: "simple-notes-firebase0.firebaseapp.com",
  databaseURL: "https://simple-notes-firebase0.firebaseio.com",
  projectId: "simple-notes-firebase0",
  storageBucket: "simple-notes-firebase0.appspot.com",
  messagingSenderId: "882420322034",
  appId: "1:882420322034:web:dccb41963803232c4d4a6b",
  measurementId: "G-9FMMTLKK75"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = firebase.database();

export default firebase; 