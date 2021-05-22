import React from "react";
import { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Button,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { AxiosResponse } from "axios";
import { useNavigation } from "@react-navigation/native";

import ProductApi from "../api/ProductApi";
import SearchAndFiltersApi from "../api/SearchAndFiltersApi";

import Header from "../components/HomeScreen/Header";
import FlashSale from "../components/HomeScreen/FlashSale";
import CardItem from "../components/common/cardItem/CardItem";
import Carousel from "../components/common/Carousel";
import { useAppDispatch, useAppSelector } from "../redux/app/hook";
import {
  amountOfItemsInCart,
  productsInsideCart,
  setTotalQuantityInCart,
} from "../redux/features/cartSlice";
const carousel = [
  {
    imgUrl:
      "https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/1113804/pexels-photo-1113804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/2047904/pexels-photo-2047904.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

const windowWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const [flashSale, setFlashSale] = useState([]);
  const [bestsellerProduct, setBestsellerProduct] = useState([]);
  const navigation = useNavigation();
  const quantityInCart = useAppSelector(amountOfItemsInCart);
  const productList = useAppSelector(productsInsideCart);
  const [updatedQuantityInCart, setUpdatedQuantityInCart] = useState(0);
  const fetchFlashSale = async () => {
    try {
      const data = await ProductApi.getFlashProducts();
      setFlashSale(data as any);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBestsellerProduct = async () => {
    const request = {
      searchKeywords: "",
      configurations: {
        brands: ["Apple", "Dell", "Samsung"],
        RAM: ["4GB", "8GB", "16GB", "32GB", "64GB", "128GB", "256GB", "512BG"],
        SSD: ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB", "2TB", "4TB"],
        CPU: ["Core i3", "Core i5", "Core i7", "Core i9", "M1"],
        colors: ["Grey", "Yellow", "Silver"],
      },
      prices: {
        min: -1,
        max: 1e9,
      },
      year: -1,
      status: "all",
      sort_options: {
        by: "bestseller",
        order: "desc",
      },
      paging: {
        currentPage: 1,
        perPage: 20,
      },
    };
    try {
      const responce = await SearchAndFiltersApi.getProductList(request);
      const { data } = responce as any;
      setBestsellerProduct(data as any);
    } catch (error) {
      console.log("Failed to fetch bestseller: " + error);
    }
  };
  const _calculatingCartItemAmount = () => {
    var totalFigureInCart = 0;
    productList.map((product) => {
      totalFigureInCart = totalFigureInCart + product.quantity;
    });
    setUpdatedQuantityInCart(totalFigureInCart);
    dispatch(setTotalQuantityInCart(totalFigureInCart));
  };
  useEffect(() => {
    fetchFlashSale();
    fetchBestsellerProduct();
  }, []);
  useEffect(() => {
    _calculatingCartItemAmount();
  }, [productList]);
  const renderItem = ({ item }: any) => (
    <CardItem props={item} navigation={navigation} />
  );

  //////////////disable warining on screen
  console.disableYellowBox = true;

  return (
    <View>
      <Header quantityOfItemsInCart={updatedQuantityInCart} />
      <ScrollView>
        <ImageBackground
          style={styles.image}
          source={{
            uri: "https://images.pexels.com/photos/4458554/pexels-photo-4458554.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          }}
        >
          <Text style={styles.slogan}>
            Đắm chìm trong các sản phẩm công nghệ
          </Text>
        </ImageBackground>

        <FlashSale list={flashSale} navigation={navigation} />

        <View style={{ marginTop: 20 }}>
          <Carousel list={carousel} width={windowWidth} height={150} />
        </View>

        <View style={{ marginTop: 20, paddingVertical: 10 }}>
          <Text style={styles.title}>Top sản phẩm bán chạy nhất</Text>
          <FlatList
            data={bestsellerProduct}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
            numColumns={2}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    marginBottom: 20,
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
    height: 160,
    position: "relative",
    marginBottom: 20,
  },

  slogan: {
    position: "absolute",
    fontSize: 15,
    marginBottom: 3,
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
    width: "50%",
    top: 30,
    left: 20,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 10,
  },

  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },

  title: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
});
