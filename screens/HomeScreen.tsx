import React from "react";
import { useState, useEffect } from "react";

import { Text, View } from "../components/Themed";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

import CartApi from "../api/CartApi";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import FlashSale from "../components/FlashSale";
import { AxiosResponse } from "axios";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [flashSale, setFlashSale] = useState<AxiosResponse | null | void>(null);
  const navigation = useNavigation();
  const [lastPage, setLastPage] = useState(50);
  const [PrimaryPage, setPrimaryPage] = useState(5);
  {
    /*primaryPage la trang dau tien trong danh sach cac trang*/
  }
  const [currentPage, setCurrentPage] = useState(1);
  {
    /*currentPage la trang hien tai trong danh sach cac trang*/
  }
  const [pages, setPages] = useState([
    PrimaryPage,
    PrimaryPage + 1,
    PrimaryPage + 2,
    PrimaryPage + 3,
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
      PrimaryPage,
      PrimaryPage + 1,
      PrimaryPage + 2,
      PrimaryPage + 3,
      "...",
      lastPage,
    ]);
  }, [lastPage, PrimaryPage]);
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

      {/* <SafeAreaView style={styles.container}>
        <CarouselCards />
      </SafeAreaView> */}
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
              if (PrimaryPage > 1) setPrimaryPage(PrimaryPage - 1);
            }}
          >
            <Ionicons name="caret-back-circle-outline" size={30}></Ionicons>
          </TouchableOpacity>
        </View>
        {pages.map((page, index) => (
          <TouchableOpacity
            onPress={() => {
              if (page != "...") {
                setCurrentPage(page);
                if (PrimaryPage == page) {
                  if (PrimaryPage > 2) setPrimaryPage(page - 2);
                  else if (PrimaryPage == 2) setPrimaryPage(1);
                } else if (PrimaryPage + 3 == page)
                  if (PrimaryPage < lastPage - 4) setPrimaryPage(page);
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
              if (PrimaryPage < lastPage - 4)
                setPrimaryPage((prev) => prev + 1);
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
