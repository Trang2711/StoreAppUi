import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

import CardItemFlashSale from "../common/cardItem/CardItemFlashSale";
import { ScrollView } from "react-native-gesture-handler";

export default function FlashSale({ list, navigation }: any) {
  return (
    <View>
      <Text style={styles.title}>Flash sale</Text>
      <ScrollView
        style={{ paddingLeft: 5 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {list &&
          list.map((item: { id: any }) => (
            <CardItemFlashSale
              key={item.id}
              specialKey={item.id}
              props={item}
              navigation={navigation}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
});
