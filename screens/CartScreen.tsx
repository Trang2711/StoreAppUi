import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useAppSelector, useAppDispatch } from "../redux/app/hook";
import ProductItem from "../components/cartScreen/ProductItem";

import { Text, View } from "../components/Themed";
import { productsInsideCart } from "../redux/features/cartSlice";
export default function CartScreen() {
  const dispatch = useAppDispatch();
  const productList = useAppSelector(productsInsideCart);
  console.log("product in cart ", productList);
  useEffect(() => {}, []);
  return (
    <View style={styles.whole_screen}>
      <ScrollView>
        <View>
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </View>
      </ScrollView>
      <View style={styles.payment_area}>
        <View style={styles.price_container}>
          <View style={[{ flex: 1 }, styles.into_money]}>
            <Text style={styles.intoMoney}>Thành tiền (5)</Text>
          </View>
          <View style={[{ flex: 1 }, styles.total_amount]}>
            <Text style={styles.money}>200.000.000₫</Text>
          </View>
        </View>
        <View style={styles.proceed_buying}>
          <View style={styles.outer_box}>
            <Text style={styles.proceed_buying_text}>Tiến hành đặt hàng</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  whole_screen: {
    flex: 1,
  },
  payment_area: {
    height: "20%",
    width: "95%",
    backgroundColor: "red",
    marginLeft: 10,
    marginRight: 10,
  },
  price_container: {
    height: "45%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  into_money: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#e6e6e6",
  },
  total_amount: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#e6e6e6",
  },
  intoMoney: {
    marginLeft: 15,
    fontSize: 19,
  },
  money: {
    marginRight: 10,
    marginLeft: "auto",
    fontSize: 22,
    color: "red",
  },
  proceed_buying: {
    height: "55%",
    width: "100%",
    backgroundColor: "#e6e6e6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  outer_box: {
    width: "80%",
    height: "80%",
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  proceed_buying_text: {
    fontSize: 20,
    color: "white",
  },
  text22: {
    fontSize: 22,
  },
  text18: {
    fontSize: 18,
  },
  text15: {
    fontSize: 15,
  },
});
