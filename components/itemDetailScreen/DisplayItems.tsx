import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-elements/dist/image/Image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const DisplayItems = ({ product }: any) => {
  const baseUrl = "http://13.55.8.176:8080";
  const navigation = useNavigation();
  const handleClickedToSpecifiedItem = () => {
    navigation.navigate("TopNav", {
      screen: "NotificationsScreen",
      params: { itemId: product.product_code },
    });
  };
  return (
    <View>
      <TouchableOpacity onPress={handleClickedToSpecifiedItem}>
        <View style={styles.eachPost}>
          <Image
            style={styles.moreItemImg}
            source={{ uri: baseUrl + product.image }}
          ></Image>
          <Text>Giá: 1 triệu</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DisplayItems;

const styles = StyleSheet.create({
  eachPost: {
    marginRight: 8,
    marginTop: 5,
    marginBottom: 20,
  },
  moreItemImg: {
    width: 184,
    height: 150,
  },
});
