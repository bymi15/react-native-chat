import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import Navigation from "./navigation";
import StoreProvider, { AuthContext } from "./store";
import Styles from "./styles/Styles";
import { STORAGE_IMAGE_KEY, STORAGE_USERNAME_KEY } from "./utils/constants";

export default function App() {
  const { signIn } = React.useContext(AuthContext);
  const [isAppLoading, setIsAppLoading] = useState(true);

  const fetchAuthDataFromStorage = async () => {
    const username = (await AsyncStorage.getItem(STORAGE_USERNAME_KEY)) || "";
    const profileImage = (await AsyncStorage.getItem(STORAGE_IMAGE_KEY)) || "";
    if (username) {
      await signIn({ username, profileImage });
    }
  };

  if (isAppLoading) {
    return (
      <AppLoading
        startAsync={fetchAuthDataFromStorage}
        onFinish={() => setIsAppLoading(false)}
        onError={console.warn}
      />
    );
  }

  return (
    <StoreProvider>
      <SafeAreaView style={Styles.container}>
        <Navigation />
        <StatusBar style="auto" />
      </SafeAreaView>
    </StoreProvider>
  );
}
