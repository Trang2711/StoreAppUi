import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ProductApi from "../../../api/ProductApi";
import RelatedItems from "../../itemDetailScreen/RelatedItems";

const Pagination = () => {
  const [CurrentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const alertMsg = () => {
    alert("a a a");
  };
  useEffect(() => {
    async function fetchProductByPage() {
      try {
        const response = await ProductApi.getProductByPagination(CurrentPage);
        const temp = response as any;
        setAllProducts((prev): any => [...prev, ...temp]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductByPage();
  }, [CurrentPage]);
  return (
    <ScrollView
      onMomentumScrollEnd={(e) => {
        const scrollPosition = e.nativeEvent.contentOffset.y;
        const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
        const contentHeight = e.nativeEvent.contentSize.height;
        const isScrollToBottom = scrollViewHeight + scrollPosition;

        if (isScrollToBottom >= contentHeight - 1) {
          //goi su kien khi nguoi dung keo den cuoi man hinh
          setCurrentPage((prev) => prev + 1);
          alertMsg();
        }
      }}
    >
      {/* logic code để ở đây */}
    </ScrollView>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  test: {
    width: "100%",
    height: 200,
    backgroundColor: "darkgray",
  },
});
