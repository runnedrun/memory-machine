export const defaultColor = "transparent";

const colors: Record<string, string> = {
  red: "rgba(255,0,0, .2)",
  blue: "rgba(0,0,255, .2)",
  yellow: "rgba(255,255,0, .2)",
  transparent: "transparent",
};

export const colorList = Object.keys(colors).filter(_ => _ !== "transparent");

export default colors;
