import { data, getters } from "../services/firebase";
import { Memory } from "../services/datatypes";
import { useCollection } from "react-firebase-hooks/firestore";
import { UserIdContext } from "../contexts/UserIdContext";
import { useContext, useEffect } from "react";
import { singletonHook } from "react-singleton-hook";

const useActiveMemory = (): [
  Memory | undefined,
  string | undefined,
  () => void,
] => {
  const currentUserId = useContext(UserIdContext);
  console.log("currenUSerId", currentUserId);
  if (!currentUserId) return [undefined, undefined, () => {}];
  const [userSettings, memoryIdLoading, memoryIdError] = getters.userSettings(
    currentUserId,
  );
  const activeMemoryId = userSettings?.activeMemory;
  const [activeMemory, id, memoryLoading, memoryError] = getters.memories(
    activeMemoryId,
  );

  const newActiveMemory = () => {
    const newMemoryDoc = data.memories.doc();
    data.userSettings
      .doc(currentUserId)
      .set({ activeMemory: newMemoryDoc.id }, { merge: true });
  };

  useEffect(() => {
    if (!activeMemoryId && !memoryIdLoading && !memoryIdError) {
      newActiveMemory();
    }
  }, [activeMemoryId, memoryIdLoading, memoryIdError]);

  useEffect(() => {
    console.log(
      "running again",
      activeMemory,
      activeMemoryId,
      memoryLoading,
      memoryError,
    );
    if (!activeMemory && !memoryLoading && !memoryError && activeMemoryId) {
      console.log("creating");
      // data.memories.doc(activeMemoryId).set({
      //   userId: currentUserId,
      //   text: "",
      // });
    }
  }, [activeMemory, memoryLoading, memoryError, activeMemoryId]);

  return [activeMemory, activeMemoryId, newActiveMemory];
};

export default singletonHook([undefined, undefined, () => {}], useActiveMemory);
