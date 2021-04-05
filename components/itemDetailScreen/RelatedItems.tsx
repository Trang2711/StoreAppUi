import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

const RelatedItems = ({ allProducts }: any) => {
  console.log(allProducts.length)
  return (
    <View>
      <View>
        <Text
          style={[
            styles.centerItem,
            styles.text16,
            { backgroundColor: "#4287f5" },
            styles.mayBeUlike,
          ]}
        >
          Có thể bạn cũng thích
        </Text>
        <View style={styles.moreItemContainer}>
          {allProducts.map((product: any, index: any) => {
            return (
              <View key={index} style={styles.eachPost}>
                <Image
                  style={styles.moreItemImg}
                  source={{ uri: product.lapUrl[0] }}
                ></Image>
                <Text>Giá: 1 triệu</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default RelatedItems;

const styles = StyleSheet.create({
  text16: {
    fontSize: 16,
  },
  mayBeUlike: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  centerItem: {
    textAlign: "center",
  },
  moreItemContainer: {
    marginLeft: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
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
