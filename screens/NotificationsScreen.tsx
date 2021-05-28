import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Text, View } from "../components/Themed";

import {
  Platform,
  DeviceEventEmitter,
  NativeModules,
  NativeEventEmitter,
} from "react-native";
import RNMomosdk from "react-native-momosdk";
const RNMomosdkModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMomosdkModule);
// import Pagination from "../components/common/Pagination"

export default function NotificationsScreen({ route }: any) {
  const merchantname = "CGV Cinemas";
  const merchantcode = "CGV01";
  const merchantNameLabel = "Nhà cung cấp";
  const billdescription = "Fast and Furious 8";
  const amount = 50000;
  const enviroment = "0"; //"0": SANBOX , "1": PRODUCTION
  interface product {
    enviroment: string;
    action: string;
    merchantname: string;
    merchantcode: string;
    merchantnamelabel: string;
    description: string;
    amount: number;
    orderId: string;
    orderLabel: string;
    appScheme: string;
  }

  useEffect(() => {
    EventEmitter.addListener(
      "RCTMoMoNoficationCenterRequestTokenReceived",
      (response) => {
        try {
          console.log("<MoMoPay>Listen.Event::" + JSON.stringify(response));
          if (response && response.status == 0) {
            //SUCCESS: continue to submit momoToken,phonenumber to server
            let fromapp = response.fromapp; //ALWAYS:: fromapp==momotransfer
            let momoToken = response.data;
            let phonenumber = response.phonenumber;
            let message = response.message;
            let orderId = response.refOrderId;
          } else {
            //let message = response.message;
            //Has Error: show message here
          }
        } catch (ex) {}
      }
    );
    alert("asdf");
    //OPTIONAL
    // EventEmitter.addListener(
    //   "RCTMoMoNoficationCenterRequestTokenState",
    //   (response) => {
    //     console.log("<MoMoPay>Listen.RequestTokenState:: " + response.status);
    //     // status = 1: Parameters valid & ready to open MoMo app.
    //     // status = 2: canOpenURL failed for URL MoMo app
    //     // status = 3: Parameters invalid
    //   }
    // );
  }, []);

  // TODO: Action to Request Payment MoMo App
  const onMomoClick = async () => {
    let jsonData: product = {};
    jsonData.enviroment = enviroment; //SANBOX OR PRODUCTION
    jsonData.action = "gettoken"; //DO NOT EDIT
    jsonData.merchantname = "Laptop Ecommerce App"; //edit your merchantname here
    jsonData.merchantcode = "MOMO6LBO20210528"; //edit your merchantcode here
    jsonData.merchantnamelabel = merchantNameLabel;
    jsonData.description = billdescription;
    jsonData.amount = 5000; //order total amount
    jsonData.orderId = "ID20181123192300";
    jsonData.orderLabel = "Ma don hang";
    jsonData.appScheme = "momo6lbo20210528"; // iOS App Only , match with Schemes Indentify from your  Info.plist > key URL types > URL Schemes
    console.log("data_request_payment " + JSON.stringify(jsonData));
    try {
      if (Platform.OS === "android") {
        let dataPayment = await RNMomosdk.requestPayment(jsonData);
        console.log("dataPayent", dataPayment);
        momoHandleResponse(dataPayment);
      } else {
        RNMomosdk.requestPayment(jsonData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const momoHandleResponse = async (response: any) => {
    try {
      if (response && response.status == 0) {
        //SUCCESS continue to submit momoToken,phonenumber to server
        let fromapp = response.fromapp; //ALWAYS:: fromapp == momotransfer
        let momoToken = response.data;
        let phonenumber = response.phonenumber;
        let message = response.message;
        console.log(response);
      } else {
        //let message = response.message;
        //Has Error: show message here
      }
    } catch (ex) {}
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.momoContainer}
        onPress={() => onMomoClick()}
      >
        <Text>Momo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  momoContainer: {
    marginTop: 50,
  },
});
