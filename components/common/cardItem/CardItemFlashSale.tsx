import React from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { Fontisto } from '@expo/vector-icons'
import {baseUrl} from '../../../api/AxiosClient'

const CardItemFlashSale = ({ props }: any) => {
    const { id, product_thumbnail, price, discount_price, } = props

    const _fomatNumber1 = (num: number) => {
        const formatter = new Intl.NumberFormat('us')
        return formatter.format(num)
    }

    return (
        <View nativeID={id} style={styles.container}>
            <ImageBackground style={styles.image} source={{ uri: `${product_thumbnail}` }} >
                <View style={styles.flash}>
                    <Fontisto name="flash" size={15} color="black" />
                    {/* <Text style={styles.dealsDiscount}>-{Math.round(priceSale/retialPrice)}%</Text> */}
                    <Text style={styles.dealsDiscount}>-{Math.round(30.54)}%</Text>
                </View>
            </ImageBackground>
            <Text numberOfLines={1} style={styles.priceSale}>{_fomatNumber1(parseInt("10000000"))}đ</Text>
                <Text numberOfLines={1} style={styles.retialPrice}>{_fomatNumber1(parseInt(price))}đ</Text>
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

export default CardItemFlashSale