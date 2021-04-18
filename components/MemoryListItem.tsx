import React from "react";
import { Memory } from "../services/datatypes";
import { View, Text, StyleSheet } from "react-native";
import Emoji from "react-native-emoji";
import { LinearGradient } from "expo-linear-gradient";

export default ({ memory }: { memory: Memory }) => {
  const sentiment = 0.1;
  const startDistance = 0.1;
  const stopDistance = 0.4;
  let colors = ["transparent", "rgba(255, 255, 0, .2)"];
  let sentimentAdjustment = (sentiment - 0.5) * 2;
  let stopPoint = 1 - stopDistance * sentimentAdjustment;

  let locations = [stopPoint, 1 - startDistance];

  if (sentiment < 0.5) {
    sentimentAdjustment = (0.5 - sentiment) * 2;
    stopPoint = stopDistance;
    locations = [startDistance, sentimentAdjustment * stopPoint];
    colors = ["rgba(0,0,255, .2)", "transparent"];
  }

  const icons = ["sunny"];

  return (
    <LinearGradient
      style={styles.gradientContainer}
      colors={colors}
      locations={locations}
      start={[0, 0]}
      end={[1, 0]}
    >
      <View style={styles.container}>
        <Text numberOfLines={1} style={styles.text}>
          {memory.text || "..."}
        </Text>
        <View style={styles.icons}>
          {icons.map(icon => (
            <Emoji key={icon} name={icon} />
          ))}
        </View>
      </View>
    </LinearGradient>
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
  },
  icons: {
    flex: 1,
    maxWidth: "50%",
    fontSize: 18,
  },
});
