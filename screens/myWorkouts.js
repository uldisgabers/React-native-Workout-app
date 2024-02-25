import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const MyWorkoutsScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [workoutData, setWorkoutData] = useState([]);

  // async function getWorkoutData() {
  //   try {
  //     const response = await axios.get("http://10.0.2.2:3000/workouts");
  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await getWorkoutData();
  //       setWorkoutData(data);
  //       console.log("Fetch request successful");
  //     } catch (error) {
  //       console.error("Error fetching exercise data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const getWorkoutData = async () => {
    try {
      const response = await fetch('http://172.27.208.1:3001/workouts', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      setWorkoutData(json.workouts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorkoutData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={workoutData}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.workoutName}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1/2,
    backgroundColor: "#64ad6a",
    margin: 5,
    padding: 15,
    borderRadius: 6,
  },
});

export default MyWorkoutsScreen;
