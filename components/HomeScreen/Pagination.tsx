import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text } from "../Themed";

export default function Pagination({
  primaryPage,
  setPrimaryPage,
  pages,
  currentPage,
  setCurrentPage,
  lastPage,
}: any) {
  return (
    <View style={styles.pagination}>
      <View style={styles.alignCenter}>
        <TouchableOpacity
          onPress={() => {
            setPrimaryPage(1);
          }}
        >
          <Ionicons name="play-back-circle-outline" size={30}></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.alignCenter}>
        <TouchableOpacity
          onPress={() => {
            if (primaryPage > 1) setPrimaryPage(primaryPage - 1);
          }}
        >
          <Ionicons name="caret-back-circle-outline" size={30}></Ionicons>
        </TouchableOpacity>
      </View>
      {pages.map((page: any, index: any) => (
        <TouchableOpacity
          onPress={() => {
            if (page != "...") {
              setCurrentPage(page);
              if (primaryPage == page) {
                if (primaryPage > 2) setPrimaryPage(page - 2);
                else if (primaryPage == 2) setPrimaryPage(1);
              } else if (primaryPage + 3 == page)
                if (primaryPage < lastPage - 4) setPrimaryPage(page);
            }
          }}
          key={index}
        >
          {page == currentPage ? (
            <View style={styles.specialPage}>
              <Text>{page}</Text>
            </View>
          ) : (
            <View style={styles.eachPage}>
              <Text>{page}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
      <View style={styles.alignCenter}>
        <TouchableOpacity
          onPress={() => {
            if (primaryPage < lastPage - 4)
              setPrimaryPage((prev: any) => prev + 1);
          }}
        >
          <Ionicons name="caret-forward-circle-outline" size={30}></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.alignCenter}>
        <TouchableOpacity
          onPress={() => {
            setPrimaryPage(lastPage - 4);
          }}
        >
          <Ionicons name="play-forward-circle-outline" size={30}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
  },
  alignCenter: {
    justifyContent: "center",
  },
  eachPage: {
    width: 30,
    height: 30,
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: "#32a852",
    borderRadius: 50,
  },
  specialPage: {
    width: 30,
    height: 30,
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 50,
  },
});
