import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import ColorCircle from "../common/ColorCircle";
import UserAPI from "../../api/UserApi";

export default function AddingToCartModal({
  colors,
  navigation,
  onClick,
  seller,
}: any) {
  const { height, width } = Dimensions.get("window");
  const [modalVisible, setModalVisible] = useState(false);
  const [colorSelected, setColorSelected] = useState<string>();
  const handleSelectColor = (flag: "ADD" | "REMOVE", color: any) => {
    if (flag === "ADD") setColorSelected(color.value);
    else if (flag === "REMOVE") {
      if (colorSelected === color.value) {
        setColorSelected(undefined);
      }
    }
  };

  const [username, setUsername] = useState('')

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const info = await UserAPI.getInfo() as any
        setUsername(info.username)
      } catch (error) {
        console.log('Failed to fetch info of user in adding to cart: ', error)
      }
    }

    fetchUsername()
  }, [])

  const onClickAddToCart = () => {
    setModalVisible(false);
    if (onClick) onClick(colors.length, 1);
  };

  return (
    <>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.chatBtn}
          onPress={async () =>
            navigation.navigate("BottomNav", {
              screen: "Chat",
              params: {
                screen: "ChatDetailScreen",
                params: {
                  seller: seller,
                  customer: username,
                },
              },
            })
          }
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Thêm vào giỏ hàng
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={
          modalVisible && {
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            height: height,
            width: width,
            zIndex: 100,
          }
        }
      ></View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("open modal");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            position: "relative",
            top: height - 175,
            backgroundColor: "white",
          }}
        >
          <View style={styles.headerModal}>
            <Text>Chọn màu sắc</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign name="close" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyModal}>
            {colors.map((item: any, index: any) => (
              <ColorCircle
                key={index}
                item={item}
                onPress={handleSelectColor}
              />
            ))}
          </View>
          <View style={styles.footerModal}>
            {colorSelected ? (
              <TouchableOpacity
                style={styles.addToCart}
                onPress={onClickAddToCart}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Thêm vào giỏ hàng
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.addToCartDisable}>
                <Text style={{ color: "white", fontSize: 16 }}>
                  Thêm vào giỏ hàng
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#DDDDDD",
  },
  bodyModal: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#DDDDDD",
  },
  footerModal: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  footer: {
    borderTopColor: "#DDDDDD",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    backgroundColor: "white",
  },
  addToCartBtn: {
    backgroundColor: "black",
    width: "70%",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  chatBtn: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  addToCart: {
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  addToCartDisable: {
    backgroundColor: "#DDDDDD",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
});
