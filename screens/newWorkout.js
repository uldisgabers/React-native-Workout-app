import {
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
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
import WorkoutRestSelector from "../components/workoutRestSelector";

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

  const [newWorkoutName, setNewWorkoutName] = useState("");

  // add whole Workout rest length between exercises to the data object

  const [restTimeBetweenExercises, setRestTimeBetweenExercises] = useState(40);

  const addRestBetweenExercisesLength = (value) => {
    setRestTimeBetweenExercises(value);
  };

  // POST workout to db

  const saveWorkoutToDB = async (workoutData, workoutName, restTime) => {
    axios
      .post("http://172.27.208.1:3001/workouts/", {
        // ...newWorkout,
        // id: uuidv4(),
        // createdAt: new Date(),
        // details: workoutData,
        id: uuidv4(),
        workoutName: workoutName,
        details: workoutData,
        restBetweenExercises: restTime,
        createdAt: new Date(),
      })
      .then((res) => {
        console.log("Data posted succesfully", res);
      })
      .catch((error) => {
        console.log(error);
      });

    // option to make post req to each individual ------------------

    // let workoutSendData = {
    //   id: uuidv4(),
    //   workoutName: workoutName,
    //   restBetweenExercises: restTime,
    //   createdAt: "",
    // };

    // axios
    //   .post("http://172.27.208.1:3001/workouts/", {
    //     ...workoutSendData,
    //     createdAt: new Date(),
    //     // id: uuidv4(),
    //     // workoutName: workoutName,
    //     // restBetweenExercises: restTime,
    //     // createdAt: new Date(),
    //   })
    //   .then((res) => {
    //     console.log("Data posted succesfully", res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // workoutData.map((item) => {
    //   axios
    //     .post("http://172.27.208.1:3001/workout_details", {
    //       ...item,
    //       workoutId: workoutSendData.id,
    //     })
    //     .then((res) => {
    //       console.log("Data posted succesfully", res);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // });
  };

  // save modal

  const [saveModal, setSaveModal] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {/* <Text>New Workout Screen</Text> */}
      <TouchableOpacity
        style={styles.addExerciseBtn}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.buttonText}>ADD EXERCISE</Text>
      </TouchableOpacity>
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

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={
          () => setSaveModal(true)
          // saveWorkoutToDB(workoutTree)
        }
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>SAVE</Text>
      </TouchableOpacity>

      <Modal
        animationType={"fade"}
        transparent
        visible={saveModal}
        onRequestClose={() => setSaveModal(false)}
      >
        <View style={styles.saveModalContainer}>
          <View style={styles.saveModal}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSaveModal(false)}
            >
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="Enter the workout name..."
              value={newWorkoutName}
              onChangeText={(text) => setNewWorkoutName(text)}
            />

            <WorkoutRestSelector
              addRestBetweenExercisesLength={addRestBetweenExercisesLength}
            />

            <View style={{ flexDirection: "row", gap: 20 }}>
              <TouchableOpacity
                onPress={() => setSaveModal(false)}
                style={styles.cancelBtn}
              >
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveModalBtn}
                onPress={() => {
                  saveWorkoutToDB(
                    workoutTree,
                    newWorkoutName,
                    restTimeBetweenExercises
                  );
                  setSaveModal(false);
                  setNewWorkoutName("");
                  setWorkoutTree([]);
                }}
              >
                <Text style={styles.buttonText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#64ad6a",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  saveModalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)'",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  saveModal: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    width: 320,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  cancelBtn: {
    backgroundColor: "#d4723d",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  saveModalBtn: {
    backgroundColor: "#64ad6a",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
});

export default NewWorkoutScreen;
