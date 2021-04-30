import * as React from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { data, getters } from "../services/firebase";
import { View } from "./Themed";
import { UserIdContext } from "../contexts/UserIdContext";
import colorBarColors, { defaultColor } from "../constants/colorBarColors";
import useDebouncedFirebase from "../hooks/useDebouncedFirebase";

const colorBarIncrement = 3;

const ColorBar = ({ memoryId }: { memoryId: string }) => {
  const currentUserId = React.useContext(UserIdContext);
  const [userSettings] = getters.userSettings(currentUserId);
  const [lastColorBucket, setLastColorBucket] = React.useState({
    value: -1,
    time: Date.now(),
  });
  const selectedColor = userSettings?.selectedColor || defaultColor;
  const [memory, setMemory] = useDebouncedFirebase(data.memories.doc(memoryId));
  const [height, setHeight] = React.useState(0);
  const colors = memory?.colors || {};

  const addColorBar = (e: GestureResponderEvent) => {
    const coordinate = e.nativeEvent.locationY;
    const percent = coordinate / height;
    const unbucketed = percent * 100;
    const remainder = unbucketed % colorBarIncrement;
    const bucketed = unbucketed - remainder;

    if (
      bucketed === lastColorBucket.value &&
      Date.now() - lastColorBucket.time < 500
    ) {
      return;
    }

    const existingColorData = colors[bucketed];
    const newDepth =
      selectedColor === existingColorData?.color
        ? Math.min(existingColorData?.depth + 0.1, 1)
        : 0.1;
    const newColorData = {
      depth: newDepth,
      color: selectedColor,
    };

    colors[bucketed] = newColorData;

    setLastColorBucket({ value: bucketed, time: Date.now() });

    setMemory({
      colors: colors,
    });
  };

  return (
    <View
      style={styles.container}
      onResponderGrant={addColorBar}
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
        const depth = colorData.depth;
        const colorCode = colorBarColors[color](depth);
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
