import * as React from "react";
import { StyleSheet } from "react-native";

import CameraView from "../components/CameraView";
import { Text, View } from "../components/Themed";
import Topbar from "../components/TopBar";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { data } from "../services/firebase";

export default function CreateMemory() {
  const [memoryId, setMemoryId] = useState();
  const [existingMemory] = memoryId
    ? useDocumentData(data.memories.doc(memoryId))
    : [];

  if (existingMemory) {
  }

  return (
    <View style={styles.container}>
      <Topbar></Topbar>
      <CameraView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
