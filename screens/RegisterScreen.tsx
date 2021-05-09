import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Pressable, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { GoogleLogin } from 'react-google-login';
import UserApi from '../api/UserApi'

export default function LoginScreen({ navigation }: any) {
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [cfpassword, setCfpassword] = useState<string>('')
    const [isEmailError, setIsEmailError] = useState(false)
    const [isUsernameError, setIsUsernameError] = useState(false)
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const responseGoogle = (response: any) => {
        console.log(response);
    }

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [modalVisible])

    var usernameRegex = /^[a-zA-Z0-9]+$/

    const onSubmit = async () => {
        if (username !== '' && username?.match(usernameRegex)
            && password !== '' && password!.length >= 6
            && password === cfpassword) {
            const form = {
                username: username,
                password: password,
                email: email
            }
            console.log("sign up")
            const responce = await UserApi.signUp(form)
            console.log(responce)
            const { username_existed, email_existed } = responce as any
            if (username_existed) setIsUsernameError(true)
            if (email_existed) setIsEmailError(true)

            if (!username_existed && !email_existed) {
                // navigation.navigate("LoginScreen")
                setModalVisible(true)
                setTimeout(() => {
                    setModalVisible(false)
                }, 2500)
            }
        }
    }

    const onEmailChange = (e: string) => {
        setIsEmailError(false)
        setEmail(e)
    }

    const onUsernameChange = (e: string) => {
        setIsUsernameError(false)
        setUsername(e)
    }

    const clientId = "887873710911-uucfs6tcunm05qjdvg7mcltpd9p8gnjr.apps.googleusercontent.com"

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 20 }}>
                <Pressable onPress={() => { navigation.goBack() }}>
                    <AntDesign name="close" size={24} color="black" />
                </Pressable>
            </View>
            <Text style={styles.title}>PONZI</Text>

            <View style={{ paddingHorizontal: 40, marginTop: 20 }}>
                <TextInput
                    style={styles.input}
                    onChangeText={onUsernameChange}
                    value={username}
                    placeholder="Username"
                    maxLength={32}
                />
                {username !== '' && !username?.match(usernameRegex) && <Text style={styles.errorMess}>Username chỉ bao gồm chữ cái và số.</Text>}
                {isUsernameError && <Text style={styles.errorMess}>Username đã được sử dụng</Text>}
                <TextInput
                    style={styles.input}
                    onChangeText={onEmailChange}
                    value={email}
                    placeholder="Địa chỉ email"
                    textContentType="emailAddress"
                    maxLength={32}
                />
                {isEmailError && <Text style={styles.errorMess}>Email này đã được sủ dụng</Text>}

                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    maxLength={32}
                />
                {password !== '' && password!.length < 6 && <Text style={styles.errorMess}>Mật khẩu gồm ý nhất 6 chữ số</Text>}

                <TextInput
                    style={styles.input}
                    onChangeText={setCfpassword}
                    value={cfpassword}
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry={true}
                    maxLength={32}
                />
                {password !== cfpassword && <Text style={styles.errorMess}>Mật khẩu xác nhận không khớp</Text>}

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ fontSize: 14, color: 'black' }}>Bạn chưa có tài khoản?</Text>
                    <Pressable onPress={() => { navigation.navigate("LoginScreen") }}>
                        <Text style={{ color: '#0A75AD', textDecorationLine: "underline", fontSize: 14 }}> Đăng kí ngay</Text>
                    </Pressable>
                </View>

                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={onSubmit}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Đăng ký</Text>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', flex: 1, marginTop: 50 }}>
                <Text>Hoặc tham gia bằng</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                   
                    {/* <GoogleLogin
                        clientId={clientId}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    /> */}
                    <TouchableOpacity>
                        <Entypo style={{ marginRight: 12 }} name="facebook-with-circle" size={42} color="#1877f2" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                        <Image style={{ width: 45, height: 45 }} source={{ uri: 'https://androidbunker.com/wp-content/uploads/2015/09/nexus2cee_new_google_icon_thumb.png' }}></Image>
                    </TouchableOpacity> */}

                </View>
            </View>
            <GoogleLogin
                        clientId="887873710911-uucfs6tcunm05qjdvg7mcltpd9p8gnjr.apps.googleusercontent.com"
                        // render={renderProps => (
                        //     <TouchableOpacity onPress={renderProps.onClick} disabled={renderProps.disabled}>
                        //         <Image style={{ width: 45, height: 45 }} source={{ uri: 'https://androidbunker.com/wp-content/uploads/2015/09/nexus2cee_new_google_icon_thumb.png' }}></Image>
                        //     </TouchableOpacity>
                        // )}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />

            <Modal
                animationType={"slide"}
                transparent={false}
                visible={modalVisible}></Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },
    input: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 0.5,
        marginTop: 25
    },
    inputError: {
        borderBottomColor: '#db0505',
        borderBottomWidth: 0.5
    },
    btnSubmit: {
        paddingVertical: 7,
        backgroundColor: 'black',
        color: 'white',
        marginTop: 20,
    },
    errorMess: {
        color: '#db0505',
        paddingTop: 5,
        fontSize: 13
    }
});
