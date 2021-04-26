import { data } from "../services/firebase";
import { Memory } from "../services/datatypes";
import { useCollection } from "react-firebase-hooks/firestore";
import { UserIdContext } from "../contexts/UserIdContext";
import { useContext } from "react";

export default (): [Memory | undefined, string | undefined] => {
  const currentUserId = useContext(UserIdContext);
  const [querySnapshot, loading] = useCollection<Memory>(
    data.memories.where("active", "==", true),
  );

  const activeMemory = querySnapshot?.docs[0];

  if (!loading && !activeMemory) {
    console.log("creating new mem");
    data.memories.doc().set({
      active: true,
      userId: currentUserId,
    });
  }

  return [activeMemory?.data(), activeMemory?.id];
};
