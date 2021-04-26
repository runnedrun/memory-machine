import * as React from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { data, getters } from "../services/firebase";
import { Memory } from "../services/datatypes";
import { View } from "./Themed";
import { UserIdContext } from "../contexts/UserIdContext";
import colorBarColors, { defaultColor } from "../constants/colorBarColors";

const colorBarIncrement = 5;

const ColorBar = ({
  memoryId,
  memory,
}: {
  memoryId: string;
  memory: Memory;
}) => {
  const currentUserId = React.useContext(UserIdContext);
  const [userSettings] = getters.userSettings(currentUserId);
  const selectedColor = userSettings?.selectedColor || defaultColor;
  const [height, setHeight] = React.useState(0);
  const colors = memory.colors || {};

  const addColorBar = (e: GestureResponderEvent) => {
    const coordinate = e.nativeEvent.locationY;
    const percent = coordinate / height;
    const unbucketed = percent * 100;
    const remainder = unbucketed % colorBarIncrement;
    const bucketed = unbucketed - remainder;

    colors[bucketed] = {
      color: selectedColor,
    };

    data.memories.doc(memoryId).set(
      {
        colors: colors,
      },
      { merge: true },
    );
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onResponderMove={addColorBar}
      onLayout={event => {
        const { height } = event.nativeEvent.layout;
        setHeight(height);
      }}
    >
      {Object.keys(colors).map(strCoordinate => {
        const numCoordinate = Number(strCoordinate);
        const colorData = colors[numCoordinate];
        const color = colorData.color;
        const colorCode = colorBarColors[color];
        const top = height * (numCoordinate / 100);
        const colorBarHeight = height * (colorBarIncrement / 100);

        return (
          <View
            key={strCoordinate}
            style={{
              backgroundColor: colorCode,
              position: "absolute",
              top,
              height: colorBarHeight,
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
    backgroundColor: "white",
  },
  canvas: {
    height: "100%",
    width: "100%",
  },
});

export default ColorBar;
