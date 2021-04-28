import { data, firestore } from "./firebase";

export const setSelectedColor = (
  userId: string,
  color: string | firestore.FieldValue,
) =>
  data.userSettings.doc(userId).set(
    {
      selectedColor: color,
    },
    { merge: true },
  );
