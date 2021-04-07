import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { Camera } from "expo-camera";
import { useState } from "react";
import { firestore } from "../services/firebase";
import { useDocument } from "react-firebase-hooks/firestore";

export default function CameraViewToggle() {
  const [value, loading, error] = useDocument(firestore.doc("users/111"));
  const setType = (cameraType: string) => {
    value?.ref.set({ cameraType }, { merge: true });
  };
  const type = value?.data()?.settings?.cameraType;

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back,
          );
        }}
      >
        <Text style={styles.text}> Flip </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {},
  button: {},
  text: {},
});
