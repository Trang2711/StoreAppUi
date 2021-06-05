import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Modal,
    Pressable,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Text, View } from "../components/Themed";
import UserApi from '../api/UserApi'
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from "react-native-gesture-handler";
import { baseUrl } from "../api/AxiosClient";

export default function ProfileScreen({ navigation, route }: any) {
    const { info } = route.params
    const [image, setImage] = useState({ uri: `${baseUrl}${info!.avatar}` })
    const [password, setPassword] = useState("")
    const [showPasswordInput, setShowPasswordInput] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [cfpassword, setCfpassword] = useState<string>("");

    const [modalVisible, setModalVisible] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isFailed, setIsFailed] = useState(true);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            base64: true
        }) as any

        if (!result.cancelled) {
            const image = { uri: result.uri, type: result.type, base64: result.base64 }
            setImage(image as any);
        }
    };

    const onSubmit = async () => {
        let data = {}
        if (newPassword!.length >= 6 && newPassword === cfpassword) {
            data = {
                avatar: image,
                password: newPassword
            }
        }
        data = {
            avatar: image,
            password: null
        }
        await UserApi.changeInfo(data)
        Alert.alert(
            "Thông tin thay đổi đã được lưu lại"
        );
    }

    const confirmPassword = async () => {
        const responce = await UserApi.confirmPassword({ password }) as any
        if (responce === 'Correct') {
            setModalVisible(false)
            setShowPasswordInput(true)
        } else {
            setIsFailed(true)
        }
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={pickImage}>
                        <View>
                            <ImageBackground
                                style={styles.avatar}
                                imageStyle={{ borderRadius: 50 }}
                                source={{ uri: image.uri }}
                            ></ImageBackground>
                            <Text style={{ color: "gray", textAlign: 'center', marginTop: 5 }}>Chỉnh sửa</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <Pressable onPress={() => setModalVisible(true)}>
                        <Text style={styles.chagePasswordBtn}>Thay đổi mật khẩu</Text>
                    </Pressable>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        presentationStyle="overFullScreen"
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={{ height: '100%' }}>
                            <View style={styles.modalHeader}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Xác nhận mật khẩu</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <AntDesign name="close" size={24} color="black" />
                                </TouchableOpacity>

                            </View>
                            <View style={styles.modalBody}>

                                <Text style={{ color: 'gray', fontSize: 14 }}>Để giữ an toàn cho tài khoản, vui lòng xác minh danh tính bằng cách nhập mật khẩu.</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(e) => {
                                        setPassword(e)
                                        setIsFailed(false)
                                    }}
                                    value={password}
                                    placeholder="Mật khẩu"
                                    secureTextEntry={true}
                                    maxLength={32}
                                    autoCapitalize="none"
                                />
                                {isFailed && (
                                    <Text style={styles.errorMess}>Mật khẩu không chính xác</Text>
                                )}

                                <TouchableOpacity onPress={confirmPassword}>
                                    <Text style={styles.submitBtn}>Tiếp tục</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {
                        showPasswordInput && <View>
                            <TextInput
                                style={styles.input}
                                onChangeText={setNewPassword}
                                value={newPassword}
                                placeholder="Nhập mật khẩu mới"
                                secureTextEntry={true}
                                maxLength={32}
                                autoCapitalize="none"
                            />
                            {newPassword !== "" && newPassword!.length < 6 && (
                                <Text style={styles.errorMess}>Mật khẩu gồm ý nhất 6 chữ số</Text>
                            )}

                            <TextInput
                                style={styles.input}
                                onChangeText={setCfpassword}
                                value={cfpassword}
                                placeholder="Nhập lại mật khẩu"
                                secureTextEntry={true}
                                maxLength={32}
                                autoCapitalize="none"
                            />
                            {newPassword !== cfpassword && (
                                <Text style={styles.errorMess}>Mật khẩu xác nhận không khớp</Text>
                            )}
                        </View>
                    }
                </View>

                <TouchableOpacity onPress={onSubmit}>
                    <Text style={styles.submitBtn}>Áp dụng</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 10
    },
    container: {
        paddingVertical: 15,
        marginTop: 10,
        paddingHorizontal: 15
    },
    avatar: {
        resizeMode: "cover",
        width: 100,
        height: 100,
    },
    chagePasswordBtn: {
        paddingVertical: 5,
        fontSize: 15
    },
    errorMess: {
        color: "#db0505",
        paddingTop: 10,
        fontSize: 13,
    },
    input: {
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 0.5,
        marginTop: 45,
    },
    modalHeader: {
        paddingTop: 30,
        paddingHorizontal: 15,
        paddingBottom: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalBody: {
        paddingTop: 30,
        paddingHorizontal: 15,
    },
    submitBtn: {
        paddingVertical: 10,
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: 'black',
        marginTop: 45,
        marginHorizontal: 15
    },
});
