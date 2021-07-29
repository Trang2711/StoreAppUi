
import React from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { baseUrl } from '../../../api/AxiosClient'

const CardItemSmall = ({props}: any) => {
    const { product_thumbnail, title } = props.item
    return (
        <TouchableOpacity
            style={styles.container}
        >
            <ImageBackground style={styles.image} source={{ uri: `${baseUrl}${product_thumbnail}` }} >
            </ImageBackground>
            <Text numberOfLines={2} style={styles.title}>{title}</Text>
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
        height: 105,
        resizeMode: "cover",
    },
    title: {
        fontSize: 12,
        paddingHorizontal: 10,
    }
});

export default CardItemSmall