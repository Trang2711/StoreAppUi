import * as React from "react";
import { useState } from "react";
import { FlatList, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "../components/Themed";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationsScreen() {
  const [amountOfCmt, setAmountOfCmt] = useState(125);
  const [comment, setComment] = useState([
    {
      user: "hung",
      id: 1,
      cmt: "con hang nay ngon lam",
    },
    {
      user: "hung",
      id: 2,
      cmt: "con hang nay ngon lam",
    },
    {
      user: "hung",
      id: 3,
      cmt:
        "con hang nay ngon lamaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
    {
      user: "hung",
      id: 4,
      cmt: "con hang nay ngon lam",
    },
    {
      user: "hung",
      id: 5,
      cmt: "con hang nay ngon lam",
    },
  ]);
  const imgs = [
    {
      id: 1,
      ulr:
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
    },
    {
      id: 2,
      ulr:
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
    },
    {
      id: 3,
      ulr:
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
    },
    {
      id: 4,
      ulr:
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
    },
    {
      id: 5,
      ulr:
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
    },
    {
      id: 6,
      ulr:
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
    },
    {
      id: 7,
      ulr:
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
    },
    {
      id: 8,
      ulr:
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
    },
    {
      id: 9,
      ulr:
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
    },
    {
      id: 10,
      ulr:
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
    },
    {
      id: 11,
      ulr:
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
    },
    {
      id: 12,
      ulr:
        "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg",
    },
    {
      id: 13,
      ulr:
        'require("../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg")',
    },
  ];
  console.log({ comment });
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.scrollArea}>
          <ScrollView horizontal={true}>
            <Image
              style={styles.image}
              resizeMode={"contain"}
              source={require("../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg")}
            ></Image>
            <Image
              style={styles.image}
              resizeMode={"contain"}
              source={require("../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg")}
            ></Image>
            <Image
              style={styles.image}
              resizeMode={"contain"}
              source={require("../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg")}
            ></Image>
            <Image
              style={styles.image}
              resizeMode={"contain"}
              source={require("../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg")}
            ></Image>
            <Image
              style={styles.image}
              resizeMode={"contain"}
              source={require("../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg")}
            ></Image>
          </ScrollView>
        </View>

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
            {comment.map((item) => (
              <View key={item.id} style={styles.userComment}>
                <Text style={[{ flex: 2, fontWeight: "bold" }, styles.text16]}>
                  {item.user}
                </Text>
                <Text style={[{ flex: 9 }, styles.text16]}>{item.cmt}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.text20, styles.watchFurther]}>
            Xem them{" "}
            <Ionicons name="arrow-forward-outline" size={20}></Ionicons>
          </Text>
        </View>
        {/* mat hang lien quan */}
        <View>
          <Text
            style={[
              styles.centerItem,
              styles.text16,
              { backgroundColor: "#4287f5" },
            ]}
          >
            Co the ban cung thich
          </Text>
          <View style={styles.moreItemContainer}>
            {imgs.map((img, index) => (
              <View key={index} style={styles.eachPost}>
                <Image
                  style={styles.moreItemImg}
                  source={require("../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg")}
                ></Image>
                <Text>Gia: 1 trieu</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  moreItemContainer: {
    marginLeft: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  eachPost: {
    marginRight: 8,
    marginTop: 5,
  },
  moreItemImg: {
    width: 184,
    height: 150,
  },
  centerItem: {
    textAlign: "center",
  },
  text16: {
    fontSize: 16,
  },
  watchFurther: {
    margin: 8,
    textAlign: "center",
    backgroundColor: "#cccccc",
  },
  text20: {
    fontSize: 20,
  },
  scrollArea: {
    height: 245,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  commentSection: {
    marginTop: 5,
    marginBottom: 5,
    height: "auto",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 370,
    height: "auto",
    marginLeft: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  productNamePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userComment: {
    flexDirection: "row",
    marginLeft: 8,
    marginRight: 8,
  },
});
