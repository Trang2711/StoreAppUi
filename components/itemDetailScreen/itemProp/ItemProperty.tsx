import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppSelector, useAppDispatch } from "../../../redux/app/hook";
import {
  addingNewProductToCart,
  productsInsideCart,
} from "../../../redux/features/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const ItemProperty = ({
  amountOfCmt,
  comment,
  handlingUserPressingWatchMoreCmt,
  IsLoadingMoreCmt,
  specifiedProduct,
}: any) => {
  const dispatch = useAppDispatch();
  const productList = useAppSelector(productsInsideCart);

  function _addingAnItemToCart() {
    const actionResult = dispatch(
      addingNewProductToCart({
        id: specifiedProduct.id,
        productName: specifiedProduct.laptopName,
        quantity: 1,
        price: specifiedProduct.price,
        imgUrl: specifiedProduct.lapUrl[0],
      })
    );
    console.log("unwarp", unwrapResult(actionResult));
  }
  useEffect(() => {
    console.log("product in cart", productList);
  }, [productList]);
  return (
    <View>
      <View>
        <View style={styles.productNamePrice}>
          <Text style={{ fontSize: 20 }}>{specifiedProduct.laptopName}</Text>
          <Text style={{ fontSize: 20 }}>
            Giá: <Text style={styles.boldText}>{specifiedProduct.price}d</Text>
          </Text>
        </View>
        <Text style={{ fontSize: 18 }}>Cấu hình</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Text
            style={[styles.text20, styles.addingToCart]}
            onPress={_addingAnItemToCart}
          >
            Thêm vào giỏ hàng
            <Ionicons name="cart-outline" size={20}></Ionicons>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.commentSection}>
        <Text>Nhận xét: ({amountOfCmt})</Text>
        <View>
          {comment.map((item: any, index: any) => (
            <View key={index} style={styles.userComment}>
              <Text style={[{ flex: 2, fontWeight: "bold" }, styles.text16]}>
                {item.user}
              </Text>
              <Text style={[{ flex: 9 }, styles.text16]}>{item.comment}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity>
          <Text
            onPress={handlingUserPressingWatchMoreCmt}
            style={[styles.text20, styles.watchFurther]}
          >
            Xem thêm
            {IsLoadingMoreCmt ? (
              <ActivityIndicator size="small" color="black" />
            ) : null}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemProperty;

const styles = StyleSheet.create({
  text20: {
    fontSize: 20,
  },

  addingToCart: {
    width: "auto",
    padding: 10,
    marginRight: "auto",
    marginLeft: "auto",
    textAlign: "center",
    backgroundColor: "#edbebe",
    borderRadius: 10,
    color: "red",
    borderColor: "red",
    borderWidth: 1,
  },
  productNamePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boldText: {
    fontWeight: "bold",
  },
  commentSection: {
    marginTop: 5,
    marginBottom: 5,
    height: "auto",
  },
  userComment: {
    flexDirection: "row",
    marginLeft: 8,
    marginRight: 8,
  },
  text16: {
    fontSize: 16,
  },
  watchFurther: {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    backgroundColor: "#cccccc",
    borderRadius: 10,
  },
});
