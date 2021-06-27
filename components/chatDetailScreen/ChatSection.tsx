import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../redux/app/hook";
import { currentLoggingInUser } from "../../redux/features/userSlice";

const ChatSection = ({ chatMessage, customer }: any) => {
  const currentUserInformation = useAppSelector(currentLoggingInUser);
  const cusSending =
    currentUserInformation.username === chatMessage.receiver ? true : false;
  return (
      <Text style={[
        cusSending
          ? styles.messageContainerReceived
          : styles.messageContainerSent,
      ]}>{chatMessage.text}</Text>
  );
};

export default ChatSection;

const styles = StyleSheet.create({
  messageContainerReceived: {
    backgroundColor: "#3b3b3b",
    justifyContent: "center",
    alignSelf: "flex-start",
    borderRadius: 40,
    marginLeft: 2,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginBottom: 10,
    color: "white",
    fontSize: 16,
  },
  messageContainerSent: {
    backgroundColor: "#027df7",
    justifyContent: "center",
    alignSelf: "flex-end",
    borderRadius: 40,
    marginLeft: 2,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginBottom: 10,
    color: "white",
    fontSize: 16,
  },
});
