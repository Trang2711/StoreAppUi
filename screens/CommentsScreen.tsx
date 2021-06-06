import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Pressable,
} from "react-native";
import { Text, View } from "../components/Themed";
import { MaterialIcons } from "@expo/vector-icons";

import Pagination from "../components/common/Pagination";
import ProductApi from "../api/ProductApi";
import Comment from "../components/common/Comment";
import "intl";
import "intl/locale-data/jsonp/en";

export default function SearchScreen({ route, navigation }: any) {
  const { product_id } = route.params;
  const [isSelected, setIsSelected] = useState("Tất cả")
  const [comments, setComments] = useState([]);
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState<any>({
    product: product_id,
    star: null,
    hasImage: false,
    hasComment: false,
  })

  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 11,
  });

  const [_paging, setPaging] = useState({
    currentPage: 1,
    perPage: 10,
  });

  const fetchComments = async (id: any) => {
    try {
      const request = {
        ...filter,
        paging: _paging,
      };
      const responce = await ProductApi.getCommentsOfProduct(request);
      const { reviews, paging } = responce as any;
      if (paging.currentPage === 1) {
        setComments(reviews);
      } else setComments(comments.concat(reviews));

      setPagination(paging);
    } catch (error) {
      console.log("Failed to fetch comments in comments screen: " + error);
    }
  };

  useEffect(() => {
    fetchComments(product_id)
  }, [])

  useEffect(() => {
    fetchComments(product_id);
  }, [_paging]);

  const renderItem = ({ item }: any) => (
    <Comment item={item} navigation={navigation} />
  );

  const handlePaginationChange = (newPage: number) => {
    setPaging({ ..._paging, currentPage: newPage });
  };

  const _fomatNumber = (num: number) => {
    const formatter = new Intl.NumberFormat("en", {
      notation: "compact",
    });

    return formatter.format(num);
  };

  return (
    <Pagination
      renderItem={renderItem}
      paging={pagination}
      onPageChange={handlePaginationChange}
      data={comments}
      style={{ paddingHorizontal: 15, backgroundColor: 'white' }}
      numColumns={1}
    >
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 10,
          borderBottomColor: "#DDDDDD",
          borderBottomWidth: 0.5,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Pressable
            style={
              isSelected === "Tất cả"
                ? { ...styles.filterOption, ...styles.active, width: "32%" }
                : { ...styles.filterOption, width: "32%" }
            }
            onPress={() => {
              setFilter({
                product: product_id,
                star: null,
                hasImage: false,
                hasComment: false,
              })
              setPaging({ ..._paging, currentPage: 1 })
              setIsSelected("Tất cả")
            }}
          >
            <Text>Tất cả</Text>
            <Text style={{ fontSize: 12 }}>{_fomatNumber(total)}</Text>
          </Pressable>
          <Pressable
            style={
              isSelected === "Có hình ảnh"
                ? { ...styles.filterOption, ...styles.active, width: "32%" }
                : { ...styles.filterOption, width: "32%" }
            }
            onPress={() => {
              setFilter({
                product: product_id,
                star: null,
                hasImage: true,
                hasComment: false,
              })
              setPaging({ ..._paging, currentPage: 1 })
              setIsSelected("Có hình ảnh")
            }}
          >
            <Text>Có hình ảnh</Text>
            <Text style={{ fontSize: 12 }}>{_fomatNumber(total)}</Text>
          </Pressable>
          <Pressable
            style={
              isSelected === "Có bình luận"
                ? { ...styles.filterOption, ...styles.active, width: "32%" }
                : { ...styles.filterOption, width: "32%" }
            }
            onPress={() => {
              setFilter({
                product: product_id,
                star: null,
                hasImage: false,
                hasComment: true,
              })
              setPaging({ ..._paging, currentPage: 1 })
              setIsSelected("Có bình luận")
            }}
          >
            <Text>Có bình luận</Text>
            <Text style={{ fontSize: 12 }}>{_fomatNumber(total)}</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Pressable
            style={
              isSelected === "1 sao"
                ? { ...styles.filterOption, ...styles.active, width: "19%" }
                : { ...styles.filterOption, width: "19%" }
            }
            onPress={() => {
              setFilter({
                product: product_id,
                star: 1,
                hasImage: false,
                hasComment: false,
              })
              setPaging({ ..._paging, currentPage: 1 })
              setIsSelected("1 sao")
            }}
          >
            <View
              style={
                isSelected === "1 sao"
                  ? { ...styles.starContainer, backgroundColor: "white" }
                  : styles.starContainer
              }
            >
              <Text>1</Text>
              <MaterialIcons name="star" size={16} color="#eec82c" />
            </View>
            <Text style={{ fontSize: 12 }}>{_fomatNumber(total)}</Text>
          </Pressable>

          <Pressable
            style={
              isSelected === "2 sao"
                ? { ...styles.filterOption, ...styles.active, width: "19%" }
                : { ...styles.filterOption, width: "19%" }
            }
            onPress={() => {
              setFilter({
                product: product_id,
                star: 2,
                hasImage: false,
                hasComment: false,
              })
              setPaging({ ..._paging, currentPage: 1 })
              setIsSelected("2 sao")
            }}
          >
            <View
              style={
                isSelected === "2 sao"
                  ? { ...styles.starContainer, backgroundColor: "white" }
                  : styles.starContainer
              }
            >
              <Text>2</Text>
              <MaterialIcons name="star" size={16} color="#eec82c" />
            </View>
            <Text style={{ fontSize: 12 }}>{_fomatNumber(total)}</Text>
          </Pressable>

          <Pressable
            style={
              isSelected === "3 sao"
                ? { ...styles.filterOption, ...styles.active, width: "19%" }
                : { ...styles.filterOption, width: "19%" }
            }
            onPress={() => {
              setFilter({
                product: product_id,
                star: 3,
                hasImage: false,
                hasComment: false,
              })
              setPaging({ ..._paging, currentPage: 1 })
              setIsSelected("3 sao")
            }}
          >
            <View
              style={
                isSelected === "3 sao"
                  ? { ...styles.starContainer, backgroundColor: "white" }
                  : styles.starContainer
              }
            >
              <Text>3</Text>
              <MaterialIcons name="star" size={16} color="#eec82c" />
            </View>
            <Text style={{ fontSize: 12 }}>{_fomatNumber(total)}</Text>
          </Pressable>

          <Pressable
            style={
              isSelected === "4 sao"
                ? { ...styles.filterOption, ...styles.active, width: "19%" }
                : { ...styles.filterOption, width: "19%" }
            }
            onPress={() => {
              setFilter({
                product: product_id,
                star: 4,
                hasImage: false,
                hasComment: false,
              })
              setPaging({ ..._paging, currentPage: 1 })
              setIsSelected("4 sao")
            }}
          >
            <View
              style={
                isSelected === "4 sao"
                  ? { ...styles.starContainer, backgroundColor: "white" }
                  : styles.starContainer
              }
            >
              <Text>4</Text>
              <MaterialIcons name="star" size={16} color="#eec82c" />
            </View>
            <Text style={{ fontSize: 12 }}>{_fomatNumber(total)}</Text>
          </Pressable>

          <Pressable
            style={
              isSelected === "5 sao"
                ? { ...styles.filterOption, ...styles.active, width: "19%" }
                : { ...styles.filterOption, width: "19%" }
            }
            onPress={() => {
              setFilter({
                product: product_id,
                star: 5,
                hasImage: false,
                hasComment: false,
              })
              setPaging({ ..._paging, currentPage: 1 })
              setIsSelected("5 sao")
            }}
          >
            <View
              style={
                isSelected === "5 sao"
                  ? { ...styles.starContainer, backgroundColor: "white" }
                  : styles.starContainer
              }
            >
              <Text>5</Text>
              <MaterialIcons name="star" size={16} color="#eec82c" />
            </View>
            <Text style={{ fontSize: 12 }}>{_fomatNumber(total)}</Text>
          </Pressable>
        </View>
      </View>
    </Pagination>
  );
}

const styles = StyleSheet.create({
  active: {
    borderColor: "black",
    backgroundColor: "white",
  },
  filterOption: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
    borderColor: "#F1F3F4",
    backgroundColor: "#F1F3F4",
    borderWidth: 1,
  },
  starContainer: {
    backgroundColor: "#F1F3F4",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
});
