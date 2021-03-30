import * as React from "react";
import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Image, ImageStore } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "../components/Themed";
import { Ionicons } from "@expo/vector-icons";
import ProductApi from "../api/ProductApi";
export default function NotificationsScreen() {
  const [amountOfCmt, setAmountOfCmt] = useState(125);
  const [allProducts, setAllProducts] = useState([]);
  const [specifiedProduct, setSpecifiedProduct] = useState({});
  const [comment, setComment] = useState<any[]>([]);
  const [itemImg, setItemImg] = useState([]);
  interface Provider {
    company: string;
  }
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
  ];
  useEffect(() => {
    async function fetchSpecifiedProduct() {
      try {
        const response: object = await ProductApi.getSpecifiedProduct(3);
        setSpecifiedProduct(response);
        setItemImg(response.lapUrl);
        setComment(response.comments);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchAllProducts() {
      try {
        const response = await ProductApi.getAllProducts();
        setAllProducts(response as any);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllProducts();
    fetchSpecifiedProduct();
  }, []);
  console.log(itemImg);
  const url =
    "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg";
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.scrollArea}>
          <ScrollView horizontal={true}>
            {itemImg.map((item, index) => (
              <View key={index}>
                <Image
                  style={styles.image}
                  resizeMode={"contain"}
                  source={require(url)}
                ></Image>
              </View>
            ))}
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
            {comment.map((item, index) => (
              <View key={index} style={styles.userComment}>
                <Text style={[{ flex: 2, fontWeight: "bold" }, styles.text16]}>
                  {item.user}
                </Text>
                <Text style={[{ flex: 9 }, styles.text16]}>{item.comment}</Text>
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
            {itemImg.map((imgUrl, index) => {
              var icon = require("../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg");

              // var icon = require(imgUrl);

              console.log(imgUrl);
              return (
                <View key={index} style={styles.eachPost}>
                  <Image style={styles.moreItemImg} source={icon}></Image>
                  <Text>Gia: 1 trieu</Text>
                </View>
              );
            })}
          </View>
        </View>
        <Image
          style={styles.moreItemImg}
          source={require("../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg")}
        ></Image>
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
    backgroundColor: "red",
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
