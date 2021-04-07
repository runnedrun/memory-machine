import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "./Themed";
import CameraViewToggle from "./CameraViewToggle";

export default function TopBar() {
  return (
    <View style={styles.container}>
      <CameraViewToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
