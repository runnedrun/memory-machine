import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { View, Text } from "react-native";
import MemoryView from "../components/MemoryView";
import firebase from "firebase";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import CreateMemory from "../screens/CreateMemory";
import Login from "../screens/Login";
import MemoryList from "../screens/MemoryList";
import {
  TopTabParamList,
  CreateMemoryParamList,
  SettingsTabParamList,
  MemoryListParamList,
} from "../types";

import { UserIdContextProvider } from "../contexts/UserIdContext";

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

const EmptyTabBar = () => {
  return <View></View>;
};

const Navigator = ({ children }) => {
  const colorScheme = useColorScheme();
  return (
    <TopTab.Navigator
      initialRouteName="CreateMemory"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      tabBar={() => <EmptyTabBar></EmptyTabBar>}
    >
      {children}
    </TopTab.Navigator>
  );
};

export default function TopTabNavigator() {
  const [user, loading] = useAuthState(firebase.auth());

  if (!loading) {
    if (!user) {
      return (
        <Navigator>
          <TopTab.Screen name="Login" component={Login} options={{}} />
        </Navigator>
      );
    }

    return (
      <UserIdContextProvider value={"112"}>
        <Navigator>
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
        </Navigator>
      </UserIdContextProvider>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
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
