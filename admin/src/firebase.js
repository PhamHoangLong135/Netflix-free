import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBv-bKx2VqLLxBpxFROvHq9hkVOPNAMdNA",
  authDomain: "neflix-b5979.firebaseapp.com",
  projectId: "neflix-b5979",
  storageBucket: "neflix-b5979.appspot.com",
  messagingSenderId: "697989729092",
  appId: "1:697989729092:web:e6795fd08b1b066f07e511",
  measurementId: "G-P062BKNXD3",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
