import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import UserApi from "../api/UserApi";
import { AsyncStorage } from "react-native";

export default function LoginScreen({ navigation }: any) {
  useEffect(() => {
    const checkLogged = async () => {
      await AsyncStorage.removeItem("token");
      const token = await AsyncStorage.getItem("token");
      if (token) navigation.navigate("BottomNav", { screen: "HomeScreen" });
    };
    checkLogged();
  }, []);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cfpassword, setCfpassword] = useState<string>("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  var usernameRegex = /^[a-zA-Z0-9]+$/;

  const onSubmit = async () => {
    if (
      username !== "" &&
      username?.match(usernameRegex) &&
      password !== "" &&
      password!.length >= 6 &&
      password === cfpassword
    ) {
      const form = {
        username: username,
        password: password,
        email: email,
      };
      const responce = (await UserApi.signUp(form)) as any;
      if (responce === "Successfully") {
        Alert.alert("", "Một email xác thực đã được gửi đến hòm thư của bạn", [
          { text: "OK" },
        ]);
      }
      const { username_existed, email_existed } = responce as any;
      if (username_existed) setIsUsernameError(true);
      if (email_existed) setIsEmailError(true);

      if (!username_existed && !email_existed) {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 2500);
      }
    }
  };

  const onEmailChange = (e: string) => {
    setIsEmailError(false);
    setEmail(e);
  };

  const onUsernameChange = (e: string) => {
    setIsUsernameError(false);
    setUsername(e);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PONZI</Text>

      <View style={{ paddingHorizontal: 40, marginTop: 60 }}>
        <TextInput
          style={styles.input}
          onChangeText={onUsernameChange}
          value={username}
          placeholder="Username"
          maxLength={32}
          autoCapitalize="none"
        />
        {username !== "" && !username?.match(usernameRegex) && (
          <Text style={styles.errorMess}>
            Username chỉ bao gồm chữ cái và số.
          </Text>
        )}
        {isUsernameError && (
          <Text style={styles.errorMess}>Username đã được sử dụng</Text>
        )}
        <TextInput
          style={styles.input}
          onChangeText={onEmailChange}
          value={email}
          placeholder="Địa chỉ email"
          textContentType="emailAddress"
          maxLength={32}
          autoCapitalize="none"
        />
        {isEmailError && (
          <Text style={styles.errorMess}>Email này đã được sủ dụng</Text>
        )}

        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          maxLength={32}
          autoCapitalize="none"
        />
        {password !== "" && password!.length < 6 && (
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
        {password !== cfpassword && (
          <Text style={styles.errorMess}>Mật khẩu xác nhận không khớp</Text>
        )}

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
        >
          <Text style={{ fontSize: 14, color: "black" }}>
            Bạn đã có tài khoản?
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            <Text
              style={{
                color: "#0A75AD",
                textDecorationLine: "underline",
                fontSize: 14,
              }}
            >
              Đăng nhập
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
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={modalVisible}
      ></Modal>
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
    marginTop: 20,
  },
  errorMess: {
    color: "#db0505",
    paddingTop: 5,
    fontSize: 13,
  },
});
