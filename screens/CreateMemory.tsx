import * as React from "react";
import { StyleSheet } from "react-native";

import CameraView from "../components/CameraView";
import { Text, View } from "../components/Themed";
import Topbar from "../components/TopBar";

export default function CreateMemory() {
  return (
    <View style={styles.container}>
      <Topbar></Topbar>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
