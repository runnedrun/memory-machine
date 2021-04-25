export type ColorData = {
  color: string;
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
  activeMemory?: string;
};
