import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const MyWorkoutsScreen = () => {
  const [workoutData, setWorkoutData] = useState([]);

  async function getWorkoutData() {
    try {
      const response = await axios.get("http://10.0.2.2:3000/workouts");
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getWorkoutData();
        setWorkoutData(data);
        console.log("Fetch request successful");
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={workoutData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.workoutName}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyWorkoutsScreen;
