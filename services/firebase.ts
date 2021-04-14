import firebase from "firebase";
import { Memory } from "./datatypes";
import { useDocumentData } from "react-firebase-hooks/firestore";

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

function buildConverterForType<
  Type
>(): firebase.firestore.FirestoreDataConverter<Type> {
  return {
    toFirestore: (data: Type) => data,
    fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
      snap.data() as Type,
  };
}

export const data = {
  memories: firestore
    .collection("memories")
    .withConverter(buildConverterForType<Memory>()),
};

const buildGetter = <Type>(
  collection: firebase.firestore.CollectionReference<Type>,
) => (id: string) => useDocumentData<Type>(collection.doc(id));

export const getters = {
  memories: buildGetter(data.memories),
};

export default firebase;
