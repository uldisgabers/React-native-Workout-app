import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { globalStyles } from "../styles/global";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ReviewDetails from "./reviewDetails";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [reviews, setReviews] = useState([
    {
      title: "Zelda, Breath of Fresh Air",
      rating: 5,
      body: "lorem ipsum",
      key: "1",
    },
    {
      title: "Gotta Catch Them All (again)",
      rating: 4,
      body: "lorem ipsum",
      key: "2",
    },
    {
      title: 'Not So "Final" Fantasy',
      rating: 3,
      body: "lorem ipsum",
      key: "3",
    },
  ]);

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ReviewDetails", item)}
          >
            <Text style={globalStyles.titleText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerMode: "screen",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "tomato" },
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "GameZone",
          }}
        />
        <Stack.Screen
          name="ReviewDetails"
          component={ReviewDetails}
          options={{ headerStyle: { backgroundColor: "green" } }}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
