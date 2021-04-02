import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

const RelatedItems = ({ allProducts }: any) => {
  return (
    <View>
      <View>
        <Text
          style={[
            styles.centerItem,
            styles.text16,
            { backgroundColor: "#4287f5" },
          ]}
        >
          Co the ban cung thich
        </Text>
        <View style={styles.moreItemContainer}>
          {allProducts.map((product: any, index: any) => {
            return (
              <View key={index} style={styles.eachPost}>
                <Image
                  style={styles.moreItemImg}
                  source={{ uri: product.lapUrl[0] }}
                ></Image>
                <Text>Gia: 1 trieu</Text>
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
  },
  moreItemImg: {
    width: 184,
    height: 150,
  },
});
