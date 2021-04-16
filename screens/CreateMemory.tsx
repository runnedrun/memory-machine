import * as React from "react";
import { StyleSheet } from "react-native";

import CameraView from "../components/CameraView";
import { View } from "../components/Themed";
import Topbar from "../components/TopBar";
import firebase from "firebase";
import { CreateMemoryNavigationProp } from "../types";
import { v4 as uuidv4 } from "uuid";
import createMemory from "../services/createMemory";
import { useState } from "react";

export default function CreateMemory({
  navigation,
}: {
  navigation: CreateMemoryNavigationProp;
}) {
  const userId = "111";

  const [isActive, setIsActive] = useState(false);

  navigation.addListener("blur", () => setIsActive(false));
  navigation.addListener("focus", () => setIsActive(true));

  const uploadPhotoAndCreateMemory = (uri: string) => {
    const ref = firebase
      .storage()
      .ref("user-images")
      .child(userId)
      .child(`${uuidv4()}`);

    const dataType = uri.includes("data:image") ? "data_url" : undefined;
    ref.putString(uri, dataType);
    createMemory(userId, ref.fullPath).then(id => {
      navigation.navigate("editMemory", { id });
    });
  };

  let view = isActive ? (
    <View style={styles.container}>
      <Topbar></Topbar>
      <CameraView onPhotoTaken={uploadPhotoAndCreateMemory} />
    </View>
  ) : (
    <View></View>
  );

  return <View style={styles.container}>{view}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
