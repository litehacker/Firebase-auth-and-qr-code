import Constants from "expo-constants";
import { Platform } from "react-native";

const localhost = Platform.OS === "ios" ? "localhost:8080" : "10.0.2.2:8080";

const ENV = {
  dev: {
    apiKey: "AIzaSyBf-aoO7hEomw1hMKoQ0AEoY92IOjl-Ris",
    authDomain: "lift-os.firebaseapp.com",
    projectId: "lift-os",
    storageBucket: "lift-os.appspot.com",
    messagingSenderId: "1060683584981",
    appId: "1:1060683584981:web:7d6a3bd584f00965f8995c",
    measurementId: "G-3K2ZBZ9XY2",
  },
  staging: {
    apiKey: "AIzaSyBf-aoO7hEomw1hMKoQ0AEoY92IOjl-Ris",
    authDomain: "lift-os.firebaseapp.com",
    projectId: "lift-os",
    storageBucket: "lift-os.appspot.com",
    messagingSenderId: "1060683584981",
    appId: "1:1060683584981:web:7d6a3bd584f00965f8995c",
    measurementId: "G-3K2ZBZ9XY2",
  },
  prod: {
    apiKey: "AIzaSyBf-aoO7hEomw1hMKoQ0AEoY92IOjl-Ris",
    authDomain: "lift-os.firebaseapp.com",
    projectId: "lift-os",
    storageBucket: "lift-os.appspot.com",
    messagingSenderId: "1060683584981",
    appId: "1:1060683584981:web:7d6a3bd584f00965f8995c",
    measurementId: "G-3K2ZBZ9XY2",
  },
};

export const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.

  // if (__DEV__) {
  //   return ENV.dev;
  // } else if (env === "staging") {
  //   return ENV.staging;
  // } else if (env === "prod") {
  //   return ENV.prod;
  // }

  return ENV.dev;
};
