import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";


import StarRating from "../common/StarRating";
import Comment from "../common/Comment";

export default function Comments({ navigation, productId, comments }: any) {
    
  const handleShowMoreComments = () => {
    // navigation.navigate("CommentsScreen", {
    //   product_id: productId,
    // });

    console.log("prodcut code:", productId)
    navigation.navigate("ProductReviewsScreen", {
        productId: productId,
      });
  };

    return (
          <View style={{ ...styles.wrapper, marginTop: 10 }}>
            <Text style={styles.title}>Đánh giá </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomColor: "#DDDDDD",
                borderBottomWidth: 0.5,
                paddingBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <StarRating num={4.5} fontSize={20} />
                <Text style={{ color: "gray", fontSize: 12, marginLeft: 5 }}>
                  4.9/5
                </Text>
              </View>
              <Text style={styles.textSmall}>{`(1.9k đánh giá)`}</Text>
            </View>
  
            <View>
              {comments.map((item: any) => {
                return <Comment item={item} />;
              })}
            </View>
  
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <TouchableOpacity onPress={handleShowMoreComments}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                >
                  Xem tất cả
                </Text>
              </TouchableOpacity>
            </View>
          </View>
    )
}


const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textSmall: {
    color: "gray",
    fontSize: 12,
  },
  });
  