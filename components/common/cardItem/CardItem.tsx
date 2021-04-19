import React from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import StarRating from '../StarRating'
import {baseUrl} from '../../../api/AxiosClient'

const CardItem = ({ props, navigation }: any) => {
    const { id, product_thumbnail, price, discount_price, sold, rating_average } = props

    const _fomatNumber = (num: number) => {
        const formatter = new Intl.NumberFormat('en', {
            notation: 'compact'
        })

        return formatter.format(num)
    }

    const _fomatNumber1 = (num: number) => {
        const formatter = new Intl.NumberFormat('us')
        return formatter.format(num)
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() =>
                navigation.navigate("ItemDetailScreen" )
            }
        >
            <ImageBackground style={styles.image} source={{ uri: `${baseUrl}${product_thumbnail}`}} >
                <View style={styles.flash}>
                    {/* <Text style={styles.dealsDiscount}>-{Math.round(discount_price / price)}%</Text> */}
                    <Text style={styles.dealsDiscount}>-{Math.round(30.54)}%</Text>
                </View>
            </ImageBackground>
            <Text numberOfLines={1} style={{ fontSize: 13, flex: 1, marginBottom: 5 }}>Macbook Air M1MXK32 / MXK62 - Macbook Pro 13</Text>
            <View style={{ flexDirection: 'row', marginBottom: 5}}>
                <Text numberOfLines={1} style={styles.priceSale}>{_fomatNumber1(parseInt("10000000"))}đ</Text>
                <Text numberOfLines={1} style={styles.retialPrice}>{_fomatNumber1(parseInt(price))}đ</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: "space-between",  alignItems: "center"}}>
                <StarRating num={parseFloat(rating_average)}/>
                <Text style={{ fontSize: 10, color: "gray" }}>Đã bán {_fomatNumber(parseInt(sold))}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        marginHorizontal: 3,
        backgroundColor: 'white',
        paddingHorizontal: 7,
        paddingBottom: 10
    },

    image: {
        width: "100%",
        height: 140,
        resizeMode: "cover"
    },

    retialPrice: {
        fontSize: 12,
        color: "#999",
        textDecorationLine: "line-through",
        flex: 1
    },

    priceSale: {
        fontSize: 13,
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
        color: 'white'
    }
});

export default CardItem