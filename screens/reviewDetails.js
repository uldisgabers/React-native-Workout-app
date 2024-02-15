import { View, Text, Button } from "react-native";
import React from "react";
import { globalStyles } from "../styles/global";

const ReviewDetails = ({ route, navigation }) => {
  const { title, rating, body } = route.params;

  return (
    <View style={globalStyles.container}>
      <Text>
        {title} and the rating is {rating}
      </Text>
      <Text>{body}</Text>
    </View>
  );
};

export default ReviewDetails;
