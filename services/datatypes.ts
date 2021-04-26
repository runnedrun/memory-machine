export type ColorData = {
  color: string;
};

export type Memory = {
  icons?: string[];
  photoUrl?: string;
  userId: string;
  text?: string;
  colors?: Record<number, ColorData>;
  active?: boolean;
};

export type Settings = {
  cameraDirection?: string;
  selectedColor?: string;
};
