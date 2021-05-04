import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const FriendList = () => {
  const friends = ["1", "2", "3", "4", "5", "6", "7"];
  return (
    <View>
      {friends.map((friend, index) => {
        return (
          <View style={styles.friendArea} key={index}>
            <View style={styles.friendImg}>
              <Image
                style={{ width: 70, height: 70, borderRadius: 200 }}
                resizeMode={"cover"}
                source={{
                  uri:
                    "https://taimienphi.vn/tmp/cf/aut/mAKI-top-anh-dai-dien-dep-chat-1.jpg",
                }}
              ></Image>
            </View>
            <View style={styles.friendNameAndLastMsg}>
              <Text style={styles.friendName}>Ten ban be</Text>
              <Text style={styles.message} numberOfLines={1}>
                Tin nhaasdasdasdasdasdasdasdasdsadsadasasdasdsan
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default FriendList;

const styles = StyleSheet.create({
  friendArea: {
    width: "100%",
    height: 80,
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
  },
  friendImg: {
    flex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  friendNameAndLastMsg: {
    flex: 5,
  },
  friendName: {
    height: 40,
    paddingTop: 15,
    fontSize: 18,
  },
  message: {
    height: 40,
    paddingTop: 5,
    fontSize: 16,
  },
});
