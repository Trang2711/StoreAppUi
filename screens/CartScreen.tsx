import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProductApi from "../api/ProductApi";
// import Pagination from "../components/common/Pagination";

import { Text, View } from "../components/Themed";

export default function CartScreen() {
  const [allProducts, setAllProducts] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);
  // useEffect(() => {
  //   async function fetchProductByPage() {
  //     try {
  //       const response = await ProductApi.getProductByPagination(CurrentPage);
  //       const temp = response as any;
  //       setAllProducts((prev): any => [...prev, ...temp]);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchProductByPage();
  // }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>abc</Text>
      <View style={styles.fullWidth}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 200,
  },
});
