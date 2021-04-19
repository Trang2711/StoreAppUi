
import React from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'

const CardItemSmall = ({ item, navigation }: any) => {
    const { id, srcImg, title } = item
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() =>
                navigation.navigate("NotificationsScreen" )
            }
        >
            <ImageBackground style={styles.image} source={{ uri: srcImg }} >
            </ImageBackground>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 115,
        position: "relative",
        marginHorizontal: 6,
    },

    image: {
        width: "100%",
        height: 110,
        resizeMode: "center",
    },
    title: {
        fontSize: 11,
        paddingHorizontal: 10,
        textAlign: "center",
    }
});

export default CardItemSmall