import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Alert,
  ImageBackground,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch } from "../../redux/app/hook";
import { baseUrl } from "../../api/AxiosClient";
import { AntDesign } from "@expo/vector-icons";
import {
  addingItemQuantity,
  deleteAnItemFromCart,
  subtractItemQuantity,
} from "../../redux/features/cartSlice";
import "intl";
import "intl/locale-data/jsonp/en";
const ProductItem = ({ productItem }: any) => {
  const {
    id,
    title,
    product_thumbnail,
    price,
    discount_price,
    sold,
    rating_average,
    quantity,
  } = productItem;
  const dispatch = useAppDispatch();
  const [confirmDeleting, setConfirmDeleting] = useState(false);
  const moneyToStr = productItem.price
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

  const showAlert = () => {
    Alert.alert(
      "Xóa sản phẩm?",
      "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => setConfirmDeleting(true) },
      ]
    );
  };

  const _increaseThisItemQuantity = () => {
    dispatch(addingItemQuantity({ id: productItem.id }));
  };
  const _subtractThisItemQuantity = () => {
    dispatch(subtractItemQuantity({ id: productItem.id }));
  };
  const _deleteThisItemFromCart = () => {
    showAlert();
  };
  useEffect(() => {
    if (confirmDeleting) {
      dispatch(deleteAnItemFromCart({ id: productItem.id }));
      setConfirmDeleting(false);
    }
  }, [confirmDeleting]);

  const _fomatNumber1 = (num: number) => {
    const formatter = new Intl.NumberFormat("us");
    return formatter.format(num);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{ uri: `${baseUrl}${product_thumbnail}` }}
      ></ImageBackground>

      <View style={styles.content_area}>
        <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: "bold" }}>
          {title}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}
        >
          <Text style={styles.priceSale}>{_fomatNumber1(discount_price)}đ</Text>
          <Text style={styles.price}>{_fomatNumber1(price)}đ</Text>
        </View>
        <View style={styles.quantity_area}>
          <Text style={{ fontSize: 14, marginRight: 5 }}>Số lượng:</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={_subtractThisItemQuantity}>
              <MaterialCommunityIcons
                style={styles.countBtn}
                name="minus"
                size={15}
                color="black"
              />
            </TouchableOpacity>
            <Text style={{ paddingHorizontal: 3 }}> {quantity} </Text>
            <TouchableOpacity onPress={_increaseThisItemQuantity}>
              <AntDesign
                name="plus"
                style={styles.countBtn}
                size={15}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={_deleteThisItemFromCart}
        style={{ marginLeft: 5 }}
      >
        <Ionicons name="trash-outline" size={22} color="#cc0000"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    resizeMode: "cover",
    width: 120,
    height: 100,
    marginRight: 5,
  },
  content_area: {
    flex: 1,
  },
  quantity_area: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  countBtn: {
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 6,
    paddingVertical: 5,
  },
  price: {
    fontSize: 11,
    color: "gray",
    textDecorationLine: "line-through",
  },
  priceSale: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#d53332",
    marginRight: 6,
  },
});
