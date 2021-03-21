import React from "react";
import { useState, useEffect } from "react";

import { Text, View } from "../components/Themed";
import { StyleSheet, Image, TouchableOpacity, Button } from "react-native";
import CartApi from "../api/CartApi";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import FlashSale from "../components/FlashSale";
import { AxiosResponse } from "axios";
import { useNavigation } from "@react-navigation/native";
import Test from "../components/HomeScreen/test";
import Pagination from "../components/HomeScreen/Pagination";

export default function HomeScreen() {
  const [flashSale, setFlashSale] = useState<AxiosResponse | null | void>(null);
  const navigation = useNavigation();
  const [lastPage, setLastPage] = useState(50);
  const [primaryPage, setPrimaryPage] = useState(5);
  {
    /*primaryPage la trang dau tien trong danh sach cac trang*/
  }
  const [currentPage, setCurrentPage] = useState(1);
  {
    /*currentPage la trang hien tai trong danh sach cac trang*/
  }
  const [pages, setPages] = useState([
    primaryPage,
    primaryPage + 1,
    primaryPage + 2,
    primaryPage + 3,
    "...",
    lastPage,
  ]);
  console.log(pages);
  useEffect(() => {
    async function fetchFlashSale() {
      try {
        const data = await CartApi.getAll();
        setFlashSale(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFlashSale();
    setPages([
      primaryPage,
      primaryPage + 1,
      primaryPage + 2,
      primaryPage + 3,
      "...",
      lastPage,
    ]);
  }, [lastPage, primaryPage]);
  return (
    <View>
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
      <Pagination
        primaryPage={primaryPage}
        setPrimaryPage={setPrimaryPage}
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={lastPage}
      />
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
