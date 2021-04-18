import { data, getters } from "../services/firebase";
import { Memory } from "../services/datatypes";

const currentUserId = "111";
export default (): [Memory | undefined, string | undefined] => {
  const [userSettings, loading, error] = getters.userSettings(currentUserId);
  const activeMemoryId = userSettings?.activeMemory;
  const [activeMemory] = getters.memories(activeMemoryId);

  console.log("meme", activeMemoryId);

  if (!activeMemoryId && !loading && !error) {
    const newMemoryId = data.memories.doc().id;
    console.log("creating new active", newMemoryId);
    data.userSettings
      .doc(currentUserId)
      .set({ activeMemory: newMemoryId }, { merge: true });
  }

  return [activeMemory, activeMemoryId];
};
