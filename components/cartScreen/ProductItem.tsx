import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const ProductItem = ({ productItem }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.product_container}>
        <View style={styles.img_area}>
          <Image
            style={styles.image}
            source={require("../../assets/images/window-desk-watches-notebook-smartphone-headphones.jpg")}
          />
        </View>
        <View style={styles.content_area}>
          <View style={styles.title_price_assurence_discardIcon}>
            <View style={styles.title_price_assurence}>
              <View>
                <Text numberOfLines={1} style={[styles.text22, styles.title]}>
                  {productItem.productName}
                </Text>
              </View>
              <View>
                <Text style={[styles.text18]}>Hàng chính hãng</Text>
              </View>
              <View style={styles.price_area}>
                <Text style={[styles.text15, { fontWeight: "bold" }]}>
                  Giá: {"  "}
                </Text>
                <Text style={[styles.text18, styles.price]}>
                  {productItem.price}₫{" "}
                </Text>
              </View>
            </View>
            <View style={styles.discardIcon}>
              <Ionicons
                name="trash-outline"
                size={35}
                color="#cc0000"
              ></Ionicons>
            </View>
          </View>
          <View style={styles.quantity_area}>
            <Text style={styles.text18}>Số lượng:{"     "} </Text>
            <View style={styles.addingQuantity}>
              <Text style={styles.text22}>-</Text>
            </View>
            <View style={styles.quantity_outerContainer}>
              <Text style={styles.text22}> {productItem.quantity} </Text>
            </View>
            <View style={styles.subtractQuantity}>
              <Text style={styles.text22}>+</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  product_container: {
    marginTop: 10,
    width: "95%",
    height: 165,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "row",
  },
  img_area: {
    flex: 3,
    display: "flex",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    width: "90%",
    height: "95%",
    borderRadius: 5,
  },
  content_area: {
    flex: 5,
    marginLeft: 10,
  },
  title_price_assurence_discardIcon: {
    width: "100%",
    height: "70%",
    display: "flex",
    flexDirection: "row",
  },
  title_price_assurence: {
    flex: 5,
    display: "flex",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  discardIcon: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  price_area: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    color: "red",
  },
  title: {
    fontWeight: "bold",
  },
  quantity_area: {
    display: "flex",
    width: "100%",
    height: "30%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  subtractQuantity: {
    width: "15%",
    height: "50%",
    borderColor: "black",
    backgroundColor: "#bfbfbf",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantity_outerContainer: {
    height: "50%",
    width: "20%",
    backgroundColor: "#e6e6e6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addingQuantity: {
    width: "15%",
    height: "50%",
    borderColor: "black",
    backgroundColor: "#bfbfbf",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
