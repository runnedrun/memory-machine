import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { TextInput, Text } from "react-native";
import useActiveMemory from "../hooks/useActiveMemory";
import { updateText } from "../services/memories";
import TopBar from "../components/TopBar";
import Emoji from "react-native-emoji";
import ColorBar from "../components/ColorBar";

export default function CreateMemory({
  editable = true,
}: {
  editable: Boolean;
}) {
  const [activeMemory, activeMemoryId] = useActiveMemory();

  if (!activeMemoryId || !activeMemory) {
    return <View />;
  }

  let textView;
  if (editable) {
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

  const icons = activeMemory.icons || [];
  icons.reverse();

  return (
    <View style={styles.container}>
      <View style={styles.emojiContainer}>
        {icons.map((icon, i) => {
          return (
            <View key={i} style={styles.singleEmojiContainer}>
              <Emoji style={{ fontSize: 25 }} name={icon} />
            </View>
          );
        })}
      </View>
      <View style={styles.textAndTopBarContainer}>
        <View style={styles.topbarContainer}>
          <TopBar memoryId={activeMemoryId}></TopBar>
        </View>
        {textView}
      </View>
      <View style={styles.otherSection}>
        <ColorBar memory={activeMemory} memoryId={activeMemoryId}></ColorBar>
      </View>
    </View>
  );
}

const sideSectionWidth = 40;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  textAndTopBarContainer: {
    flexGrow: 1,
    height: "100%",
  },
  textInput: {
    height: "100%",
    width: "100%",
  },
  topbarContainer: {
    marginBottom: 10,
    marginTop: 10,
    border: "0px 2px 2px 2px",
    borderColor: "black",
    borderRadius: 5,
  },
  emojiContainer: {
    paddingLeft: 5,
    paddingTop: 10,
    height: "100%",
    width: sideSectionWidth,
    overflow: "scroll",
  },
  singleEmojiContainer: {
    marginBottom: 10,
  },
  otherSection: { width: sideSectionWidth },
});
