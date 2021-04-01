import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const ItemProperty = ({ amountOfCmt, comment }: any) => {
  return (
    <View>
      <View>
        <View style={styles.productNamePrice}>
          <Text style={{ fontSize: 20 }}>Laptop abc</Text>
          <Text style={{ fontSize: 20 }}>
            Gia: <Text style={styles.boldText}>20.000.000d</Text>
          </Text>
        </View>
        <Text style={{ fontSize: 18 }}>Cau hinh</Text>
      </View>
      <View style={styles.commentSection}>
        <Text>Nhan xet: ({amountOfCmt})</Text>
        <View>
          {comment.map((item: any, index: any) => (
            <View key={index} style={styles.userComment}>
              <Text style={[{ flex: 2, fontWeight: "bold" }, styles.text16]}>
                {item.user}
              </Text>
              <Text style={[{ flex: 9 }, styles.text16]}>{item.comment}</Text>
            </View>
          ))}
        </View>
        <Text style={[styles.text20, styles.watchFurther]}>
          Xem them <Ionicons name="arrow-forward-outline" size={20}></Ionicons>
        </Text>
      </View>
    </View>
  );
};

export default ItemProperty;

const styles = StyleSheet.create({
  text20: {
    fontSize: 20,
  },
  productNamePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boldText: {
    fontWeight: "bold",
  },
  commentSection: {
    marginTop: 5,
    marginBottom: 5,
    height: "auto",
  },
  userComment: {
    flexDirection: "row",
    marginLeft: 8,
    marginRight: 8,
  },
  text16: {
    fontSize: 16,
  },
  watchFurther: {
    margin: 8,
    textAlign: "center",
    backgroundColor: "#cccccc",
  },
});
