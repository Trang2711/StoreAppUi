import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, ActivityIndicator, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "../components/Themed";
import ProductApi from "../api/ProductApi";
import { useAppSelector, useAppDispatch } from "../redux/app/hook";
import { incrementByAmount, selectCount } from "../redux/features/counterSlice";
import RelatedItems from "../components/itemDetailScreen/RelatedItems";
import ProductItem from "../components/itemDetailScreen/ProductItem";

export default function NotificationsScreen({ route }: any) {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [amountOfCmt, setAmountOfCmt] = useState();
  const [AmountOfPage, setAmountOfPage] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [loadingWhileFetchData, setLoadingWhileFetchData] = useState(true);
  const [IsloadingMoreItem, setIsloadingMoreItem] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let mounted = true;
    // async function fetchProductByPage() {
    //   try {
    //     const response = await ProductApi.getProductByPagination(CurrentPage);
    //     const temp = response as any;
    //     setAllProducts((prev): any => [...prev, ...temp]);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    async function fetchAllProducts() {
      try {
        const response = await ProductApi.getAllProducts();
        const temp = response as any;
        setAmountOfPage(temp.length);
        setAllProducts(temp);
      } catch (error) {
        console.log(error);
      }
    }
    function handlingLoadingMoreItemSpinner() {
      if (CurrentPage > (AmountOfPage as any) / 10) {
        setIsloadingMoreItem(false);
      }
    }
    if (mounted) {
      handlingLoadingMoreItemSpinner();
      fetchAllProducts();
      // fetchProductByPage();
      setInterval(() => {
        setLoadingWhileFetchData(false);
      }, 1000);
    }
    return () => {
      mounted = false;
    };
  }, [CurrentPage]);

  useEffect(() => {
    // console.log("route param", route.params.itemId);
  }, []);
  const splicedProduct = allProducts.splice(0, 11);
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
            <ProductItem itemId={route.params.itemId} />
            <RelatedItems allProducts={splicedProduct} />
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
