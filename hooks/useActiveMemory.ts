import { data, getters } from "../services/firebase";
import { Memory } from "../services/datatypes";
import { useContext } from "react";
import { UserIdContext } from "../contexts/UserIdContext";

export default (): [Memory | undefined, string | undefined] => {
  const currentUserId = useContext(UserIdContext);
  const [userSettings, loading, error] = getters.userSettings(currentUserId);
  const activeMemoryId = userSettings?.activeMemory;
  const [activeMemory] = getters.memories(activeMemoryId);

  console.log("meme", activeMemoryId);

  if (!activeMemoryId && !loading && !error) {
    const newMemoryDoc = data.memories.doc();
    console.log("creating new active");
    Promise.all([
      data.userSettings
        .doc(currentUserId)
        .set({ activeMemory: newMemoryDoc.id }, { merge: true }),

      newMemoryDoc.set({
        userId: currentUserId,
        text: "",
      }),
    ]);
  }

  return [activeMemory, activeMemoryId];
};
