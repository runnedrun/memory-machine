import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { TextInput, Text } from "react-native";
import { CreateMemoryNavigationProp } from "../types";
import { useState } from "react";
import useActiveMemory from "../hooks/useActiveMemory";
import { updateText } from "../services/memories";

export default function CreateMemory({
  navigation,
  editable = true,
}: {
  navigation: CreateMemoryNavigationProp;
  editable: Boolean;
}) {
  const [activeMemory, activeMemoryId] = useActiveMemory();

  let textView = <View />;
  if (editable && activeMemory) {
    textView = (
      <TextInput
        style={styles.textInput}
        multiline={true}
        onChangeText={text =>
          activeMemoryId && updateText(activeMemoryId, text)
        }
        value={activeMemory?.text}
        blurOnSubmit
        placeholder="What's on your mind"
      />
    );
  } else {
    textView = <Text>{activeMemory?.text}</Text>;
  }

  return <View style={styles.container}>{textView}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  textInput: {
    height: "100%",
    width: "100%",
  },
});
