import "react-native-gesture-handler";
import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "./screens/explore";
import MyWorkoutsScreen from "./screens/myWorkouts";
import CalendarScreen from "./screens/calendar";
import NewWorkoutScreen from "./screens/newWorkout";
import ProfileScreen from "./screens/profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "My Workouts") {
            iconName = focused
              ? "dumbbell"
              : "dumbbell";
          } else if (route.name === "Explore") {
            iconName = focused ? "magnify" : "magnify";
          } else if (route.name === "New Workout") {
            iconName = focused ? "arm-flex" : "arm-flex-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar";
          } else if (route.name === "Profile") {
            iconName = focused ? "account" : "account";
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="My Workouts" component={MyWorkoutsScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="New Workout" component={NewWorkoutScreen} />
      {/* <Tab.Screen name="Calendar" component={CalendarScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

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
      <NavigationContainer>
        <MyTabs />
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
  headerImage: {
    width: 26,
    height: 26,
  },
  header: {
    flexDirection: "row",
    gap: 16,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
});
