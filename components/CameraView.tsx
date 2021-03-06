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
import { Pressable } from "react-native";

export default function CameraView({
  children,
  onPhotoTaken,
}: {
  children?: React.Component;
  onPhotoTaken: (a: string) => void;
}) {
  const [hasPermission, setHasPermission] = useState(false);
  const userId = "111";
  const [value, loading, error] = useDocumentData(
    firestore.doc(`users/${userId}`),
  );
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

  let camera: Camera | null;

  const takePicture = async () => {
    const { uri } = await camera?.takePictureAsync();
    onPhotoTaken(uri);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={ref => {
          camera = ref;
        }}
      >
        {children}
      </Camera>
      <View style={styles.shutterContainer}>
        <Pressable
          onPress={() => takePicture()}
          style={styles.shutterButton}
        ></Pressable>
      </View>
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
  shutterContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "none",
  },
  shutterButton: {
    borderRadius: 50,
    backgroundColor: "red",
    width: 50,
    height: 50,
  },
});
