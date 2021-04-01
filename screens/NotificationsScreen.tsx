import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, ActivityIndicator, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "../components/Themed";
import { Ionicons } from "@expo/vector-icons";
import ProductApi from "../api/ProductApi";
import ImgSlider from "../components/itemDetailScreen/ImgSlider";
import ItemProperty from "../components/itemDetailScreen/ItemProperty";
import RelatedItems from "../components/itemDetailScreen/RelatedItems";

export default function NotificationsScreen() {
  const [amountOfCmt, setAmountOfCmt] = useState(125);
  const [allProducts, setAllProducts] = useState([]);
  const [specifiedProduct, setSpecifiedProduct] = useState({});
  const [comment, setComment] = useState<any[]>([]);
  const [itemImg, setItemImg] = useState([]);
  const [loadingWhileFetchData, setLoadingWhileFetchData] = useState(true);
  interface Provider {
    company: string;
  }
  const imgs = [];
  useEffect(() => {
    async function fetchSpecifiedProduct() {
      try {
        const response = await ProductApi.getSpecifiedProduct(3);
        setSpecifiedProduct(response);
        setItemImg(response.data.lapUrl);
        setComment(response.data.comments);
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
    setInterval(() => {
      setLoadingWhileFetchData(false);
    }, 1000);
  }, []);
  console.log("itemImgs");
  console.log(itemImg);
  const url =
    "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg";
  return (
    <ScrollView>
      <View style={styles.container}>
        {loadingWhileFetchData ? (
          <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : (
          <View>
            <ImgSlider itemImg={itemImg} />
            <ItemProperty amountOfCmt={amountOfCmt} comment={comment} />
            <RelatedItems itemImg={itemImg} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    height: 675,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  text16: {
    fontSize: 16,
  },

  text20: {
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  boldText: {
    fontWeight: "bold",
  },
});
