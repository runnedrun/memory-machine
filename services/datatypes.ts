export type ColorData = {
  color: string;
  depth: number;
};

export type Memory = {
  icons?: string[];
  photoUrl?: string;
  userId: string;
  text?: string;
  colors?: Record<number, ColorData>;
};

export type Settings = {
  cameraDirection?: string;
  selectedColor?: string;
  activeMemory?: string;
};
