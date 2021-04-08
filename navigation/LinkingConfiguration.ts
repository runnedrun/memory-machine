import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          CreateMemory: {
            screens: {
              root: "create",
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
