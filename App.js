import "react-native-gesture-handler";
import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/home";
import About from "./screens/home";
import ReviewDetails from "./screens/reviewDetails";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {/* <Home /> */}
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  text: {
    fontFamily: "roboto-regular",
    fontSize: 18,
  },
});
