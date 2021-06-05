import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, ScrollView, View, FlatList, Image } from "react-native";

const Pagination = ({ children, renderItem, paging, onPageChange, data, columnWrapperStyle, style, numColumns }: any) => {
  const [IsloadingMoreItem, setIsloadingMoreItem] = useState(false);

  const { total, perPage, currentPage } = paging
  const totalPage = Math.ceil(total / perPage)

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
          numColumns={numColumns}
          horizontal={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item : any) => item.id}
          
          columnWrapperStyle={columnWrapperStyle}
          style = {style}
        />
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