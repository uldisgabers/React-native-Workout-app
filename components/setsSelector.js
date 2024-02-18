import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SetsSelector = ({ addSetCount }) => {
  const [setsCount, setSetsCount] = useState(1);
  const [minusButtonDisabled, setMinusButtonDisabled] = useState(true);

  useEffect(() => {
    setMinusButtonDisabled(setsCount <= 1);
    addSetCount(setsCount);
  }, [setsCount]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={minusButtonDisabled}
        style={styles.button}
        onPress={() => {
          setSetsCount(setsCount - 1);
          // addSetCount(setsCount);
        }}
      >
        <MaterialCommunityIcons name="minus" size={24} color="white" />
      </TouchableOpacity>

      <Text style={{ color: "black" }}>Sets: {setsCount}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setSetsCount(setsCount + 1);
          // addSetCount(setsCount);
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

export default SetsSelector;
