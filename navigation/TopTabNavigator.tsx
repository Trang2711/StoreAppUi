import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { TopTabParamList } from "../types";
import CartScreen from "../screens/CartScreen";
import SearchScreen from "../screens/SearchScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import FilterScreen from "../screens/FilterScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import ChatDetailScreen from "../screens/ChatDetailScreen";

const TopTabStack = createStackNavigator<TopTabParamList>();

export default function TopTabNavigator() {
  return (
    <TopTabStack.Navigator>
      <TopTabStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <TopTabStack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{ headerShown: false }}
      />
      <TopTabStack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <TopTabStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ title: "Giỏ hàng" }}
      />
      <TopTabStack.Screen
        name="ItemDetailScreen"
        component={ItemDetailScreen}
        options={{ headerShown: false }}
      />
      <TopTabStack.Screen
        name="ChatDetailScreen"
        component={ChatDetailScreen}
        options={{ headerShown: false }}
      />
    </TopTabStack.Navigator>
  );
}
