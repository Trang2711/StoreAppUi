import React, { useState } from "react";
import { StyleSheet, Image, TextInput, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import FriendToChat from "../components/chatScreen/FriendToChat";
import FriendList from "../components/chatScreen/FriendList";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../redux/app/hook";
import { currentLoggingInUser } from "../redux/features/userSlice";

export default function ChatScreen({ navigation }: any) {
  const [searchText, setSearchText] = useState("Tim kiem");
  const currentUserLoggingInInfo = useAppSelector(currentLoggingInUser);
  console.log("current user", currentUserLoggingInInfo);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.user}>
            <View style={styles.userImgAndChat}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 50 }}
                  resizeMode={"contain"}
                  source={{
                    uri: "https://taimienphi.vn/tmp/cf/aut/mAKI-top-anh-dai-dien-dep-chat-1.jpg",
                  }}
                />
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      marginLeft: 5,
                      fontWeight: "bold",
                    }}
                  >
                    Chat
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={styles.searchBarContainer}>
              <Ionicons
                name="search-outline"
                size={22}
                color="black"
              ></Ionicons>
              <TextInput
                style={styles.search_input}
                placeholder="Tim kiem"
                // value={searchText}
              />
            </View>
          </View>
          {/* Component */}
          <FriendList navigation={navigation} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subContainer: {
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    width: "100%",
    height: 100,
  },
  user: {
    marginTop: 30,
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userImgAndChat: {},
  userImgAndChat_img: {},
  cameraAndPen: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon_camAndPen: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#929fb3",
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarContainer: {
    marginTop: 10,
    width: "95%",
    height: 40,
    backgroundColor: "#e0e0e0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchIcon: {},
  search_input: {
    width: "90%",
    height: 30,
    borderColor: "red",
    marginLeft: 10,
  },
});
