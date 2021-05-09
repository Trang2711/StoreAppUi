import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import UserApi from "../api/UserApi";
import axios from "axios";

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cfpassword, setCfpassword] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const onSubmit = async () => {
    if (username !== "" && password !== "") {
      const form = {
        username: username,
        password: password,
        email: email,
      };
      console.log("sign up");
      // const responce = await UserApi.signIn(form)
      // if(...) {
      //   navigation.navigate('HomeScreen')
      // }
    } else {
      setIsError(true);
    }
  };
  const onEmailChange = (e: string) => {
    setIsError(false);
    setIsFailed(false);
    setEmail(e);
  };
  const onPasswordChange = (e: string) => {
    setIsError(false);
    setIsFailed(false);
    setPassword(e);
  };
  ////fb sign in
  const facebookSignIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "2954637551478913",
      });
      const responseFromLoginFb: any = await Facebook.logInWithReadPermissionsAsync(
        {
          permissions: ["public_profile", "email", "user_photos"],
        }
      );
      if (responseFromLoginFb.type === "success") {
        // Get the user's name using Facebook's Graph API
        fetch(
          `https://graph.facebook.com/me?fields=id,email,name,picture&&access_token=${responseFromLoginFb.token}`
        )
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            console.log("user token", responseFromLoginFb.token);
          });
      } else {
        // type === 'cancel'
      }
      // console.log("response from db", responseFromLoginFb);
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  ///////////gg sign in
  const googleSignIn = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, user, idToken }: any = await Google.logInAsync({
        iosClientId: `<YOUR_IOS_CLIENT_ID>`,
        androidClientId: `802017006894-sr41m2q8ahnrg4h9vbbug9lqslujr9bk.apps.googleusercontent.com`,
      });

      if (type === "success") {
        // Then you can use the Google REST API
        console.log("user", user);
        console.log("token", idToken);
        // navigation.navigate("Profile", { user });
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
          onChangeText={setUsername}
          value={username}
          placeholder="User name"
        />

        <TextInput
          style={styles.input}
          onChangeText={onEmailChange}
          value={email}
          placeholder="Địa chỉ email"
          textContentType="emailAddress"
        />

        <TextInput
          style={styles.input}
          onChangeText={onPasswordChange}
          value={password}
          placeholder="Mật khẩu"
          textContentType="password"
        />
        {isFailed && (
          <Text style={styles.errorMess}>Mật khẩu hoặc email không đúng</Text>
        )}
        {isError && (
          <Text style={styles.errorMess}>
            Vui lòng điền đầy đủ mật khẩu và email
          </Text>
        )}

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
        >
          <Text style={{ fontSize: 14, color: "black" }}>
            Bạn chưa có tài khoản?
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
                uri:
                  "https://androidbunker.com/wp-content/uploads/2015/09/nexus2cee_new_google_icon_thumb.png",
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
