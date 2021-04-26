import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Alert, View, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useAppSelector } from "../redux/app/hook";
import ProductItem from "../components/cartScreen/ProductItem";
import { productsInsideCart } from "../redux/features/cartSlice";
export default function CartScreen() {
  ////////state
  const productList = useAppSelector(productsInsideCart);
  const [totalItemInCart, setTotalItemInCart] = useState(0);
  const [totalMoney, setTotalMoney] = useState("");
  /////// function

  useEffect(() => {
    console.log("product in cart", productList);
    const _calculatingCartItemAmount = () => {
      let totalFigureInCart = 0;
      productList.map((product) => {
        totalFigureInCart = totalFigureInCart + product.quantity;
      });
      setTotalItemInCart(totalFigureInCart);
    };
    const _calculatingCartTotalMoney = () => {
      let money = 0;
      productList.map((product) => {
        money += parseInt(product.price) * product.quantity;
      });
      const moneyToStr = money
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      setTotalMoney(moneyToStr);
    };
    _calculatingCartItemAmount();
    _calculatingCartTotalMoney();
  }, [productList]);
  return (
    <View style={styles.whole_screen}>
      {productList.length > 0 ? (
        <View style={styles.wrapper}>
          <ScrollView>
            <View>
              {productList.map((productItem, index) => (
                <ProductItem key={index} productItem={productItem} />
              ))}
            </View>
          </ScrollView>
          <View style={styles.payment_area}>
            <View style={styles.price_container}>
              <View style={[{ flex: 1 }, styles.into_money]}>
                <Text style={styles.intoMoney}>
                  Thành tiền ({totalItemInCart})
                </Text>
              </View>
              <View style={[{ flex: 1 }, styles.total_amount]}>
                <Text style={styles.money}>{totalMoney}₫</Text>
              </View>
            </View>
            <View style={styles.proceed_buying}>
              <View style={styles.outer_box}>
                <Text style={styles.proceed_buying_text}>
                  Tiến hành đặt hàng
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <TouchableOpacity>
            <Text>trong gio hang khong co gi</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  whole_screen: {
    flex: 1,
  },
  wrapper: {
    height: "100%",
    width: "100%",
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
