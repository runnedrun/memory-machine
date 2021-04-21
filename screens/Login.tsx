import * as React from "react";
import firebase from "firebase";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
var provider = new firebase.auth.GoogleAuthProvider();

export default () => {
  const signIn = () => firebase.auth().signInWithPopup(provider);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "darkgrey",
    color: "white",
  },
});
