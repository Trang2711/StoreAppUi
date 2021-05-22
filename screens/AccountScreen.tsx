import * as React from "react";
import { StyleSheet, ImageBackground, ScrollView, TouchableOpacity, AsyncStorage } from "react-native";
import { AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Text, View } from "../components/Themed";
import { setIsLogged } from "../redux/features/loginSlice";
import { useAppDispatch } from "../redux/app/hook";

export default function AccountScreen({navigation} : any) {
  const dispatch = useAppDispatch();
  const logout = async() => {
    await AsyncStorage.removeItem("token");
    dispatch(setIsLogged(false));
    navigation.navigate('LoginScreen');
  }

  return (
    <>
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.avatar}
          source={{ uri: `https://www.materialui.co/materialIcons/action/account_circle_grey_192x192.png` }}
        ></ImageBackground>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Trinh Trang</Text>
          <Text style={{ marginTop: 3 }}>trinhtrang27112000@gmail.com</Text>
        </View>
      </View>

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
          <View style={styles.iconContainer}>
            {/* <MaterialIcons name="stars" size={24} color="black" /> */}
            <View style={styles.icon}><MaterialIcons name="stars" size={30} color="black" /></View>
            <Text>Đánh giá</Text>
          </View>
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
