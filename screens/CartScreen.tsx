import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Alert, View, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useAppSelector, useAppDispatch } from "../redux/app/hook";
import ProductItem from "../components/cartScreen/ProductItem";
import {
  productsInsideCart,
  amountOfItemsInCart,
  setTotalQuantityInCart,
  subQuan,
} from "../redux/features/cartSlice";
import { withTheme } from "react-native-elements";
import "intl";
import "intl/locale-data/jsonp/en";

export default function CartScreen() {
  const productList = useAppSelector(productsInsideCart);
  const [totalItemInCart, setTotalItemInCart] = useState(0);
  const [totalMoney, setTotalMoney] = useState<number>(0);
  const quantityOfItemsInCart = useAppSelector(amountOfItemsInCart);
  const sub_quan = useAppSelector(subQuan);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // console.log("product in cart", productList);
    const _calculatingCartItemAmount = () => {
      var totalFigureInCart = 0;
      productList.map((product) => {
        totalFigureInCart = totalFigureInCart + product.quantity;
      });
      setTotalItemInCart(totalFigureInCart);
      dispatch(setTotalQuantityInCart(totalFigureInCart));
    };
    const _calculatingCartTotalMoney = () => {
      let money = 0;
      productList.map((product) => {
        money += product.price * product.quantity;
      });
      setTotalMoney(money);
    };
    _calculatingCartItemAmount();
    _calculatingCartTotalMoney();
    console.log("subquan", sub_quan);
  }, [productList]);
  // console.log("quan in cart", quantityOfItemsInCart);
  const _fomatNumber1 = (num: number) => {
    const formatter = new Intl.NumberFormat("us");
    return formatter.format(num);
  };

  return (
    <View style={styles.whole_screen}>
      {productList.length > 0 ? (
        <>
          <ScrollView>
            {productList.map((productItem, index) => (
              <ProductItem key={index} productItem={productItem} />
            ))}
          </ScrollView>
          <View style={styles.payment_area}>
            <View style={styles.moneyContainer}>
              <Text style={{ fontSize: 15 }}>
                Thành tiền ({totalItemInCart})
              </Text>
              <Text
                style={{ fontSize: 17, color: "#d53332", fontWeight: "bold" }}
              >
                {_fomatNumber1(totalMoney)}₫
              </Text>
            </View>
            <Text style={styles.paymentBtn}>Đặt hàng</Text>
          </View>
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 17, color: "#9f9a9a", fontWeight: "bold" }}>
            Giỏ hàng trống
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  whole_screen: {
    flex: 1,
  },
  payment_area: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moneyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  paymentBtn: {
    backgroundColor: "black",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 15,
    marginLeft: 10,
  },
});
