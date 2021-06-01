import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import CardButton from "./CardButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const RegisterScreen = ({ navigation }: any) => {
  const [loading, setloading] = useState(false);
  const [token, setToken] = useState({
    tokenId: null,
  });

  useEffect(() => {
    Stripe.setOptionsAsync({
      publishableKey:
        "pk_test_51IxSO5FkT8Rf0i1NWITpWLxqKgxa8xScNUtqDPOoneoerfVPVvMhU2WGCApWriSoYVFaVhix93o16u3N6FHaYjiY00yAZvxGWl",
      androidPayMode: "test", // [optional] used to set wallet environment (AndroidPay)
      merchantId: "your_merchant_id", // [optional] used for payments with ApplePay
    });
  }, []);
  const handleCardDetails = async () => {
    try {
      setloading(true);
      const cardOptions = {
        requiredBillingAddressFields: "full",
        prefilledInformation: {
          billingAddress: {
            name: "Test Name",
            line1: "Test Line 1",
            line2: "4",
            city: "Test City",
            state: "Test State",
            country: "Test Country",
            postalCode: "31217",
          },
        },
      };
      // GETS YOUR TOKEN FROM STRIPE FOR PAYMENT PROCESS
      const token = await Stripe.paymentRequestWithCardFormAsync(
        cardOptions as any
      );
      console.log("token", token);
      setToken(token as any);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={handleCardDetails}>
        <CardButton text="Card Details" loading={loading} />
      </TouchableOpacity>
      <View style={styles.token}>
        {token && (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
            }}
          >
            <Text style={styles.tokenLabel}>Token: {token?.tokenId}</Text>
            <CardButton text="Make Payment" />
          </View>
        )}
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  token: {},
  tokenLabel: {
    textAlign: "center",
    color: "#111",
    marginBottom: 5,
    padding: 5,
  },
});
