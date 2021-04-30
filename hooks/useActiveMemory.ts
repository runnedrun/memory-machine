import { data, getters } from "../services/firebase";
import { Memory } from "../services/datatypes";
import { UserIdContext } from "../contexts/UserIdContext";
import { useContext, useEffect } from "react";

const useActiveMemory = ({
  createIfNotExist,
}: {
  createIfNotExist?: Boolean;
} = {}): [Memory | undefined, string | undefined, () => void] => {
  const currentUserId = useContext(UserIdContext);
  if (!currentUserId) return [undefined, undefined, () => {}];
  const [
    userSettings,
    userId,
    memoryIdLoading,
    memoryIdError,
  ] = getters.userSettings(currentUserId);
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
    if (
      !activeMemoryId &&
      !memoryIdLoading &&
      !memoryIdError &&
      createIfNotExist
    ) {
      newActiveMemory();
    }
  }, [activeMemoryId, memoryIdLoading, memoryIdError, createIfNotExist]);

  useEffect(() => {
    if (
      !activeMemory &&
      !memoryLoading &&
      !memoryError &&
      activeMemoryId &&
      createIfNotExist
    ) {
      data.memories.doc(activeMemoryId).set({
        userId: currentUserId,
        text: "",
      });
    }
  }, [
    activeMemory,
    memoryLoading,
    memoryError,
    activeMemoryId,
    createIfNotExist,
  ]);

  return [activeMemory, activeMemoryId, newActiveMemory];
};

export default useActiveMemory;
