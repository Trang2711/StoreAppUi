import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/searchScreen/Header'
import SearchApi from '../api/SearchApi'

export default function SearchScreen({ navigation }: any) {


  return (
    <SafeAreaView>
      <View style={{height: "100%"}}>
        <Header
          navigation={navigation}
        />

      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
 
});
