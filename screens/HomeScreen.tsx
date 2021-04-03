import React from 'react'
import { useState, useEffect } from 'react';

import { Text, View } from '../components/Themed';
import { StyleSheet, Image } from "react-native";

import CartApi from '../api/CartApi'

import Header from '../components/common/Header';
import FlashSale from '../components/home/FlashSale';
import { AxiosResponse } from 'axios';

export default function HomeScreen() {
  const [flashSale, setFlashSale] = useState<AxiosResponse | null | void>(null)

  useEffect(() => {
    async function fetchFlashSale() {
      try {
        const data = await CartApi.getAll()
        setFlashSale(data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchFlashSale()

  }, [])

  return (
    <View>
      <Header/>
      <View style={styles.cards}>
        <Text style={styles.title}>Sản phẩm mới về</Text>
        <Image style={styles.image} source={require("../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg")} />
      </View>
      <FlashSale list={flashSale} />


      {/* <SafeAreaView style={styles.container}>
        <CarouselCards />
      </SafeAreaView> */}

    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    marginBottom: 10
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
  },
});
