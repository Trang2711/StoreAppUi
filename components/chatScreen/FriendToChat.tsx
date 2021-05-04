import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const FriendToChat = () => {
  const friends = ["1", "2", "3", "4", "5", "6", "7"];
  return (
    <View style={styles.friendToChatArea}>
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {friends.map((friend, index) => {
          return (
            <View style={styles.friendContainer} key={index}>
              <Image
                style={{ width: 90, height: 70, borderRadius: 100 }}
                resizeMode={"cover"}
                source={{
                  uri:
                    "https://taimienphi.vn/tmp/cf/aut/mAKI-top-anh-dai-dien-dep-chat-1.jpg",
                }}
              ></Image>
              <View>
                <Text
                  style={{
                    textAlign: "center", // <-- the magic
                    fontSize: 15,
                  }}
                >
                  Huu Hung sadassa
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FriendToChat;

const styles = StyleSheet.create({
  friendToChatArea: {
    width: "100%",
    height: 130,
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  friendContainer: {
    height: "100%",
    width: 70,
    marginRight: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
