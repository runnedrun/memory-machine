import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { useState, useEffect } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../services/firebase";

export default function CameraView() {
  const [hasPermission, setHasPermission] = useState(false);
  const [value, loading, error] = useDocumentData(firestore.doc("users/111"));
  const type = value?.settings?.cameraType;

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}></Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // width: 150,
    alignSelf: "stretch",
  },
  camera: {
    flex: 1,
    alignSelf: "stretch",
  },
});
