import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDAtCTUhL_22DRLMbAGE9igcg3fEXWzTxQ",
  authDomain: "memory-machine-c8497.firebaseapp.com",
  projectId: "memory-machine-c8497",
  storageBucket: "memory-machine-c8497.appspot.com",
  messagingSenderId: "336160323134",
  appId: "1:336160323134:web:249a91f83832fa77e7436f",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export default firebase;
