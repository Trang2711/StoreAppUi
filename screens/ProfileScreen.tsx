import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, ScrollView, TouchableOpacity, AsyncStorage } from "react-native";
import { AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Text, View } from "../components/Themed";
import { setIsLogged } from "../redux/features/loginSlice";
import { useAppDispatch } from "../redux/app/hook";
import UserApi from '../api/UserApi'
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({ navigation, route }: any) {
    const { info } = route.params
    const [image, setImage] = useState({})
    const [password, setPassword] = useState()

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

    const onSubmit = async()=> {
        const data = {
            avatar: image,
            password: '222222'
        }
        console.log(data)
        await UserApi.changeInfo(data)
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={pickImage}>
                    <View>
                        <ImageBackground
                            style={styles.avatar}
                            source={{ uri: info.avatar }}
                        ></ImageBackground>
                        {/* <View style={styles.avatarOverlay}>
                            <Text>Chỉnh sửa</Text>
                        </View> */}
                        <Text style={{ color: "gray", textAlign: 'center', marginTop: 5 }}>Chỉnh sửa</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <TouchableOpacity onPress={onSubmit}>
                    <Text>Áp dụng</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 15,
    },
    avatar: {
        resizeMode: "cover",
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 10,
    },
    avatarOverlay: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        color: 'white'
    }
});
