import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, ScrollView, View, Text, Image } from "react-native";
import ProductApi from "../../../api/ProductApi";

const Pagination = ({children, renderItem } : any) => {
  const [AmountOfPage, setAmountOfPage] = useState();
  const [loadingWhileFetchData, setLoadingWhileFetchData] = useState(true);
  const [IsloadingMoreItem, setIsloadingMoreItem] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);

  const alertMsg = () => {
    alert("a a a");
  };

  useEffect(() => {
    handlingLoadingMoreItemSpinner();
    fetchAllProducts();
    fetchProductByPage();
    setInterval(() => {
      setLoadingWhileFetchData(false);
    }, 1000);
  }, [CurrentPage]);

  async function fetchProductByPage() {
    try {
      const response = await ProductApi.getProductByPagination(CurrentPage);
      const temp = response as any;
      setAllProducts((prev): any => [...prev, ...temp]);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchAllProducts() {
    try {
      const response = await ProductApi.getAllProducts();
      const temp = response as any;
      setAmountOfPage(temp.length);
    } catch (error) {
      console.log(error);
    }
  }

  function handlingLoadingMoreItemSpinner() {
    if (CurrentPage > (AmountOfPage as any) / 10) {
      setIsloadingMoreItem(false);
    }
  }

  const onMomentumScrollEnd = (e: any) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
    const contentHeight = e.nativeEvent.contentSize.height;
    const isScrollToBottom = scrollViewHeight + scrollPosition;

    if (isScrollToBottom >= contentHeight - 1) {
      setCurrentPage((prev) => prev + 1);
      alertMsg()
    }
  }

  return (
    <ScrollView onMomentumScrollEnd={onMomentumScrollEnd }
    >
      {children}
      <View>
        
        <View style={styles.moreItemContainer}>
          {allProducts.map((item: any, index: any) => {
            return (
              renderItem(item, index)
            );
          })}
        </View>
      </View>
      {IsloadingMoreItem ? (
        <ActivityIndicator size="large" color="black" />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  moreItemContainer: {
    marginLeft: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});


export default Pagination;