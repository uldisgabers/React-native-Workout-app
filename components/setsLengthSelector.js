import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SetsLengthSelector = ({ addSetLength }) => {
  const [setLength, setSetLength] = useState(40);
  const [minusButtonDisabled, setMinusButtonDisabled] = useState(true);

  useEffect(() => {
    setMinusButtonDisabled(setLength <= 5);
    addSetLength(setLength);
  }, [setLength]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={minusButtonDisabled}
        style={styles.button}
        onPress={() => {
          setSetLength(setLength - 5);
          // addSetLength(setLength);
        }}
      >
        <MaterialCommunityIcons name="minus" size={24} color="white" />
      </TouchableOpacity>

      <Text style={{ color: "black" }}>Set length: {setLength} seconds</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setSetLength(setLength + 5);
          // addSetLength(setLength);
        }}
      >
        <MaterialCommunityIcons name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 24,
  },
  button: {
    width: 32,
    height: 32,
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
});

export default SetsLengthSelector;
