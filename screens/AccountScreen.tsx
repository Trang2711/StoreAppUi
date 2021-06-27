import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, ScrollView, TouchableOpacity, AsyncStorage, ActivityIndicator, Pressable } from "react-native";
import { AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Text, View } from "../components/Themed";
import { setIsLogged } from "../redux/features/loginSlice";
import { useAppDispatch } from "../redux/app/hook";
import UserApi from '../api/UserApi'
import { baseUrl } from "../api/AxiosClient";

interface Info {
  username: string,
  email: string,
  avatar: string
}

export default function AccountScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    dispatch(setIsLogged(false));
    navigation.navigate('LoginScreen');
  }
  const [info, setInfo] = useState<Info>()

  const fetchInfo = async () => {
    const info = await UserApi.getInfo()
    setInfo(info as any)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchInfo()
    });

  }, [navigation])

  return (
    <>
      {
        info ? <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('InfoScreen', { info })}>
            <ImageBackground
              style={styles.avatar}
              imageStyle={{ borderRadius: 50 }}
              source={{ uri: `${baseUrl}${info!.avatar}` }}
            ></ImageBackground>
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{info!.username}</Text>
            <Text style={{ marginTop: 3 }}>{info!.email}</Text>
          </View>
        </View>
          : <ActivityIndicator style={{ marginVertical: 30 }} size="large" color='black' />
      }
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Đơn hàng của tôi</Text>
        <ScrollView
          horizontal={true}
          style={{ marginTop: 10 }}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.iconContainer}>
            <View style={styles.icon}><AntDesign name="creditcard" size={23} color="black" /></View>
            <Text>Chưa thanh toán</Text>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.icon}><AntDesign name="wallet" size={23} color="black" /></View>
            <Text>Xử lý</Text>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.icon}><MaterialCommunityIcons name="truck-fast-outline" size={30} color="black" /></View>
            <Text>Đã vận chuyển</Text>
          </View>

          <Pressable
            style={styles.iconContainer}
            onPress={() => navigation.navigate("PurchaseScreen")}>
            {/* <MaterialIcons name="stars" size={24} color="black" /> */}
            <View style={styles.icon}><MaterialIcons name="stars" size={30} color="black" /></View>
            <Text>Đã nhận</Text>
          </Pressable>
          <View style={styles.iconContainer}>
            <View style={styles.icon}><Ionicons name="backspace-outline" size={30} color="black" /></View>
            <Text>Trả lại</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={{ ...styles.title, marginBottom: 7 }}>Tính năng khác</Text>
        <Text style={styles.feature}>Danh sách yêu thích</Text>
        <Text style={styles.feature}>Ví của bạn</Text>
        <Text style={styles.feature}>Trung tâm trợ giúp</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={{ paddingVertical: 12, paddingHorizontal: 15 }}>Đăng xuất</Text>
        </TouchableOpacity>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 10,
    paddingTop: 50,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  sectionContainer: {
    paddingVertical: 15,
    marginTop: 10
  },
  title: {
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  avatar: {
    resizeMode: "cover",
    width: 75,
    height: 75,
    borderRadius: 50,
    marginRight: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  icon: {
    height: 40,
    justifyContent: 'center'
  },
  feature: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 0.5,
  }
});
