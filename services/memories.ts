import { data } from "./firebase";

export const updateText = (id: string, text: string) => {
  return data.memories.doc(id).set({ text }, { merge: true });
};
