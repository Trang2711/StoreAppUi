
import React from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'

const CardItemSmall = ({ props }: any) => {
    const { id, srcImg, title } = props.item
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={{ uri: srcImg }} >
            </ImageBackground>
            <Text style={styles.title}>{title}</Text>
        </View>
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