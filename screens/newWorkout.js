import {
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getExerciseDataByMuscle } from "../utils/fetchData";
import DropdownMuscleGroup from "../components/dropdownMuscleGroup";
import { exerciseData } from "../utils/dummyData";
import DropdownExerciseName from "../components/dropdownExerciseName";
import SetsSelector from "../components/setsSelector";
import SetsLengthSelector from "../components/setsLengthSelector";
import SetsRestSelector from "../components/setsRestSlector";

const NewWorkoutScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // getExerciseDataByMuscle(muscle).then((result) => {
  //   // console.log(result[0].name);
  // });

  const [newExercise, setNewExercise] = useState({
    muscleGroup: "",
    name: "",
    sets: 1,
    oneSetLength: 40,
    restLength: 20,
  });

  // add muscle group to the data object

  const addMuscleGroup = (value) => {
    setNewExercise({ ...newExercise, muscleGroup: value });
    console.log(value);
  };

  // make a get request to get exercises when muscle group is selected

  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (newExercise.muscleGroup) {
        try {
          const result = await getExerciseDataByMuscle(newExercise.muscleGroup);
          setExerciseData(result);
          console.log("Fetch request successful");
        } catch (error) {
          console.error("Error fetching exercise data:", error);
        }
      }
    };

    fetchData();
  }, [newExercise.muscleGroup]);

  // add exercise name to the data object

  const addExerciseName = (value) => {
    setNewExercise({ ...newExercise, name: value });
    console.log(value);
  };

  // add set count to the data object

  const addSetCount = (value) => {
    setNewExercise({ ...newExercise, sets: value });
  };

  // add length of one set to the data object

  const addSetLength = (value) => {
    setNewExercise({ ...newExercise, oneSetLength: value });
  };

  // add rest length between sets to the data object

  const addSetRestLength = (value) => {
    setNewExercise({ ...newExercise, restLength: value });
  };

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
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </TouchableOpacity>

          <Text>NEW EXERCISE</Text>
          <DropdownMuscleGroup addMuscleGroup={addMuscleGroup} />
          {/* Change data that goes here */}
          {newExercise.muscleGroup && (
            <DropdownExerciseName
              addExerciseName={addExerciseName}
              exerciseData={exerciseData}
            />
          )}
          {newExercise.name && (
            <>
              <SetsSelector addSetCount={addSetCount} />
              <SetsLengthSelector addSetLength={addSetLength} />
              <SetsRestSelector addSetRestLength={addSetRestLength} />

              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <View style={styles.addButton}>
                  <Text style={styles.buttonText}>ADD EXERCISE</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
      <Text>{JSON.stringify(newExercise)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
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
  addButton: {
    backgroundColor: "tomato",
    padding: 14,
    borderRadius: 24,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default NewWorkoutScreen;
