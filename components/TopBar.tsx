import * as React from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { View } from "./Themed";
import emojis from "../constants/Emojis";
import Emoji from "react-native-emoji";
import { addIcon } from "../services/memories";

const EmojiBar = ({ memoryId }: { memoryId: string }) => {
  return (
    <View style={styles.emojiContainer}>
      {emojis.map(icon => {
        const addEmoji = () => addIcon(memoryId, icon);
        return (
          <Emoji
            style={{ fontSize: 25, marginRight: 8 }}
            onPress={addEmoji}
            key={icon}
            name={icon}
          />
        );
      })}
    </View>
  );
};

export default function TopBar({ memoryId }: { memoryId: string }) {
  return (
    <View style={styles.container}>
      <EmojiBar memoryId={memoryId}></EmojiBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  emojiContainer: {
    display: "flex",
    flexDirection: "row",
    overflow: "scroll",
  },
  emoji: {
    fontSize: 50,
  },
});
