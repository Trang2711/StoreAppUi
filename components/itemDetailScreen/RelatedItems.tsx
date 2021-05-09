import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import DisplayItems from "./DisplayItems";

const RelatedItems = ({ allProducts }: any) => {
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
            return <DisplayItems product={product} key={index} />;
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
});
