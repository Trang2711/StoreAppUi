import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ChatSection = ({ chatMessage, received }: any) => {
  return (
    <View
      style={[
        received
          ? styles.messageContainerReceived
          : styles.messageContainerSent,
      ]}
    >
      <Text style={styles.messageText}>{chatMessage}</Text>
    </View>
  );
};

export default ChatSection;

const styles = StyleSheet.create({
  messageContainerReceived: {
    backgroundColor: "#bdbdbd",
    justifyContent: "center",
    alignSelf: "flex-start",
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
  },
  messageContainerSent: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignSelf: "flex-end",
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
  },
  messageText: {
    fontSize: 20,
  },
});
