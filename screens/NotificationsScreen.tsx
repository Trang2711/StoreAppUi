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
  const [amountOfCmt, setAmountOfCmt] = useState();
  const [AmountOfPage, setAmountOfPage] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [specifiedProduct, setSpecifiedProduct] = useState({});
  const [comment, setComment] = useState<any[]>([]);
  const [itemImg, setItemImg] = useState([]);
  const [loadingWhileFetchData, setLoadingWhileFetchData] = useState(true);
  const [IsloadingMoreItem, setIsloadingMoreItem] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    async function fetchSpecifiedProduct() {
      try {
        const response = await ProductApi.getSpecifiedProduct(3);
        setSpecifiedProduct(response.data);
        setItemImg(response.data.lapUrl);
        setComment(response.data.comments);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchProductByPage() {
      try {
        const response = await ProductApi.getProductByPagination(CurrentPage);

        setAllProducts((prev): any => [...prev, ...response.data]);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchAllProducts() {
      try {
        const response = await ProductApi.getAllProducts();
        setAmountOfPage(response.data.length);
      } catch (error) {
        console.log(error);
      }
    }
    function handlingLoadingMoreItemSpinner() {
      if (CurrentPage > (AmountOfPage as any) / 10) {
        setIsloadingMoreItem(false);
      }
    }
    handlingLoadingMoreItemSpinner();
    fetchAllProducts();
    fetchSpecifiedProduct();
    fetchProductByPage();
    setInterval(() => {
      setLoadingWhileFetchData(false);
    }, 1000);
  }, [CurrentPage]);
  const url =
    "../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg";
  return (
    <ScrollView
      onMomentumScrollEnd={(e) => {
        const scrollPosition = e.nativeEvent.contentOffset.y;
        const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
        const contentHeight = e.nativeEvent.contentSize.height;
        const isScrollToBottom = scrollViewHeight + scrollPosition;

        if (isScrollToBottom >= contentHeight - 1) {
          setCurrentPage((prev) => prev + 1);
        }
      }}
    >
      <View style={styles.container}>
        {loadingWhileFetchData ? (
          <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : (
          <View>
            <ImgSlider itemImg={itemImg} />
            <ItemProperty amountOfCmt={amountOfCmt} comment={comment} />
            <RelatedItems allProducts={allProducts} />
            {IsloadingMoreItem ? (
              <ActivityIndicator size="large" color="black" />
            ) : null}
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
