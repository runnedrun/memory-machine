import { data, getters } from "../services/firebase";
import { Memory } from "../services/datatypes";
import { useContext } from "react";
import { UserIdContext } from "../contexts/UserIdContext";

export default (): [Memory | undefined, string | undefined] => {
  const currentUserId = useContext(UserIdContext);
  const [userSettings, memoryIdLoading, memoryIdError] = getters.userSettings(
    currentUserId,
  );
  const activeMemoryId = userSettings?.activeMemory;
  const [activeMemory, memoryLoading, memoryError] = getters.memories(
    activeMemoryId,
  );

  console.log("meme", activeMemoryId);

  if (!activeMemoryId && !memoryIdLoading && !memoryIdError) {
    const newMemoryDoc = data.memories.doc();
    data.userSettings
      .doc(currentUserId)
      .set({ activeMemory: newMemoryDoc.id }, { merge: true });
  }

  console.log("mloading", memoryLoading, activeMemory, activeMemoryId);
  if (!activeMemory && !memoryLoading && !memoryError && activeMemoryId) {
    console.log("creating moemeor", memoryIdLoading);
    // data.memories.doc(activeMemoryId).set({
    //   userId: currentUserId,
    //   text: "",
    // });
  }

  return [activeMemory, activeMemoryId];
};
