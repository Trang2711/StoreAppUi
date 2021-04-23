import React from "react";
import { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";
import { StyleSheet, Image, TouchableOpacity, Button } from "react-native";
import { AxiosResponse } from "axios";
import { useNavigation } from "@react-navigation/native";

import CartApi from "../api/CartApi";
import Header from "../components/homeScreen/Header";
import FlashSale from "../components/homeScreen/FlashSale";
import Pagination from "../components/homeScreen/Pagination";
import ProductApi from "../api/ProductApi";
import RelatedItems from "../components/itemDetailScreen/RelatedItems";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [flashSale, setFlashSale] = useState<AxiosResponse | null | void>(null);
  const navigation = useNavigation();
  const [DataByPage, setDataByPage] = useState([]);
  useEffect(() => {
    async function fetchFlashSale() {
      try {
        const data = await CartApi.getAll();
        setFlashSale(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchProductByPage() {
      try {
        const response = await ProductApi.getAllProducts();
        const temp = response as any;
        setDataByPage(temp);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductByPage();
    fetchFlashSale();
  }, []);
  console.log("databypage", DataByPage);
  const displaySplicedData = DataByPage.splice(0, 11);
  return (
    <View>
      <ScrollView>
        <Header />
        <View style={styles.cards}>
          <Text style={styles.title}>Sản phẩm mới về</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TopNav", { screen: "NotificationsScreen" })
            }
          >
            <Image
              style={styles.image}
              source={require("../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg")}
            />
          </TouchableOpacity>
        </View>
        <FlashSale list={flashSale} />
        <RelatedItems allProducts={displaySplicedData} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    marginBottom: 10,
  },

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
  image: {
    resizeMode: "cover",
    width: "100%",
    height: 150,
  },

  title: {
    fontSize: 19,
    marginBottom: 3,
    textAlign: "center",
  },

  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
});
