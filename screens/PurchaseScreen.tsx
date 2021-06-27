import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { baseUrl } from "../api/AxiosClient";
import { MaterialIcons } from '@expo/vector-icons';
import ProductApi from '../api/ProductApi'

// const data = [

//         'thumbnail': thumbnail,
//         'shipping': {
//             'date': order.shippingDate,
//             'fee': order.shippingCost,
//             'method': order.shippingMethod
//         },
//         'status': order.order_status,
//         'cost': order.finalCost,
//         'payment': order.paymentMethod,
//     }
// ]
export default function PurchaseScreen({ navigation }: any) {
    const [purchase, setPurchase] = useState<any>()

    const _fomatNumber1 = (num: number) => {
        const formatter = new Intl.NumberFormat("us");
        return formatter.format(num);
    };


    const fetchData = async () => {
        const data = await ProductApi.getAllPurchase() as any
        setPurchase(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const renderProduct = (productItem: any) => {
        const {
            id,
            thumbnail,
            cost,
            numProduct,
            shipping,
            payment
        } = productItem;
        return (
            <View key={id} style={styles.containerOfProduct}>
                <Pressable
                    onPress={() =>
                        navigation.navigate(
                            "PurchaseDetailsScreen",
                            { id: id },
                        )
                    }
                >
                    <View style={styles.content}>
                        <ImageBackground
                            style={styles.image}
                            source={{ uri: `${baseUrl}/${thumbnail}` }}
                        ></ImageBackground>

                        <View style={styles.content_area}>
                            <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: "bold" }}>
                                Đơn hàng {id}
                            </Text>
                            <View style={styles.quantity_area}>
                                <Text style={{ fontSize: 14, marginRight: 5 }}>Số lượng: {numProduct}</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 7 }}>
                                <Text>Thành tiền: </Text>
                                <Text style={{ color: 'red', fontWeight: "bold", marginLeft: 2 }}>{_fomatNumber1(cost)}đ</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.details}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {
                                shipping.method !== '' && <>
                                    <Text style={{ color: "gray", fontSize: 14 }}>{shipping.method}</Text>
                                    <Text style={{ color: "gray", fontSize: 14, marginTop: 2 }}>{shipping.date}</Text>
                                </>

                            }
                        </View>
                        {
                            payment !== '' && <Text style={{ color: "gray", fontSize: 14 }}>{payment}</Text>
                        }
                        
                    </View>
                </Pressable>

                {/* <View style={styles.review}>
                    <View>
                        <Text style={{ color: "gray", fontSize: 14 }}>{payment}</Text>
                    </View>
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
                </View> */}
            </View>
        );
    };
    return (
        <ScrollView>
            <View>
                {
                    purchase && purchase.map((item: any) => renderProduct(item))
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerOfProduct: {
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
        // flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "space-between",
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
