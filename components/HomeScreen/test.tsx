import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Test({
  primaryPage,
  lastPage,
  setPrimaryPage,
  pages,
}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          onPress={() => {
            setPrimaryPage((prev: any) => prev + 1);
          }}
          title="Press Me"
        />
      </View>
      <Text style={styles.title}>
        this is {primaryPage} + lastPage: {lastPage} element
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  button: {
    width: 200,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
