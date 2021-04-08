import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import CreateMemory from "../screens/CreateMemory";
import {
  TopTabParamList,
  CreateMemoryParamList,
  SettingsTabParamList,
  MemoryListParamList,
} from "../types";

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

export default function TopTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <TopTab.Navigator
      initialRouteName="CreateMemory"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <TopTab.Screen
        name="MemoryList"
        component={MemoryListNavigator}
        options={{}}
      />
      <TopTab.Screen
        name="CreateMemory"
        component={CreateMemoryNavigator}
        options={{}}
      />
      <TopTab.Screen
        name="SettingsTab"
        component={SettingsTabNavigator}
        options={{}}
      />
    </TopTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const CreateMemoryStack = createStackNavigator<CreateMemoryParamList>();

function CreateMemoryNavigator() {
  return (
    <CreateMemoryStack.Navigator>
      <CreateMemoryStack.Screen name="root" component={CreateMemory} />
    </CreateMemoryStack.Navigator>
  );
}

const SettingsTabStack = createStackNavigator<SettingsTabParamList>();

function SettingsTabNavigator() {
  return (
    <SettingsTabStack.Navigator>
      <SettingsTabStack.Screen name="root" component={CreateMemory} />
    </SettingsTabStack.Navigator>
  );
}

const MemoryListStack = createStackNavigator<MemoryListParamList>();

function MemoryListNavigator() {
  return (
    <MemoryListStack.Navigator>
      <MemoryListStack.Screen name="root" component={CreateMemory} />
    </MemoryListStack.Navigator>
  );
}
