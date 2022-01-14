import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBzRYpbkjt8OwhTHezHTMXCrDbVzgMYf0M",
  authDomain: "neflix123-93fab.firebaseapp.com",
  projectId: "neflix123-93fab",
  storageBucket: "neflix123-93fab.appspot.com",
  messagingSenderId: "409328090325",
  appId: "1:409328090325:web:f9e1614500172dc7b6f65c",
  measurementId: "G-3X25PVHK0C"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
