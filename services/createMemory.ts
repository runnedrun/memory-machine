import { data, firestore } from "./firebase";

export default (userId: string, photoUrl: string) => {
  return data.memories.doc().set({
    user: userId,
    photoUrl,
  });
};
