import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const CardButton = ({ loading, text }: any) => {
  return (
    <TouchableHighlight style={styles.button} underlayColor="rgba(0,0,0,0.5)">
      <View>
        <Text>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default CardButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 10,
    minWidth: 160,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "white",
    alignItems: "center",
  },
});
