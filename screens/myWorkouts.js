import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutPlayer from "./workoutPlayer";

const Stack = createNativeStackNavigator();

const MyWorkoutsScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllWorkouts"
        component={AllWorkouts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WorkoutPlayer"
        component={WorkoutPlayer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AllWorkouts = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [workoutData, setWorkoutData] = useState([]);

  const getWorkoutData = async () => {
    try {
      const response = await fetch("http://172.27.208.1:3001/workouts", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setWorkoutData(json.workouts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getWorkoutData();
  // }, []);

  useFocusEffect(() => {
    getWorkoutData();
  });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={workoutData}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              navigation.navigate("WorkoutPlayer");
            }}
          >
            <Text>{item.workoutName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1 / 2,
    backgroundColor: "#64ad6a",
    margin: 5,
    padding: 15,
    borderRadius: 6,
  },
});

export default MyWorkoutsScreen;
