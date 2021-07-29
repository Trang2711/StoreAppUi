import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import ChatSection from "../components/chatDetailScreen/ChatSection";
import Pusher from "pusher-js/react-native";
import UserAPI from "../api/UserApi";
import { useAppSelector } from "../redux/app/hook";
import { currentLoggingInUser } from "../redux/features/userSlice";
import UserApi from "../api/UserApi";
import { baseUrl } from "../api/AxiosClient";

interface ref {
  scrollToEnd: any;
}

const ChatDetailScreen = ({ navigation, route }: any) => {
  const { seller, customer } = route.params;
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const scrollViewRef = useRef<ref | null>();
  const [currentChattingUserAvatar, setCurrentChattingUserAvatar] = useState({
    avatar: "",
  });
  const currentUserInformation = useAppSelector(currentLoggingInUser);
  ////////function
  const _sendMsg = async () => {
    // setChatMessages([...chatMessages, inputMsg]);
    if (inputMsg.length > 0) {
      setInputMsg("");
      const res = await UserAPI.pushingChatMsg({
        seller,
        isFromCustomer: customer === currentUserInformation.username,
        text: inputMsg,
        customer,
      });
      console.log("post msg response received", res);
      Keyboard.dismiss();
    }
  };
  useEffect(() => {
    const _getMsgHistory = async () => {
      const response = await UserAPI.getMsgHistory({
        customer,
        seller,
      });
      setChatMessages(response as any);
    };

    const _getCurrentUserChattingWithInfo = async () => {
      const response = (await UserApi.getUserAvatar({
        username: seller,
      })) as any;
      setCurrentChattingUserAvatar(response as any);
    };
    _getCurrentUserChattingWithInfo();
    _getMsgHistory();
  }, []);

  useEffect(() => {
    const pusher = new Pusher("0d984425ec77e69c43f6", {
      cluster: "ap1",
    });
    var channel = pusher.subscribe(`${customer}-${seller}`);
    channel.bind("chat", (data: any) => {
      setChatMessages((chatMessages): any => {
        return [...chatMessages, data];
      });
      setTimeout(() => {
        scrollViewRef?.current?.scrollToEnd({ animated: true });
      }, 500);
    });
    return () => {
      channel.unbind_all();
    };
  }, []);
  useEffect(() => {
    scrollViewRef?.current?.scrollToEnd({ animated: true });
  }, [scrollViewRef]);
  //////////////disable warining on screen
  console.disableYellowBox = true;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.user}>
            <View style={styles.userImgAndName}>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", borderBottomColor: "#DDDDDD", borderBottomWidth: 1, paddingBottom: 10 }}>
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Ionicons
                    name="arrow-back-outline"
                    size={27}
                    color="black"
                  ></Ionicons>
                </TouchableOpacity>
                <Image
                  style={{ width: 40, height: 40, borderRadius: 50, marginLeft: 5 }}
                  resizeMode={"contain"}
                  source={{
                    uri: currentChattingUserAvatar.avatar
                      ? baseUrl + currentChattingUserAvatar.avatar
                      : "https://www.gravatar.com/avatar/9de95c1fce91a3a5031507466e580744?s=328&d=identicon&r=PG",
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
                      fontSize: 21,
                      marginLeft: 5,
                      fontWeight: "bold",
                    }}
                  >
                    {seller}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <ScrollView
          ref={scrollViewRef as any}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}
          onContentSizeChange={() =>
            scrollViewRef?.current?.scrollToEnd({ animated: true })
          }
        >
          {/* Component */}
          {chatMessages.map((chatMsg, index) => {
            return (
              <ChatSection
                key={index}
                chatMessage={chatMsg}
                seller={seller}
                customer={customer}
              />
            );
          })}
        </ScrollView>
        {/* <Text>{inputMsg}</Text> */}
        <View style={styles.textInputArea}>
          <TextInput
            placeholder="Aa"
            style={{
              width: "88%",
              height: "70%",
              fontSize: 16,
              backgroundColor: "#ecedee",
              paddingLeft: 25,
              paddingRight: 15,
              borderRadius: 30,
            }}
            onChangeText={setInputMsg}
            value={inputMsg}
            onSubmitEditing={_sendMsg}
          />
          <TouchableWithoutFeedback
            style={{ marginLeft: 10 }}
            onPress={_sendMsg}
          >
            <Ionicons name="send-sharp" size={26} color="black"></Ionicons>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
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
  userImgAndName: {
    width: '100%',
  },
  userImgAndChat_img: {},
  textInputArea: {
    width: "100%",
    height: 60,
    borderTopColor: "#DDDDDD",
    borderTopWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
});
