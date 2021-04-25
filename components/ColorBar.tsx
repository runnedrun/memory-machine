import * as React from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { data } from "../services/firebase";
import { Memory } from "../services/datatypes";
import { View } from "./Themed";
import { Platform } from "react-native";
import { ScreenStackHeaderRightView } from "react-native-screens";

const Canvas =
  Platform.OS === "web" ? null : require("react-native-canvas").Canvas;

const colorBarIncrement = 5;

const ColorBar = ({
  memoryId,
  memory,
}: {
  memoryId: string;
  memory: Memory;
}) => {
  const [height, setHeight] = React.useState(0);
  const colors = memory.colors || {};

  const addColorBar = (e: GestureResponderEvent) => {
    const coordinate = e.nativeEvent.locationY;
    const percent = coordinate / height;
    const unbucketed = percent * 100;
    const remainder = unbucketed % colorBarIncrement;
    const bucketed = unbucketed - remainder;

    colors[bucketed] = {
      color: "red",
    };

    data.memories.doc(memoryId).set(
      {
        colors: colors,
      },
      { merge: true },
    );
  };

  const handleCanvas = (canvas: any) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    console.log("ehgiht", height);
    const colorBarHeight = (height / 100) * colorBarIncrement;
    Object.keys(colors).map(strCoordinate => {
      const numCoordinate = Number(strCoordinate);
      const colorData = colors[numCoordinate];
      const color = colorData.color;
      const top = height * (numCoordinate / 100);
      console.log("what?", height, color, strCoordinate);
      ctx.fillStyle = color;
      ctx.fillRect(0, top, width, colorBarHeight);
    });
  };

  const canvasEl = Canvas ? (
    <Canvas ref={handleCanvas} style={styles.canvas} />
  ) : (
    <canvas ref={handleCanvas} style={{ height: "100%", width: "100%" }} />
  );

  // const canvasEl =
  //   Platform.OS === "web" ? (
  //     <canvas ref={handleCanvas} />
  //   ) : (
  //     <Canvas ref={handleCanvas} />
  //   );

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
      {canvasEl}
      {/* {Object.keys(colors).map(strCoordinate => {
        const numCoordinate = Number(strCoordinate);
        const colorData = colors[numCoordinate];
        const color = colorData.color;
        const top = height * (numCoordinate / 100);
        console.log("what?", height, color, strCoordinate);

        return (
          <View
            key={strCoordinate}
            style={{
              backgroundColor: color,
              position: "absolute",
              top,
              height: colorBarHeight,
              width: "100%",
            }}
          ></View>
        );
      })} */}
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
