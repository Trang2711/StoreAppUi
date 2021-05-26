import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ChatSection = ({ chatMessage, customer }: any) => {
  console.log("chat", chatMessage);
  console.log("custoemr", customer);
  console.log("receiver", chatMessage.receiver);
  const cusSending = customer === chatMessage.receiver ? true : false;
  return (
    <View
      style={[
        cusSending
          ? styles.messageContainerReceived
          : styles.messageContainerSent,
      ]}
    >
      <Text style={styles.messageText}>{chatMessage.text}</Text>
    </View>
  );
};

export default ChatSection;

const styles = StyleSheet.create({
  messageContainerReceived: {
    backgroundColor: "#3b3b3b",
    justifyContent: "center",
    alignSelf: "flex-start",
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
  },
  messageContainerSent: {
    backgroundColor: "#027df7",
    justifyContent: "center",
    alignSelf: "flex-end",
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  messageText: {
    color: "white",
    fontSize: 18,
  },
});
