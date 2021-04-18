import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { View, Text } from "react-native";
import MemoryView from "../components/MemoryView";
import firebase from "firebase";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import useCurrentUserId from "../hooks/useCurrentUserId";
import CreateMemory from "../screens/CreateMemory";
import Login from "../screens/Login";
import MemoryList from "../screens/MemoryList";
import {
  TopTabParamList,
  CreateMemoryParamList,
  SettingsTabParamList,
  MemoryListParamList,
} from "../types";

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

const EmptyTabBar = () => {
  return <View></View>;
};

export default function TopTabNavigator() {
  const colorScheme = useColorScheme();
  const [user, loading] = useAuthState(firebase.auth());

  let routes = (
    <>
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
    </>
  );

  if (!user && !loading) {
    routes = (
      <>
        <TopTab.Screen name="Login" component={Login} options={{}} />
      </>
    );
  }

  return (
    <TopTab.Navigator
      initialRouteName="CreateMemory"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      tabBar={() => <EmptyTabBar></EmptyTabBar>}
    >
      {routes}
    </TopTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const CreateMemoryStack = createStackNavigator<CreateMemoryParamList>();

function CreateMemoryNavigator() {
  return (
    <CreateMemoryStack.Navigator headerMode="none">
      <CreateMemoryStack.Screen name="root" component={CreateMemory} />
      <CreateMemoryStack.Screen name="editMemory" component={MemoryView} />
    </CreateMemoryStack.Navigator>
  );
}

const SettingsTabStack = createStackNavigator<SettingsTabParamList>();

function SettingsTabNavigator() {
  return (
    <SettingsTabStack.Navigator headerMode="none">
      <SettingsTabStack.Screen name="root" component={CreateMemory} />
    </SettingsTabStack.Navigator>
  );
}

const MemoryListStack = createStackNavigator<MemoryListParamList>();

function MemoryListNavigator() {
  return (
    <MemoryListStack.Navigator headerMode="none">
      <MemoryListStack.Screen name="root" component={MemoryList} />
    </MemoryListStack.Navigator>
  );
}
