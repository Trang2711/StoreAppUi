import React, { useState } from 'react';

import { StyleSheet, TextInput, View, TouchableOpacity, SafeAreaView, Text } from "react-native";
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

export default function Header({ navigation,  getSuggestedValues, handleSearchSubmit}: any) {
    const [searchValue, updateSearchValue] = useState('');

    const handleSearchChange = (value: string) => {
        updateSearchValue(value)
        if(getSuggestedValues) return
        getSuggestedValues(value)
    }

    const onSubmit = () => {
        if(handleSearchSubmit)
            return
        handleSearchSubmit(searchValue)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                    name="chevron-back-outline"
                    size={24}
                    color="black" />
            </TouchableOpacity>

            <TextInput
                style={styles.searchBar}
                placeholder="Tìm kiếm với Ponzi"
                returnKeyType="search"
                autoFocus={true}
                onChangeText={handleSearchChange}
                value={searchValue}
                clearButtonMode="always"
            />

            <TouchableOpacity onPress={onSubmit}>
                <Text style={styles.searchBtn}> Tìm kiếm </Text>
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 5,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: "#DDDDDD"
    },
    searchBar: {
        width: '65%',
        fontSize: 15,
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: "#F1F3F4",
        borderRadius: 3,
    },
    searchBtn: {
        backgroundColor: "#DDDDDD",
        fontSize: 15,
        color: "black",
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderRadius: 3,
    }
});
