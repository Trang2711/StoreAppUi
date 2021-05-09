import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import StarRating from "../StarRating";
import { baseUrl } from "../../../api/AxiosClient";
import "intl";
import "intl/locale-data/jsonp/en";
const CardItem = ({ props, navigation }: any) => {
  const {
    id,
    title,
    product_thumbnail,
    price,
    discount_price,
    sold,
    rating_average,
  } = props;
  const dealDiscount = Math.round(((price - discount_price) * 100.0) / price);

  const _fomatNumber = (num: number) => {
    const formatter = new Intl.NumberFormat("en", {
      notation: "compact",
    });

    return formatter.format(num);
  };

  const _fomatNumber1 = (num: number) => {
    const formatter = new Intl.NumberFormat("us");
    return formatter.format(num);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("Root", {
          screen: "ItemDetailScreen",
          params: { id: id },
        })
      }
    >
      <ImageBackground
        style={styles.image}
        source={{ uri: `${baseUrl}${product_thumbnail}` }}
      >
        {dealDiscount !== 0 && (
          <View style={styles.flash}>
            <Text style={styles.dealsDiscount}>-{dealDiscount}%</Text>
          </View>
        )}
      </ImageBackground>
      <View style={{ paddingHorizontal: 7 }}>
        <Text
          numberOfLines={1}
          style={{ fontSize: 13, flex: 1, marginBottom: 5 }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text numberOfLines={1} style={styles.priceSale}>
            {_fomatNumber1(parseInt(discount_price))}đ
          </Text>
          {dealDiscount !== 0 && (
            <Text numberOfLines={1} style={styles.retialPrice}>
              {_fomatNumber1(parseInt(price))}đ
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <StarRating num={parseFloat(rating_average)} />
          <Text style={{ fontSize: 10, color: "gray" }}>
            Đã bán {_fomatNumber(parseInt(sold))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    marginHorizontal: 3,
    backgroundColor: "white",
    paddingBottom: 10,
  },

  image: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },

  retialPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
    flex: 1,
  },

  priceSale: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
    marginRight: 10,
  },

  flash: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 35,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f02322",
    color: "white",
    borderRadius: 70,
  },

  dealsDiscount: {
    fontWeight: "bold",
    fontSize: 10,
    color: "white",
  },
});

export default CardItem;
