import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TextInput, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import FriendToChat from "../components/chatScreen/FriendToChat";
import FriendList from "../components/chatScreen/FriendList";
import { ScrollView } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../redux/app/hook";
import { currentLoggingInUser } from "../redux/features/userSlice";
import UserApi from "../api/UserApi";
import { baseUrl } from "../api/AxiosClient";
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

export default function ChatScreen({ navigation }: any) {
  const [searchText, setSearchText] = useState("Tim kiem");
  const [showChatWithBuyer, setShowChatWithBuyer] = useState<Boolean>();
  const [listOfChattingUser, setListOfChattingUser] = useState([]);
  const currentUserInformation = useAppSelector(currentLoggingInUser);
  const [modalVisible, setModalVisible] = useState(false)
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

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.user}>
            <View style={styles.styleForDisplayFlexAndCenterThings}>
              <Image
                style={{ width: 42, height: 42, borderRadius: 50 }}
                resizeMode={"cover"}
                source={{
                  uri: `${baseUrl}${currentUserInformation.avatar}`,
                }}
              />
              <View style={styles.styleForDisplayFlexAndCenterThings}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 6 }}>Chat</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.chatWithBuyer}>{showChatWithBuyer ? 'Người mua' : 'Người bán'}</Text>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Ionicons name="ios-chatbubble-ellipses-outline" size={22} color="black" />
              </TouchableOpacity>
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
                placeholder="Search"
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          presentationStyle="overFullScreen"
        // transparent={true}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => {
                setShowChatWithBuyer(false)
                setModalVisible(false)
              }}>
                <Text style={styles.chatWithSeller}>Nhắn tin với người bán</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setShowChatWithBuyer(true)
                setModalVisible(false)
              }}>
                <Text style={styles.chatWithSeller}>Nhắn tin với người mua</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    height: 95,
  },
  user: {
    marginTop: 30,
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
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
    width: "100%",
    height: 40,
    backgroundColor: "#ecedee",
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
    fontSize: 15.5,
    marginRight: 5,
  },
  chatWithSeller: {
    fontSize: 15.5,
    marginVertical: 10
  },
  styleForDisplayFlexAndCenterThings: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '80%',
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
