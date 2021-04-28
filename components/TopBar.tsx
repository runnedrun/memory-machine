import * as React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "./Themed";
import emojis from "../constants/Emojis";
import Emoji from "react-native-emoji";
import { addIcon } from "../services/memories";
import { setSelectedColor } from "../services/userSettings";
import useCurrentUser from "../hooks/useCurrentUser";
import { getters, firestore } from "../services/firebase";
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
        const isSelected = currentlySelectedColor === color;
        const setColor = () => {
          const colorToSet = isSelected ? firestore.FieldValue.delete() : color;
          setSelectedColor(currentUserId, colorToSet);
        };
        const selectedStyle = isSelected ? { borderWidth: 2 } : {};
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

export default function TopBar({
  memoryId,
  triggerSave,
}: {
  memoryId: string;
  triggerSave: () => void;
}) {
  return (
    <View style={styles.container}>
      <EmojiBar memoryId={memoryId}></EmojiBar>
      <TouchableOpacity style={styles.saveButton} onPress={triggerSave}>
        <Text style={styles.saveText}>+</Text>
      </TouchableOpacity>
      <ColorsBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  saveText: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: 28,
  },
  saveButton: {
    height: 35,
    width: 35,
    borderRadius: 50,
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  emojiContainer: {
    display: "flex",
    flexDirection: "row",
    overflow: "scroll",
  },
  emoji: {
    fontSize: 40,
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
