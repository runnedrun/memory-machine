import { useDocumentData, useDocument } from "react-firebase-hooks/firestore";
import { View, Image } from "react-native";
import { getters } from "../services/firebase";
import { Memory } from "../services/datatypes";

const MemoryView = async ({ memoryId }) => {
  const [memory] = getters.memories(memoryId);
  const photoUrl =

  if (photoUrl) {

  }

  return (
    <View>
      <Image source={memory.photoUrl}></Image>
    </View>
  );
};

export default MemoryView;
