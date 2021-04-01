import * as React from "react";
import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Image, ImageStore } from "react-native";
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
  }, []);
  console.log("itemImgs");
  console.log(itemImg);
  const url =
    "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg";
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImgSlider itemImg={itemImg} />

        <ItemProperty amountOfCmt={amountOfCmt} comment={comment} />
        {/* mat hang lien quan */}
        <RelatedItems itemImg={itemImg} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
