import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View, Text,
    ScrollView,
    TouchableOpacity,
    Modal,
    CheckBox,
    ActivityIndicator,
    ImageBackground,

} from 'react-native';
import { useAppSelector, useAppDispatch } from "../redux/app/hook";
import ProductItem from "../components/cartScreen/ProductItem";
import { baseUrl } from "../api/AxiosClient";
import {
    productsInsideCart,
    totalPrice,
} from "../redux/features/cartSlice";
import { addressOfUser } from "../redux/features/addressSlice";
import UserApi from '../api/UserApi';
import { AntDesign } from '@expo/vector-icons';

const paymentMethodList = [
    {
        value: '',
        label: 'Thanh toán khi nhận hàng'
    },
    {
        value: '',
        label: 'Thanh toán bằng thẻ Visa'
    }
]

const EXPRESS = 1
const STANDARD = 2
const SAVING = 3

export default function PaymentScreen({ navigation }: any) {
    const productList = useAppSelector(productsInsideCart);
    const totalPriceOfProduct = useAppSelector(totalPrice)
    const address = useAppSelector<any>(addressOfUser)
    const [paymentMethod, setPaymentMethod] = useState('Thanh toán khi nhận hàng')
    const [shippingMethodSelected, setShippingMethodSelected] = useState(STANDARD)
    const [shippingMethod, setshippingMethod] = useState<any>()

    const [modalVisible, setModalVisible] = useState(false);
    const [modalShippingVisible, setModalShippingVisible] = useState(false);

    const dispatch = useAppDispatch();

    const fetchOrderAddress = async () => {
        const data = await UserApi.setAddress(address)
        setshippingMethod(data as any)
    }

    useEffect(() => {
        if (address) {
            fetchOrderAddress()
        }
    }, [address])


    const _fomatNumber1 = (num: number) => {
        const formatter = new Intl.NumberFormat("us");
        return formatter.format(num);
    };

    const getShippingMethod = (id: any) => {
        if (id === EXPRESS) return {
            name: 'Vận chuyển nhanh',
            fee: shippingMethod.express.fee,
            date: shippingMethod.express.date
        }
        if (id === STANDARD) return {
            name: 'Vận chuyển tiêu chuẩn',
            fee: shippingMethod.standard.fee,
            date: shippingMethod.standard.date
        }
        if (id === SAVING) return {
            name: 'Vận chuyển tiết kiệm',
            fee: shippingMethod.saving.fee,
            date: shippingMethod.saving.date
        }
    }

    const onSubmit = () => {
    }

    const renderAddress = () => {
        return (
            <View style={{ ...styles.container, marginTop: 0 }}>
                {
                    address && <>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.title}>Địa chỉ nhận hàng</Text>
                            <Text
                                style={{ textDecorationLine: 'underline' }}
                                onPress={() => navigation.navigate('AddressScreen')}
                            >Thay đổi</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 15 }}>{`${address.address}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`}</Text>
                            <Text style={{ fontSize: 15, marginTop: 3 }}>{address.user}</Text>
                            <Text style={{ fontSize: 15 }}>{address.phoneNumber}</Text>
                        </View>
                    </>
                }
            </View>
        )
    }

    const renderPaymentMethod = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Phương thức thanh toán</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{ fontSize: 15 }}>{paymentMethod}</Text>
                    <Text
                        style={{ textDecorationLine: 'underline' }}
                        onPress={() => setModalVisible(true)}
                    >
                        Thay đổi
                        </Text>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalContainer}>
                        {
                            paymentMethodList.map((item: any, index: any) =>
                                <TouchableOpacity key={index} onPress={() => {
                                    setPaymentMethod(item.label)
                                    setModalVisible(false)
                                }}>
                                    <Text style={styles.paymentMethodItem}>{item.label} </Text>
                                </TouchableOpacity>

                            )
                        }
                    </View>
                </Modal>

            </View>
        )
    }

    const renderShippingMethod = () => {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>Hình thức vận chuyển</Text>
                    <Text
                        style={{ textDecorationLine: 'underline' }}
                        onPress={() => setModalShippingVisible(true)}
                    >Thay đổi</Text>
                </View>
                {
                    shippingMethod && <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 15 }}>{getShippingMethod(shippingMethodSelected)!.name}</Text>
                            <Text style={{ color: 'gray', fontSize: 13, marginTop: 5 }}>Đơn vị vận chuyển: Giao hàng nhanh</Text>
                            <Text style={{ color: 'gray', fontSize: 13 }}>Nhận hàng dự kiến vào {getShippingMethod(shippingMethodSelected)!.date}</Text>
                        </View>
                        <Text>{_fomatNumber1(getShippingMethod(shippingMethodSelected)!.fee)}đ</Text>
                    </View>
                }

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalShippingVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalShippingVisible);
                    }}
                >
                    <View style={{ backgroundColor: 'white', paddingTop: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 20, }}>
                            <Text style={styles.modalTitle}>Chọn hình thức vận chuyển</Text>
                            <AntDesign
                                name="close"
                                size={24}
                                color="black"
                                onPress={() => setModalShippingVisible(false)}
                            />
                        </View>
                        {
                            shippingMethod && <View style={{ paddingHorizontal: 15, paddingTop: 5 }}>
                                <View style={styles.shippingMethodContainer}>
                                    <CheckBox
                                        value={shippingMethodSelected === EXPRESS && true}
                                        onValueChange={() => setShippingMethodSelected(EXPRESS)}
                                        style={styles.checkbox}
                                    />
                                    <View style={{ width: '83%' }}>
                                        <View style={styles.shippingTitle}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Vận chuyển nhanh</Text>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>{_fomatNumber1(shippingMethod.express.fee)}đ</Text>
                                        </View>

                                        <Text style={{ color: 'black', fontSize: 15, marginTop: 5 }}>Đơn vị: Giao hàng nhanh</Text>
                                        <Text style={{ color: 'black', fontSize: 15 }}>Nhận hàng vào {shippingMethod.express.date}</Text>
                                    </View>
                                </View>


                                <View style={styles.shippingMethodContainer}>
                                    <CheckBox
                                        value={shippingMethodSelected === STANDARD && true}
                                        onValueChange={() => setShippingMethodSelected(STANDARD)}
                                        style={styles.checkbox}
                                    />
                                    <View style={{ width: '83%' }}>
                                        <View style={styles.shippingTitle}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Vận chuyển thường</Text>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>{_fomatNumber1(shippingMethod.standard.fee)}đ</Text>
                                        </View>

                                        <Text style={{ color: 'black', fontSize: 15, marginTop: 5 }}>Đơn vị: Giao hàng nhanh</Text>
                                        <Text style={{ color: 'black', fontSize: 15 }}>Nhận hàng vào {shippingMethod.standard.date}</Text>
                                    </View>
                                </View>

                                <View style={styles.shippingMethodContainer}>
                                    <CheckBox
                                        value={shippingMethodSelected === SAVING && true}
                                        onValueChange={() => setShippingMethodSelected(SAVING)}
                                        style={styles.checkbox}
                                    />
                                    <View style={{ width: '83%' }}>
                                        <View style={styles.shippingTitle}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Vận chuyển tiết kiệm</Text>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>{_fomatNumber1(shippingMethod.saving.fee)}đ</Text>
                                        </View>

                                        <Text style={{ color: 'black', fontSize: 15, marginTop: 5 }}>Đơn vị: Giao hàng nhanh</Text>
                                        <Text style={{ color: 'black', fontSize: 15 }}>Nhận hàng vào {shippingMethod.saving.date}</Text>
                                    </View>
                                </View>
                            </View>

                        }
                    </View>

                </Modal>
            </View >
        )
    }

    const renderProduct = (productItem: any) => {
        const {
            id,
            title,
            product_thumbnail,
            price,
            discount_price,
            sold,
            rating_average,
            count,
        } = productItem
        return (
            <View key={id} style={styles.containerOfProduct}>
                <ImageBackground
                    style={styles.image}
                    source={{ uri: `${baseUrl}${product_thumbnail}` }}
                ></ImageBackground>

                <View style={styles.content_area}>
                    <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: "bold" }}>
                        {title}
                    </Text>
                    <View
                        style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}
                    >
                        <Text style={styles.priceSale}>{_fomatNumber1(discount_price)}đ</Text>
                        {discount_price < price && <Text style={styles.price}>{_fomatNumber1(price)}đ</Text>}
                    </View>
                    <View style={styles.quantity_area}>
                        <Text style={{ fontSize: 14, marginRight: 5 }}>Số lượng:</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ paddingHorizontal: 3 }}> {count} </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    return (
        <>
            {
                !shippingMethod
                    ? <ActivityIndicator size="large" />
                    : <>
                        <ScrollView>
                            {renderAddress()}
                            <View style={{ ...styles.container, paddingHorizontal: 0 }}>
                                {
                                    productList.map((productItem, index) => (
                                        renderProduct(productItem)
                                    ))
                                }
                            </View>
                            {renderPaymentMethod()}
                            {address && renderShippingMethod()}
                        </ScrollView>
                        <View style={styles.payment_area}>
                            <View style={styles.moneyContainer}>
                                <Text style={{ fontSize: 15 }}>
                                    Thành tiền
              </Text>
                                <Text
                                    style={{ fontSize: 17, color: "#d53332", fontWeight: "bold" }}
                                >
                                    {_fomatNumber1(totalPriceOfProduct + getShippingMethod(shippingMethodSelected)!.fee)}₫
              </Text>
                            </View>
                            <TouchableOpacity onPress={onSubmit}>
                                <Text style={styles.paymentBtn} >Đặt hàng</Text>
                            </TouchableOpacity>

                        </View>
                    </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        marginVertical: 5
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    payment_area: {
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    moneyContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
    paymentBtn: {
        backgroundColor: "black",
        color: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 15,
        marginLeft: 10,
    },
    modalContainer: {
        backgroundColor: 'white',
        position: 'relative',
        top: '50%',
        transform: [{ translateY: -50 }],
        paddingVertical: 20,
        paddingHorizontal: 20,
        elevation: 5,
    },
    paymentMethodItem: {
        paddingVertical: 12,
        fontSize: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    shippingMethodContainer: {
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    shippingTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    checkbox: {
        marginRight: 10,
    },
    containerOfProduct: {
        backgroundColor: "white",
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 3,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
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
        // color: "#d53332",
        marginRight: 6,
    },
});
