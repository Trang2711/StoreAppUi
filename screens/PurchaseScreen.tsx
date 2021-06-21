import React, {useEffect, useState} from 'react';
import { ImageBackground, Pressable } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { baseUrl } from "../api/AxiosClient";
import { MaterialIcons } from '@expo/vector-icons';
import ProductApi from '../api/ProductApi'

const data = [
    {
        id: "grgre",
        title: "Birddybag indian apache tee",
        product_thumbnail: "https://images.pexels.com/photos/8326316/pexels-photo-8326316.jpeg?cs=srgb&dl=pexels-kindel-media-8326316.jpg&fm=jpg",
        price: 320000,
        discount_price: 250000,
        total_price: 300000,
        count: 1,
        shipping_method: "Giao hàng nhanh",
        shipping_date: "T2, 03/05/2021",
    }
]
export default function PurchaseScreen({ navigation }: any) {
    const [purchase, setPurchase] = useState<any>()

    const _fomatNumber1 = (num: number) => {
        const formatter = new Intl.NumberFormat("us");
        return formatter.format(num);
    };


    const fetchData = async () => {
        const data = ProductApi.getAllPurchase() as any
        setPurchase(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const renderProduct = (productItem: any) => {
        const {
            id,
            title,
            product_thumbnail,
            price,
            discount_price,
            total_price,
            count,
            shipping_method,
            shipping_date
        } = productItem;
        return (
            <View key={id} style={styles.containerOfProduct}>
                <Pressable
                // onPress={() => navigation.navigate("PurchaseDetialsScreen")}
                >
                    <View style={styles.content}>
                        <ImageBackground
                            style={styles.image}
                            // source={{ uri: `${baseUrl}${product_thumbnail}` }}
                            source={{ uri: `${product_thumbnail}` }}
                        ></ImageBackground>

                        <View style={styles.content_area}>
                            <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: "bold" }}>
                                {title}
                            </Text>
                            <View
                                style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}
                            >
                                <Text style={styles.priceSale}>
                                    {_fomatNumber1(discount_price)}đ
                        </Text>
                                {discount_price < price && (
                                    <Text style={styles.price}>{_fomatNumber1(price)}đ</Text>
                                )}
                            </View>
                            <View style={styles.quantity_area}>
                                <Text style={{ fontSize: 14, marginRight: 5 }}>Số lượng:</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ paddingHorizontal: 3 }}> {count} </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.details}>
                        <View>
                            <Text style={{ color: "gray", fontSize: 14 }}>{shipping_method}</Text>
                            <Text style={{ color: "gray", fontSize: 14 }}>{shipping_date}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialIcons name="payment" size={25} color="red" />
                            <View style={{ flexDirection: "row", marginLeft: 7 }}>
                                <Text>Thành tiền: </Text>
                                <Text style={{ color: 'red' }}>{_fomatNumber1(total_price)}đ</Text>
                            </View>
                        </View>
                    </View>
                </Pressable>

                <View style={styles.review}>
                    <Text style={{ color: "gray", fontSize: 14 }}>Đã đánh giá</Text>
                    <Pressable
                        style={styles.repurchaseBtn}
                    // onPress={() =>
                    //     navigation.navigate("Root", {
                    //       screen: "ItemDetailScreen",
                    //       params: { id: id },
                    //     })
                    //   }
                    >
                        <Text style={{ color: 'white' }}>Mua lại</Text>
                    </Pressable>
                </View>
            </View>
        );
    };
    return (
        <ScrollView>
            <View>
                {
                    purchase.map((item: any) => renderProduct(item))
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerOfProduct: {
        // paddingVertical: 10,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: "white",
    },
    content: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 1,
    },
    image: {
        resizeMode: "cover",
        width: 120,
        height: 100,
        marginRight: 5,
    },
    content_area: {
        flex: 1,
    },
    quantity_area: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 7,
    },
    price: {
        fontSize: 11,
        color: "gray",
        textDecorationLine: "line-through",
    },
    priceSale: {
        fontSize: 15,
        fontWeight: "bold",
        marginRight: 6,
    },
    details: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 1,
    },
    review: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    repurchaseBtn: {
        backgroundColor: 'black',
        paddingHorizontal: 30,
        paddingVertical: 9
    }
});
