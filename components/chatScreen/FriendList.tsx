import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LogBox } from "react-native";
import { baseUrl } from "../../api/AxiosClient";

const FriendList = ({
  navigation,
  listOfChattingUser,
  currentUserInformation,
  isSeller,
}: any) => {
  // console.log("chat list in friend list", listOfChattingUser);
  useEffect(() => {
    LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
  }, []);
  return (
    <View>
      {listOfChattingUser.map((chatuser: any, index: any) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate("TopNav", {
                screen: "ChatDetailScreen",
                params: !isSeller
                  ? {
                      seller: chatuser.user.username,
                      customer: currentUserInformation?.username,
                    }
                  : {
                      seller: currentUserInformation?.username,
                      customer: chatuser.user.username,
                    },
              });
            }}
          >
            <View style={styles.friendArea}>
              {/* <View style={styles.friendImg}> */}
              <Image
                style={{ width: 70, height: 70, borderRadius: 200 }}
                resizeMode={"cover"}
                source={{
                  uri: chatuser.user.avatar
                    ? baseUrl + chatuser.user.avatar
                    : "https://www.gravatar.com/avatar/9de95c1fce91a3a5031507466e580744?s=328&d=identicon&r=PG",
                }}
              ></Image>
              <View style={styles.friendNameAndLastMsg}>
                <Text style={styles.friendName} numberOfLines={1}>
                  {chatuser.user.username}
                </Text>
                <Text style={styles.message} numberOfLines={1}>
                  {chatuser.last_message.content}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default FriendList;

const styles = StyleSheet.create({
  friendArea: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  friendImg: {
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellowgreen",
  },
  friendNameAndLastMsg: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
  },
  friendName: {
    fontSize: 18,
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
  },
});
