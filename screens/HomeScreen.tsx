import React from "react";
import { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";
import { StyleSheet, ImageBackground, TouchableOpacity, Button, FlatList } from "react-native";
import { AxiosResponse } from "axios";
import { useNavigation } from "@react-navigation/native";

import ProductApi from "../api/ProductApi";
import Header from "../components/homeScreen/Header";
import FlashSale from "../components/homeScreen/FlashSale";
import CardItem from '../components/common/cardItem/CardItem'

export default function HomeScreen() {
  const [flashSale, setFlashSale] = useState();
  const [bestsellerProduct, setBestsellerProduct] = useState()
  const navigation = useNavigation();
  

  const fetchFlashSale = async () => {
    try {
      const data = await ProductApi.getFlashProducts()
      setFlashSale(data as any)
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchBestsellerProduct = async () => {
      try {
        const data  = ProductApi.getBestsellerProduct()
        setBestsellerProduct(data as any)
      } catch (error) {
        console.log("" + error)
      }
  }

  useEffect(() => {
    fetchFlashSale()
    fetchBestsellerProduct()
  }, []);

  const renderItem = (item: any) => (
    <CardItem item={item} navigation={navigation} />
  );

  return (
    <View>
      <Header />
      {/* <View style={styles.cards}>
        <ImageBackground
          style={styles.image}
          source={{ uri: 'https://images.pexels.com/photos/4458554/pexels-photo-4458554.jpeg?cs=srgb&dl=pexels-ivan-samkov-4458554.jpg&fm=jpg' }}
        >
          <Text style={styles.title}>Đắm chìm trong các sản phẩm công nghệ</Text>
        </ImageBackground>
      </View>
      <FlashSale list={flashSale} />
      <View style={{ marginTop: 10, paddingVertical: 10 }}>
        <Text style={styles.title}>Top sản phẩm bán chạy nhất</Text>
        <FlatList
          data={bestsellerProduct}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
        />
      </View> */}
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
    height: 160,
    position: 'relative'
  },

  title: {
    position: 'absolute',
    fontSize: 15,
    marginBottom: 3,
    textAlign: "left",
    color: 'white',
    fontWeight: 'bold',
    width: '50%',
    top: 30,
    left: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 10
  },

  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
});
