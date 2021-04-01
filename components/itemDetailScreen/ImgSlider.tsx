import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Text,
  View,
} from "react-native";
const { width } = Dimensions.get("window");
const height = (width * 100) / 60;
const ImgSlider = ({ itemImg }: any) => {
  const [activePage, setActivePage] = useState(0);
  function change({ nativeEvent }: any) {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== activePage) {
      setActivePage(slide);
    }
  }
  return (
    <View>
      <View style={styles.scrollArea}>
        <ScrollView
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          onScroll={change}
          style={styles.scroll}
        >
          {itemImg.map((item: any, index: any) => (
            <View key={index}>
              <Image
                style={[styles.image, { width }]}
                resizeMode={"contain"}
                source={{ uri: item }}
              ></Image>
            </View>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {itemImg.map((item: any, k: any) => (
            <Text
              key={k}
              style={k == activePage ? styles.activePageIcon : styles.pagesIcon}
            >
              ⬤
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ImgSlider;

const styles = StyleSheet.create({
  scrollArea: {
    height: 245,
  },
  image: {
    height: 220,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  scroll: { width, height },
  pagesIcon: {
    color: "#888",
    margin: 3,
  },
  activePageIcon: {
    color: "black",
    margin: 3,
  },
});
