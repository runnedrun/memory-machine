import * as React from "react";
import { useContext } from "react";
import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { MemoryListNavigationProp } from "../types";
import { data } from "../services/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { Memory } from "../services/datatypes";
import MemoryListItem from "../components/MemoryListItem";
import { UserIdContext } from "../contexts/UserIdContext";

export default function MemoryList({
  navigation,
}: {
  navigation: MemoryListNavigationProp;
  currentUserId: string;
}) {
  const currentUserId = useContext(UserIdContext);

  const [memoriesSnap] = useCollection<Memory>(
    data.memories.where("userId", "==", currentUserId),
  );

  return (
    <View style={styles.container}>
      {memoriesSnap?.docs.map(memorySnap => (
        <MemoryListItem key={memorySnap.id} memory={memorySnap.data()} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  textInput: {
    height: "100%",
    width: "100%",
  },
});
