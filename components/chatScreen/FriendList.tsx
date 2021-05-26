import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LogBox } from "react-native";

const FriendList = ({ navigation }: any) => {
  const friends = ["1", "2", "3", "4", "5", "6", "7"];
  // useEffect(() => {
  //   LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  //   LogBox.ignoreAllLogs(); //Ignore all log notifications
  // }, []);
  return (
    <View>
      {friends.map((friend, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate("TopNav", {
                screen: "ChatDetailScreen",
              });
            }}
          >
            <View style={styles.friendArea}>
              {/* <View style={styles.friendImg}> */}
              <Image
                style={{ width: 70, height: 70, borderRadius: 200 }}
                resizeMode={"cover"}
                source={{
                  uri: "https://taimienphi.vn/tmp/cf/aut/mAKI-top-anh-dai-dien-dep-chat-1.jpg",
                }}
              ></Image>
              <View style={styles.friendNameAndLastMsg}>
                <Text style={styles.friendName} numberOfLines={1}>
                  Ten ban befaewfwaefweafweafweafweafweafweafwefwefwae
                </Text>
                <Text style={styles.message} numberOfLines={1}>
                  Tin nhaasdasdasdasdasdasdasdasdsadsadasasdasdsan
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
  },
  friendName: {
    fontSize: 18,
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
  },
});
