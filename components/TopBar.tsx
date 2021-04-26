import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "./Themed";
import emojis from "../constants/Emojis";
import Emoji from "react-native-emoji";
import { addIcon } from "../services/memories";
import { setSelectedColor } from "../services/userSettings";
import useCurrentUser from "../hooks/useCurrentUser";
import { getters } from "../services/firebase";
import { colorList } from "../constants/colorBarColors";
import { TouchableOpacity } from "react-native";

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

const ColorsBar = () => {
  const currentUserId = useCurrentUser();
  const [settings] = getters.userSettings(currentUserId);
  const currentlySelectedColor = settings?.selectedColor;

  return (
    <View style={styles.colorsContainer}>
      {colorList.map(color => {
        console.log("run", color);
        const setColor = () => setSelectedColor(currentUserId, color);
        const selectedStyle =
          currentlySelectedColor === color ? { borderWidth: 5 } : {};
        console.log("selec", selectedStyle, currentlySelectedColor);
        return (
          <TouchableOpacity
            style={{
              borderRadius: 50,
              width: 20,
              height: 20,
              marginRight: 10,
              ...selectedStyle,
              backgroundColor: color,
            }}
            onPress={setColor}
            key={color}
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
      <ColorsBar />
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
  colorsContainer: {
    display: "flex",
    flexDirection: "row",
    overflow: "scroll",
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  colorSelector: {},
});
