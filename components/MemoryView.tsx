import { useDocumentData, useDocument } from "react-firebase-hooks/firestore";
import { View, Image, Text } from "react-native";
import { getters } from "../services/firebase";
import { Memory } from "../services/datatypes";
import { StyleSheet } from "react-native";
import * as React from "react";
import { EditMemoryRouteProp } from "../types";
import { useDownloadURL } from "react-firebase-hooks/storage";
import firebase from "firebase";

const MemoryView = ({ route }: { route: EditMemoryRouteProp }) => {
  const id = route.params.id;
  const [memory] = getters.memories(id);
  const photoUrl = memory?.photoUrl;
  const text = memory?.text;
  const [downloadUrl] = useDownloadURL(
    photoUrl ? firebase.storage().ref(photoUrl) : null,
  );

  let photoDisplay = <View></View>;
  if (downloadUrl) {
    photoDisplay = (
      <View style={styles.photoDisplayContainer}>
        <Image
          style={styles.photoDisplay}
          source={{ uri: downloadUrl }}
        ></Image>
      </View>
    );
  }
  let textDisplay = <View></View>;
  if (text) {
    textDisplay = (
      <View style={styles.textDisplayContainer}>
        <Text>{text}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {photoDisplay}
      {textDisplay}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "red",
  },
  photoDisplay: {
    flex: 1,
    alignSelf: "stretch",
  },
  photoDisplayContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    display: "flex",
  },
  textDisplay: {
    width: "40%",
    maxHeight: "80%",
  },
  textDisplayContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});

export default MemoryView;
