import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/searchScreen/Header'
import SearchAndFiltersApi from '../api/SearchAndFiltersApi'

interface Product {
  id: any;
  const: string;
  rating: number;
  image: string;
  count: number;
}

const searchHistory1 = [
  "trang",
  "trinh trang",
  "trinh thi thu trang",
  "trinh thi trang",
];

export default function SearchScreen({ navigation }: any) {

  // const [searchHistory, setSearchHistory] = useState<Array<string>>([])
  const [suggestedValues, setSuggestedValues] = useState<string | undefined>()
  const [searchValue, setSearchValue] = useState<string | undefined>('')


  // useEffect(() => {
  //   const fetchSearchHistory = async () => {
  //     const data = await SearchApi.getSearchHistory();
  //     setSearchHistory(data as any);
  //   };
  //   fetchSearchHistory();
  // }, []);

  const fetchSuggestedValues = async (value: string) => {
    const request = {
      key: value
    }
    const data = await SearchAndFiltersApi.getSuggestedValues(request)
    const _data = data as any
    // console.log(_data)
    setSuggestedValues(_data.keyword)
  }

  const getSuggestedValues = (value: string) => {
    if (value !== '')
      fetchSuggestedValues(value)
  }

  // const clearSearchHistory = () => {
  //   console.log("clear history");
  // };

  const handleSearchSubmit = (value: string) => {
    console.log("chuyen sang filter screen")
    navigation.navigate('FilterScreen', {
      searchKeywords: value
    })
  }

  // const _renderSearchHistory = () => {
  //   return (
  //     <View style={{ paddingHorizontal: 10 }}>
  //       <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
  //         <Text style={styles.title}>Tìm kiếm gần đây</Text>
  //         <TouchableOpacity
  //           onPress={clearSearchHistory}
  //           style={{ flexDirection: "row", alignItems: "center" }}
  //         >
  //           <Ionicons name="ios-trash-outline" size={19} color="#757575" />
  //           <Text style={{ fontSize: 13, color: "#757575", marginLeft: 3 }}>
  //             Xóa
  //           </Text>
  //         </TouchableOpacity>
  //       </View>

  //       <View style={styles.tagContainer}>
  //         {searchHistory.map((item) => (
  //           <Text style={styles.suggestionTag} numberOfLines={1}>
  //             {item}
  //           </Text>
  //         ))}
  //       </View>
  //     </View>
  //   );
  // };

  const _renderSuggestedValues = () => {
    return (
      <View>
        {
          suggestedValues !== ''
            ? <Pressable style={styles.suggestedValue} onPress={() => setSearchValue(suggestedValues)}>
              <Text style={{ fontSize: 15 }}>{suggestedValues}</Text>
            </Pressable>
            : <></>
        }

      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={{ height: "100%" }}>
        <Header
          navigation={navigation}
          getSuggestedValues={getSuggestedValues}
          handleSearchSubmit={handleSearchSubmit}
          searchValueInit={searchValue}
        />
        {
          _renderSuggestedValues()
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 15,
  },
  clearBtn: {},
  suggestionTag: {
    padding: 5,
    color: "#757575",
    backgroundColor: "#F1F3F4",
    fontSize: 13,
    borderRadius: 3,
    marginRight: 10,
    marginBottom: 15,
  },
  suggestedValue: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#DDDDDD",
  },
});
