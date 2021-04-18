import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type TopTabParamList = {
  MemoryList: undefined;
  CreateMemory: undefined;
  SettingsTab: undefined;
  Login: undefined;
};

export type CreateMemoryParamList = {
  root: undefined;
  editMemory: { id: string };
};

export type CreateMemoryNavigationProp = StackNavigationProp<
  CreateMemoryParamList,
  "root"
>;

export type EditMemoryNavigationProp = StackNavigationProp<
  CreateMemoryParamList,
  "editMemory"
>;

export type EditMemoryRouteProp = RouteProp<
  CreateMemoryParamList,
  "editMemory"
>;

export type SettingsTabParamList = {
  root: undefined;
};

export type MemoryListParamList = {
  root: undefined;
};

export type MemoryListNavigationProp = StackNavigationProp<
  MemoryListParamList,
  "root"
>;
