import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../redux/app/hook";
import { amountOfItemsInCart } from "../../redux/features/cartSlice";

const itemsList = ["cart, search, notification"];
export default function Header({
  temporaryQuantityDisplayInItemDetailScreem,
}: any) {
  const navigation = useNavigation();
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <Ionicons
          style={styles.item}
          name="chevron-back-outline"
          size={24}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <Text style={styles.appName}>Ponzi</Text>
      <View style={styles.rightSide}>
        {/* <AntDesign
                    style={styles.item}
                    name="bells"
                    size={21}
                    color="black"
                    onPress={() => {
                        navigation.navigate("TopNav", { screen: "NotificationsScreen" })
                    }}
                /> */}
        <Ionicons
          style={styles.item}
          name="cart-outline"
          size={27}
          color="black"
          onPress={() => {
            navigation.navigate("TopNav", { screen: "CartScreen" });
          }}
        />
        {temporaryQuantityDisplayInItemDetailScreem > 0 ? (
          <View style={styles.quantityIcon}>
            <Text style={{ fontSize: 10, color: "white" }}>
              {temporaryQuantityDisplayInItemDetailScreem < 99
                ? temporaryQuantityDisplayInItemDetailScreem
                : "99+"}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 5,
    marginBottom: 10,
    zIndex: 10,
    backgroundColor: "white",
  },

  leftSide: {
    width: "35%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  rightSide: {
    width: "35%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  item: {
    paddingHorizontal: 5,
  },

  appName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  quantityIcon: {
    width: 20,
    height: 20,
    backgroundColor: "red",
    borderRadius: 50,
    position: "relative",
    bottom: 10,
    right: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    fontWeight: "200",
  },
});
