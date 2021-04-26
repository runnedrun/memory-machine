import { data } from "./firebase";

export const setSelectedColor = (userId: string, color: string) =>
  data.userSettings.doc(userId).set(
    {
      selectedColor: color,
    },
    { merge: true },
  );
