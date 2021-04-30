export const defaultColor = "transparent";

const buildColorFunction = (decimal: string) => (depth: number) =>
  `rgba(${decimal},${depth})`;

const colors: Record<string, (depth: number) => string> = {
  red: buildColorFunction("255,0,0"),
  blue: buildColorFunction("0,0,255"),
  yellow: buildColorFunction("255,255,0"),
  purple: buildColorFunction("255,0,255"),
  transparent: () => "transparent",
};

export const colorList = Object.keys(colors).filter(_ => _ !== "transparent");

export default colors;
