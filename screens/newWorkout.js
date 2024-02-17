import {
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getExerciseDataByMuscle } from "../utils/fetchData";
import DropdownMuscleGroup from "../components/dropdownMuscleGroup";
import { exerciseData } from "../utils/dummyData";
import DropdownExerciseName from "../components/dropdownExerciseName";

const NewWorkoutScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const muscle = "biceps";

  // getExerciseDataByMuscle(muscle).then((result) => {
  //   // console.log(result[0].name);
  // });

  const [newExercise, setNewExercise] = useState({
    name: "test name",
    muscleGroup: "",
  });

  const addMuscleGroup = (value) => {
    setNewExercise({ ...newExercise, muscleGroup: value });
    console.log(value);
  };

  if (newExercise.muscleGroup) {

    // This is data from selected exersise
    // getExerciseDataByMuscle(newExercise.muscleGroup).then((result) => {
    //   console.log(result);
    // });


  }

  return (
    <View>
      <Text>New Workout Screen</Text>
      <Button title="Add exercise" onPress={() => setIsModalVisible(true)} />
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <MaterialCommunityIcons  name="close" size={24} color="black" />
          </TouchableOpacity>

          <Text>NEW EXERCISE</Text>
        </View>
      </Modal>
      <DropdownMuscleGroup addMuscleGroup={addMuscleGroup} />
      {/* Change data that goes here */}
      <DropdownExerciseName exerciseData={exerciseData} />
      <Text>{JSON.stringify(newExercise)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    width: 32,
    height: 32,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
});

export default NewWorkoutScreen;
