import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Login: "login",
          CreateMemory: {
            screens: {
              root: "create",
              editMemory: "edit",
            },
          },
          SettingsTab: {
            screens: {
              root: "settings",
            },
          },
          MemoryList: {
            screens: {
              root: "list",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
