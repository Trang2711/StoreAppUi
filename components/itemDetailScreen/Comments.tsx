import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";


import StarRating from "../common/StarRating";
import Comment from "../common/Comment";


// const comments = [
//     {
//       id: "1",
//       avatar:
//         "https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//       username: "trang trinh",
//       star: 4,
//       create_date: "28/03/2020",
//       content:
//         "Giao hàng nhanh, sản phẩm chính hãng và có bảo hành nên rất yên tâm, shop tư vấn rất nhiệt tình, ",
//       images: [
//         "https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//         "https://images.pexels.com/photos/1113804/pexels-photo-1113804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//         "https://images.pexels.com/photos/2047904/pexels-photo-2047904.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//         "https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//       ],
//     },
  
//     {
//       id: "2",
//       avatar:
//         "https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//       username: "Phạm Tuấn Nghĩa",
//       star: 4,
//       create_date: "28/03/2020",
//       content:
//         "Giao hàng nhanh, sản phẩm chính hãng và có bảo hành nên rất yên tâm, shop tư vấn rất nhiệt tình, ",
//       images: [
//         "https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//         "https://images.pexels.com/photos/1113804/pexels-photo-1113804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//         "https://images.pexels.com/photos/2047904/pexels-photo-2047904.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//       ],
//     },
  
//     {
//       id: "3",
//       avatar:
//         "https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//       username: "Nguyễn Hữu Hùng",
//       star: 4,
//       create_date: "28/03/2020",
//       content:
//         "Giao hàng nhanh, sản phẩm chính hãng và có bảo hành nên rất yên tâm, shop tư vấn rất nhiệt tình, ",
//       images: [
//         "https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//         "https://images.pexels.com/photos/1113804/pexels-photo-1113804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//       ],
//     },
//   ];

export default function Comments({ navigation, productId, comments }: any) {
    
  const handleShowMoreComments = () => {
    // navigation.navigate("CommentsScreen", {
    //   product_id: productId,
    // });

    navigation.navigate("ProductReviewsScreen", {
        product_id: productId,
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
  