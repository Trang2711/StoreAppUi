import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TextInput, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import FriendToChat from "../components/chatScreen/FriendToChat";
import FriendList from "../components/chatScreen/FriendList";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../redux/app/hook";
import { currentLoggingInUser } from "../redux/features/userSlice";
import UserApi from "../api/UserApi";

export default function ChatScreen({ navigation }: any) {
  const [searchText, setSearchText] = useState("Tim kiem");
  const [showChatWithBuyer, setShowChatWithBuyer] = useState<Boolean>();
  const [listOfChattingUser, setListOfChattingUser] = useState([]);
  const currentUserInformation = useAppSelector(currentLoggingInUser);
  //////// nếu showChatWithBuyer mà false thì tương đương với showChatWithSeller là true
  useEffect(() => {
    setShowChatWithBuyer(true);
  }, []);
  useEffect(() => {
    const _setListOfChattingUserEqualToListOfBuyer = async () => {
      const response = await UserApi.getListOfChatCustomer();
      // console.log("res from chat list", response);
      await setListOfChattingUser(response as any);
    };
    const _setListOfChattingUserEqualToListOfSeller = async () => {
      const response = await UserApi.getListOfChatSeller();
      // console.log("res from chat with seller", response);
      await setListOfChattingUser(response as any);
    };
    if (showChatWithBuyer) {
      _setListOfChattingUserEqualToListOfBuyer();
    } else if (showChatWithBuyer === false) {
      _setListOfChattingUserEqualToListOfSeller();
    }
  }, [showChatWithBuyer]);
  console.log("show chat with buyer", showChatWithBuyer);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.user}>
            <View style={styles.styleForDisplayFlexAndCenterThings}>
              <Image
                style={{ width: 60, height: 60, borderRadius: 50 }}
                resizeMode={"contain"}
                source={{
                  uri: "https://taimienphi.vn/tmp/cf/aut/mAKI-top-anh-dai-dien-dep-chat-1.jpg",
                }}
              />
              <View style={styles.styleForDisplayFlexAndCenterThings}>
                <Text style={{ fontSize: 28 }}>Chat</Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.styleForDisplayFlexAndCenterThings}>
            <TouchableOpacity onPress={() => setShowChatWithBuyer(false)}>
              <Text style={styles.chatWithBuyer}>Người bán</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowChatWithBuyer(true)}>
              <Text style={styles.chatWithSeller}>Người mua</Text>
            </TouchableOpacity>
          </View>
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
          <FriendList
            navigation={navigation}
            listOfChattingUser={listOfChattingUser}
            currentUserInformation={currentUserInformation}
            isSeller={showChatWithBuyer}
          />
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
    // justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "30%",
  },
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
  chatWithBuyer: {
    fontSize: 17,
    marginLeft: 0,
    fontWeight: "bold",
    borderRadius: 10,
    lineHeight: 40,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#e0e0e0",
    color: "#757575",
  },
  chatWithSeller: {
    fontSize: 17,
    marginLeft: 15,
    fontWeight: "bold",
    borderRadius: 10,
    lineHeight: 40,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#e0e0e0",
    color: "#757575",
  },
  styleForDisplayFlexAndCenterThings: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
