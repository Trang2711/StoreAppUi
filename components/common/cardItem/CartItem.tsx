import React from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import StarRating from '../StarRating'
import {baseUrl} from '../../../api/AxiosClient'

const CardItem = ({ props }: any) => {
    const { id, product_thumbnail, price, discount_price, sold, rating_average } = props

    const _fomatNumber = (num: number) => {
        const formatter = new Intl.NumberFormat('en', {
            notation: 'compact'
        })
        return formatter.format(num)
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={{ uri: `${baseUrl}${product_thumbnail}`}} >
                <View style={styles.flash}>
                    {/* <Fontisto name="flash" size={15} color="black" /> */}
                    <Text style={styles.dealsDiscount}>-{Math.round(discount_price / price)}%</Text>
                </View>
            </ImageBackground>
            <View style={{ flexDirection: 'row', marginBottom: 5}}>
                <Text style={styles.priceSale}>{discount_price}đ</Text>
                <Text style={styles.retialPrice}>{price}đ</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: "space-between",  alignItems: "center"}}>
                <StarRating num={parseFloat(rating_average)}/>
                <Text style={{ fontSize: 11, color: "gray" }}>Đã bán {_fomatNumber(parseInt(sold))}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "47%",
        position: "relative",
        marginHorizontal: 4,
    },

    image: {
        width: "100%",
        height: 110,
        resizeMode: "center",
        marginBottom: 7,
    },

    retialPrice: {
        fontSize: 14,
        color: "#999",
        textDecorationLine: "line-through",
    },

    priceSale: {
        fontSize: 14,
        color: "#d53332",
        fontWeight: "bold",
        marginRight: 10,
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
        backgroundColor: "black",
        color: "white",
    },

    dealsDiscount: {
        fontWeight: "bold",
        fontSize: 9,
    }
});

export default CardItem