import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, ScrollView, View, FlatList, Image } from "react-native";

import CardItem from './cardItem/CartItem'
import ProductApi from "../../api/ProductApi";

const Pagination = ({ children, renderItem, paging, onPageChange, data }: any) => {
  const [IsloadingMoreItem, setIsloadingMoreItem] = useState(false);

  const { total, perPage, currentPage } = paging
  const totalPage = Math.ceil(total / perPage)

  console.log(totalPage)
  const handlePageChange = () => {
    if (currentPage >= totalPage) return
    if (onPageChange) {
      onPageChange(currentPage + 1)
      setIsloadingMoreItem(true)
    }
  }

  useEffect(() => {
    setIsloadingMoreItem(false)
  }, [currentPage])

  const onMomentumScrollEnd = (e: any) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
    const contentHeight = e.nativeEvent.contentSize.height;
    const isScrollToBottom = scrollViewHeight + scrollPosition;

    if (isScrollToBottom >= contentHeight - 1) {
      handlePageChange()
    }
  }

  return (
    <ScrollView onMomentumScrollEnd={onMomentumScrollEnd}
    >
      {children}
        <FlatList
          numColumns={2}
          horizontal={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item : any) => item.id}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: "space-between",
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          {
            data && data.map((item: { id: any; }) => (
              <CardItem
                key={item.id}
                props={item} />
            ))
          }
        </FlatList>
      {IsloadingMoreItem ? (
        <ActivityIndicator size="large" color="black" />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  moreItemContainer: {
    marginLeft: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});


export default Pagination;