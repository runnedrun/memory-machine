import { data } from "./firebase";

export default (userId: string, photoUrl: string) => {
  const ref = data.memories.doc();
  return ref
    .set({
      userId,
      photoUrl,
    })
    .then(() => ref.id);
};
