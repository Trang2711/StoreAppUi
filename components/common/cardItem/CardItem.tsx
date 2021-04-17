import React from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { Fontisto } from '@expo/vector-icons'

const CardItem = ({ props }: any) => {
    const { id, srcImg, retialPrice, priceSale, dealsDiscount } = props
    return (
        <View nativeID={id} style={styles.container}>
            <ImageBackground style={styles.image} source={{ uri: srcImg }} >
                <View style={styles.flash}>
                    <Fontisto name="flash" size={15} color="black" />
                    <Text style={styles.dealsDiscount}>-{Math.round(priceSale/retialPrice)}%</Text>
                </View>
            </ImageBackground>
            <Text style={styles.priceSale}>{priceSale}đ</Text>
            <Text style={styles.retialPrice}>{retialPrice}đ</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 115,
        position: "relative",
        marginHorizontal: 4,
    },

    image: {
        width: "100%",
        height: 110,
        resizeMode: "center",
        // marginBottom: 7,
    },

    retialPrice: {
        fontSize: 12,
        color: "#999",
        textDecorationLine: "line-through",
    },

    priceSale: {
        fontSize: 13,
        color: "#d53332",
        fontWeight: "bold"
    },

    flash: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 28,
        height: 31,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fbc217",
        fontSize: 3,
        color: "black",
    },

    dealsDiscount: {
        fontWeight: "bold",
        fontSize: 9,
    }
});

export default CardItem