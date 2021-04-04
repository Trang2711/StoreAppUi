import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, Button, DrawerLayoutAndroid, Pressable  } from 'react-native';
import { Text, View } from '../components/Themed';
import { AntDesign } from '@expo/vector-icons';

import Header from '../components/filterScreen/Header'

export default function FilterScreen({ navigation, searchValue = 'laptop' }: any) {

  const drawer = useRef<DrawerLayoutAndroid>(null)

  const navigationView = () => (
    <View>
      <Text>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="right"
      renderNavigationView={navigationView}
    >
      <View style={{ height: "100%" }}>
        <Header
          navigation={navigation}
          defaultValue={searchValue}
        />
        <View style={styles.navigation}>
          <Text>Mới nhất</Text>
          <Text>Bán chạy</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 2 }}>Giá</Text>
            <AntDesign name="arrowdown" size={16} color="black" />
          </View>

          {
            drawer && <Pressable onPress={() => drawer?.current?.openDrawer()} style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 2 }}>Lọc</Text>
            <AntDesign name="filter" size={16} color="black" />
          </Pressable>
          }
        </View>
      </View>
    </DrawerLayoutAndroid>

  );
}

const styles = StyleSheet.create({
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#DDDDDD"
  }

});
