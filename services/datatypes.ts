export type ColorData = {
  start: number;
  end: number;
  color: string;
};

export type Memory = {
  icons?: string[];
  photoUrl?: string;
  userId: string;
  text?: string;
  colors?: ColorData[];
};

export type Settings = {
  cameraDirection?: string;
  activeMemory?: string;
};
