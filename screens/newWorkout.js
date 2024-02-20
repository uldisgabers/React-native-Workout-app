import {
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
const { v4: uuidv4 } = require("uuid");
import axios from "axios";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getExerciseDataByMuscle } from "../utils/fetchData";
import DropdownMuscleGroup from "../components/dropdownMuscleGroup";
import DropdownExerciseName from "../components/dropdownExerciseName";
import SetsSelector from "../components/setsSelector";
import SetsLengthSelector from "../components/setsLengthSelector";
import SetsRestSelector from "../components/setsRestSlector";

// const workoutTree = [];

const NewWorkoutScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [workoutTree, setWorkoutTree] = useState([]);

  const [newExercise, setNewExercise] = useState({
    id: uuidv4(),
    muscleGroup: "",
    name: "",
    sets: 1,
    oneSetLength: 40, // default seconds for set length
    restLength: 20, // default seconds for rest length
  });

  // const [workoutTree, setWorkoutTree] = useState([]);

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

  // add exercise to the workout tree

  const addExerciseToWorkoutTree = (exercise) => {
    setWorkoutTree([...workoutTree, exercise]);
    setNewExercise({
      id: uuidv4(),
      muscleGroup: "",
      name: "",
      sets: 1,
      oneSetLength: 40,
      restLength: 20,
    });
  };

  // console.log(workoutTree);

  // POST workout to db

  const saveWorkoutToDB = (data) => {
    // axios
    //   .post("http://localhost:3000/workouts", {
    //     id: uuidv4(),
    //     workoutName: "test name",
    //     details: data,
    //     createdAt: new Date(),
    //   })
    //   .then((res) => {
    //     console.log("Data posted succesfully");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    axios.get("http://localhost:3000/workouts").then(({ data }) => {
      console.log(data);
    }).catch((error) => {
      console.log(error)
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {/* <Text>New Workout Screen</Text> */}
      <TouchableOpacity
        style={styles.addExerciseBtn}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.buttonText}>ADD EXERCISE</Text>
      </TouchableOpacity>
      {/* <Button title="Add exercise" onPress={() => setIsModalVisible(true)} /> */}
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

              <TouchableOpacity
                onPress={() => {
                  addExerciseToWorkoutTree(newExercise);
                  setIsModalVisible(false);
                }}
              >
                <View style={styles.addButton}>
                  <Text style={styles.buttonText}>ADD EXERCISE</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>

      {/* <Text>{JSON.stringify(newExercise)}</Text> */}

      <View style={styles.flatlist}>
        <FlatList
          data={workoutTree}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.exerciseBlock}>
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={24}
                color="white"
              />
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.buttonText}>{item.name}</Text>
                <Text style={styles.buttonText}>Sets: {item.sets}</Text>
              </View>
              <MaterialCommunityIcons
                name="delete"
                size={24}
                color="white"
                onPress={() => {
                  setWorkoutTree(
                    workoutTree.filter((exercise) => item.id !== exercise.id)
                  );
                }}
              />
            </View>
          )}
        />
      </View>

      {/* {workoutTree.length !== 0 && (
        <View style={styles.exerciseBlock}>
          <Text>{workoutTree[0].name}</Text>
          <Text>Sets: {workoutTree[0].sets}</Text>
        </View>
      )} */}

      <TouchableOpacity
        style={styles.saveBtn}
        // onPress={() => saveWorkoutToDB(workoutTree)}
        onPress={() => saveWorkoutToDB()}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>SAVE</Text>
      </TouchableOpacity>
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
  addExerciseBtn: {
    maxWidth: 150,
    paddingHorizontal: 20,
    backgroundColor: "#FF2C07",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    marginVertical: 5,
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
  exerciseBlock: {
    flex: 1,
    backgroundColor: "tomato",
    padding: 8,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    color: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  flatlist: {
    flex: 1,
    width: "100%",
  },
  saveBtn: {
    backgroundColor: "#ffa807",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
});

export default NewWorkoutScreen;
