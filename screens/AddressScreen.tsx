import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Modal,
    Alert,
    ScrollView
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios"
import UserApi from '../api/UserApi'
import {
    addressOfUser,
    setAddressOfUser,
} from "../redux/features/addressSlice";
import { useAppSelector, useAppDispatch } from "../redux/app/hook";

export default function AddressScreen({ navigation }: any) {
    const [username, setUsername] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [province, setProvince] = useState<any>()
    const [district, setDistrict] = useState<any>()
    const [addressDetail, setAddressDetail] = useState()
    const [ward, setWard] = useState<any>()

    const [modaProvincelVisible, setModaProvincelVisible] = useState(false)
    const [modalDistrictVisible, setModalDistrictVisible] = useState(false)
    const [modalWardVisible, setModalWardVisible] = useState(false)
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const responce = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                    headers: {
                        token: `3f355786-bc78-11eb-8546-ca480ac3485e`
                    }
                })
                const data = responce.data.data
                setProvinces(data as any)
            } catch (error) {
                console.log('Failed to fetch provinces: ', error)
            }
        }
        fetchProvinces()
    }, [])

    useEffect(() => {
        const fetchDistricts = async (province_id: any) => {
            try {
                const responce = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
                    params: {
                        province_id: province_id
                    },
                    headers: {
                        token: `3f355786-bc78-11eb-8546-ca480ac3485e`
                    }
                })
                const data = responce.data.data
                setDistricts(data as any)
            } catch (error) {
                console.log('Failed to fetch districts: ', error)
            }
        }
        if (province) {
            fetchDistricts(province.ProvinceID)
        }
    }, [province])

    useEffect(() => {
        const fetchWards = async (district_id: any) => {
            try {
                const responce = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
                    params: {
                        district_id: district_id
                    },
                    headers: {
                        token: `3f355786-bc78-11eb-8546-ca480ac3485e`
                    }
                })
                const data = responce.data.data
                setWards(data as any)
            } catch (error) {
                console.log('Failed to fetch wards: ', error)
            }
        }
        if (district) {
            fetchWards(district.DistrictID)
        }
    }, [district])

    const handleSubmit = async () => {
        if (username && phoneNumber && province && district && ward && addressDetail) {
            const request = {
                user: username,
                phoneNumber,
                province: {
                    id: province.ProvinceID,
                    name: province.ProvinceName
                },
                district: {
                    id: district.DistrictID,
                    name: district.DistrictName
                },
                ward: {
                    id: ward.WardCode,
                    name: ward.WardName
                },
                address: addressDetail
            }
            dispatch(setAddressOfUser(request))
            // await UserApi.addAddress(data)
            // const data = await UserApi.getOrderAddress(request)
            // console.log(data)
            navigation.navigate("PaymentScreen")
        } else {
            Alert.alert('Vui lòng nhập đầy đủ thông tin.')
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={(e) => {
                    setUsername(e as any)
                }}
                value={username}
                placeholder="Họ và tên"
            />
            <TextInput
                style={styles.input}
                onChangeText={(e) => {
                    setPhoneNumber(e as any)
                }}
                value={phoneNumber}
                placeholder="Số điện thoại"
                autoCapitalize="none"
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => setModaProvincelVisible(true)}>
                <View style={styles.selectContainer}>
                    <Text style={{ fontSize: 16 }}>{province ? province.ProvinceName : 'Tỉnh/Thành phố'}</Text>
                    <AntDesign name="right" size={19} color="black" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalDistrictVisible(true)}>
                <View style={styles.selectContainer}>
                    <Text style={{ fontSize: 16 }}>{district ? district.DistrictName : 'Quận/Huyện'}</Text>
                    <AntDesign name="right" size={19} color="black" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalWardVisible(true)}>
                <View style={styles.selectContainer}>
                    <Text style={{ fontSize: 16 }}>{ward ? ward.WardName : 'Xã/Phường'}</Text>
                    <AntDesign name="right" size={19} color="black" />
                </View>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                onChangeText={(e) => {
                    setAddressDetail(e as any)
                }}
                value={addressDetail}
                placeholder="Địa chỉ cụ thể"
                autoCapitalize="none"
            />
            <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.submitBtn}>Áp dụng địa chỉ</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modaProvincelVisible}
                onRequestClose={() => {
                    setModaProvincelVisible(!modaProvincelVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 20, }}>
                        <Text style={styles.modalTitle}>Chọn tỉnh/thành phố</Text>
                        <AntDesign
                            name="close"
                            size={24}
                            color="black"
                            onPress={() => setModaProvincelVisible(false)}
                        />
                    </View>
                    <ScrollView >
                        {
                            provinces.map((item: any, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setProvince(item)
                                        setModaProvincelVisible(false)
                                    }}
                                >
                                    <Text style={styles.provinceItem}>{item.ProvinceName}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>

                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalDistrictVisible}
                onRequestClose={() => {
                    setModalDistrictVisible(!modalDistrictVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 20, }}>
                        <Text style={styles.modalTitle}>Chọn tỉnh/thành phố</Text>
                        <AntDesign
                            name="close"
                            size={24}
                            color="black"
                            onPress={() => setModalDistrictVisible(false)}
                        />
                    </View>
                    <ScrollView >
                        {
                            districts.map((item: any, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setDistrict(item)
                                        setModalDistrictVisible(false)
                                    }}
                                >
                                    <Text style={styles.provinceItem}>{item.DistrictName}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>

                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalWardVisible}
                onRequestClose={() => {
                    setModalWardVisible(!modalWardVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 20, }}>
                        <Text style={styles.modalTitle}>Chọn phường/xã</Text>
                        <AntDesign
                            name="close"
                            size={24}
                            color="black"
                            onPress={() => setModalWardVisible(false)}
                        />
                    </View>
                    <ScrollView >
                        {
                            wards.map((item: any, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setWard(item)
                                        setModalWardVisible(false)
                                    }}
                                >
                                    <Text style={styles.provinceItem}>{item.WardName}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>

                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: '100%'
    },
    input: {
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 0.5,
        marginTop: 30,
        fontSize: 16
    },
    selectContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 0.5,
        paddingBottom: 5
    },
    provinceItem: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16
    },
    modalContainer: {
        backgroundColor: 'white',
        paddingTop: 15
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    submitBtn: {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        paddingVertical: 10,
        fontSize: 16,
        marginTop: 30
    }
});
