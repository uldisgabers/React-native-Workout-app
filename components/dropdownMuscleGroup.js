import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const data = [
  { label: "Abdominals", value: "abdominals" },
  { label: "Abductors", value: "abductors" },
  { label: "Adductors", value: "adductors" },
  { label: "Biceps", value: "biceps" },
  { label: "Calves", value: "calves" },
  { label: "Chest", value: "chest" },
  { label: "Forearms", value: "forearms" },
  { label: "Glutes", value: "glutes" },
  { label: "Hamstrings", value: "hamstrings" },
  { label: "Lats", value: "lats" },
  { label: "Lower back", value: "lower_back" },
  { label: "Middle back", value: "middle_back" },
  { label: "Neck", value: "neck" },
  { label: "Quadriceps", value: "quadriceps" },
  { label: "Traps", value: "traps" },
  { label: "Triceps", value: "triceps" },
];

const DropdownMuscleGroup = ({ addMuscleGroup }) => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select muscle group"
      searchPlaceholder="Search..."
      value={value}
      onChange={(item) => {
        setValue(item.value);
        addMuscleGroup(item.value);
      }}
      renderLeftIcon={() => (
        <MaterialCommunityIcons name="arm-flex" size={20} color="black" />
      )}
    />
  );
};

export default DropdownMuscleGroup;

const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
