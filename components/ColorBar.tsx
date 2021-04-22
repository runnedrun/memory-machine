import * as React from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Memory } from "../services/datatypes";
import { View } from "./Themed";

const ColorBar = ({
  memoryId,
  memory,
}: {
  memoryId: string;
  memory: Memory;
}) => {
  const colors = memory.colors || [];

  const addColorBar = (e: GestureResponderEvent) => {
    const start = e.nativeEvent.locationY;
    console.log("native", e, start);
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onResponderMove={addColorBar}
    >
      {colors.map(colorData => {
        const color = colorData.color;
        const barHeight = colorData.end - colorData.start;

        return (
          <View
            style={{
              backgroundColor: color,
              position: "absolute",
              top: colorData.start,
              height: barHeight,
              width: "100%",
            }}
          ></View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: "grey",
  },
});

export default ColorBar;
