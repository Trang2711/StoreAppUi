import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import UserApi from "../api/UserApi";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../redux/app/hook";
import { setIsLogged } from "../redux/features/loginSlice";
import { AsyncStorage } from "react-native";

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const dispatch = useAppDispatch();

  const handleLoginSuccessfully = async (token: string) => {
    await AsyncStorage.setItem("token", token);
    dispatch(setIsLogged(true));
    navigation.navigate("BottomNav", { screen: "HomeScreen" });
  };

  const onSubmit = async () => {
    if (username !== "" && password !== "") {
      const form = {
        username,
        password,
      };
      try {
        const responce = await UserApi.signIn(form);
        const { token } = responce as any;

        console.log("sign up", token);
        if (token) {
          handleLoginSuccessfully(token);
        }
      } catch (error) {
        console.log('Failed to fetch token: ', error)
      }
    } else {
      setIsError(true);
    }
  };

  const onUserNameChange = (e: string) => {
    setIsError(false);
    setIsFailed(false);
    setUsername(e);
  };

  const onPasswordChange = (e: string) => {
    setIsError(false);
    setIsFailed(false);
    setPassword(e);
  };
  
  const facebookSignIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "2954637551478913",
      });
      const responseFromLoginFb: any =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile", "email"],
        });
      if (responseFromLoginFb.type === "success") {
        // Get the user's name using Facebook's Graph API
        // const access_token = responseFromLoginFb.token;
        const access_token = responseFromLoginFb.token;
        const form = {
          access_token,
        };
        const response = (await UserApi.facebookPost(form)) as any;
        if (response.key) {
          handleLoginSuccessfully(response.key);
        } else {
          Alert.alert(
            "Một lỗi đã xảy ra trong quá trình đăng nhập. Vui lòng đăng nhập lại!"
          );
        }
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const googleSignIn = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const response: any = await Google.logInAsync({
        iosClientId: `<YOUR_IOS_CLIENT_ID>`,
        androidClientId: `802017006894-sr41m2q8ahnrg4h9vbbug9lqslujr9bk.apps.googleusercontent.com`,
      });

      console.log(response);
      if (response.type === "success") {
        const response2: any = await UserApi.googlePost({
          access_token: response.accessToken,
        });
        console.log("res2", response2);
        if (response2.key) {
          handleLoginSuccessfully(response2.key);
        } else {
          Alert.alert(
            "Một lỗi đã xảy ra trong quá trình đăng nhập. Vui lòng đăng nhập lại!"
          );
        }
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: 20,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
      </View>
      <Text style={styles.title}>PONZI</Text>

      <View style={{ paddingHorizontal: 40, marginTop: 20 }}>
        <TextInput
          style={styles.input}
          onChangeText={onUserNameChange}
          value={username}
          placeholder="User name"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          onChangeText={onPasswordChange}
          secureTextEntry={true}
          value={password}
          placeholder="Mật khẩu"
          textContentType="password"
          autoCapitalize="none"
        />
        {isFailed && (
          <Text style={styles.errorMess}>
            Mật khẩu hoặc tên tài khoản không đúng
          </Text>
        )}
        {isError && (
          <Text style={styles.errorMess}>
            Vui lòng điền đầy đủ mật khẩu và tên tài khoản
          </Text>
        )}

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
        >
          <Text style={{ fontSize: 14, color: "black" }}>
            Bạn chưa có tài khoản?&nbsp;
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
          >
            <Text
              style={{
                color: "#0A75AD",
                textDecorationLine: "underline",
                fontSize: 14,
              }}
            >
              Đăng kí ngay
            </Text>
          </Pressable>
        </View>

        <TouchableOpacity style={styles.btnSubmit} onPress={onSubmit}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center", flex: 1, marginTop: 50 }}>
        <Text>Hoặc tham gia bằng</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <TouchableOpacity onPress={facebookSignIn}>
            <Entypo
              style={{ marginRight: 12 }}
              name="facebook-with-circle"
              size={42}
              color="#1877f2"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={googleSignIn}>
            <Image
              style={{ width: 45, height: 45 }}
              source={{
                uri: "https://androidbunker.com/wp-content/uploads/2015/09/nexus2cee_new_google_icon_thumb.png",
              }}
            ></Image>
          </TouchableOpacity>
        </View>
        {/* <Button title="Login with Google" onPress={signInAsync} />
        <Button title="Login with FB" onPress={logIn} /> */}
      </View>
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
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  input: {
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 0.5,
    marginTop: 25,
  },
  inputError: {
    borderBottomColor: "#db0505",
    borderBottomWidth: 0.5,
  },
  btnSubmit: {
    paddingVertical: 7,
    backgroundColor: "black",
    color: "white",
    marginTop: 40,
  },
  errorMess: {
    color: "#db0505",
    paddingTop: 10,
    fontSize: 13,
  },
});
