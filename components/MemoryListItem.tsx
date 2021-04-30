import React from "react";
import { Memory } from "../services/datatypes";
import { View, Text, StyleSheet } from "react-native";
import Emoji from "react-native-emoji";
import { LinearGradient } from "expo-linear-gradient";
import colorBarColors from "../constants/colorBarColors";

function average(nums: number[]) {
  return nums.reduce((a, b) => a + b) / nums.length;
}

export default ({ memory }: { memory: Memory }) => {
  const uniqIcons = Array.from(new Set(memory.icons || []));
  const colorMap = memory.colors || {};
  const colorDepths = Object.keys(colorMap).reduce<Record<string, number[]>>(
    (colorDepths: Record<string, number[]>, coord: string) => {
      const colorData = colorMap[Number(coord)];
      const color = colorData.color;
      colorDepths[color] = colorDepths[color] || [];
      colorDepths[color].push(colorData.depth);
      return colorDepths;
    },
    {},
  );

  const colorDepthAverages = Object.keys(colorDepths).reduce<
    Record<string, number>
  >((avgs, color) => {
    const depths = colorDepths[color];
    avgs[color] = average(depths);
    return avgs;
  }, {});

  console.log("av", colorDepthAverages);

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.text}>
        {memory.text || "..."}
      </Text>
      <View style={styles.icons}>
        {uniqIcons.slice(0, 2).map(icon => (
          <Emoji
            key={icon}
            name={icon}
            style={{ fontSize: 25, lineHeight: 25 }}
          />
        ))}
      </View>
      <View style={styles.colorIconsContainer}>
        {Object.keys(colorDepthAverages)
          .slice(0, 2)
          .map(color => {
            const depth = colorDepthAverages[color];
            return (
              <View
                key={color}
                style={[
                  {
                    backgroundColor: colorBarColors[color](depth),
                  },
                  styles.colorIcon,
                ]}
              ></View>
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    width: "100%",
    marginBottom: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  text: {
    flex: 1,
    fontSize: 18,
    marginRight: 20,
  },
  icons: {
    flexGrow: 0,
    maxWidth: "50%",
    fontSize: 18,
    marginRight: 20,
  },
  colorIconsContainer: {
    display: "flex",
    flexDirection: "row",
    flexShrink: 0,
  },
  colorIcon: {
    borderRadius: 50,
    height: 25,
    width: 25,
    marginRight: 5,
  },
});
