import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import * as React from "react";
import { Text } from "react-native";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";

import {
  BottomTabParamList,
  HomeTabParamList,
  CategoriesTabParamList,
  NewsTabParamList,
  AccountTabParamList,
} from "../types";
import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import NewsScreen from "../screens/NewsScreen";
import ChatScreen from "../screens/ChatScreen";
import AccountScreen from "../screens/AccountScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import CommentsScreen from "../screens/CommentsScreen";
import ChatDetailScreen from "../screens/ChatDetailScreen";
import ProfileScreen from "../screens/ProfileScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "black",
        labelPosition: "below-icon",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 11, color: color }}>Trang chủ</Text>
          ),
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={23} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Categories"
        component={CategoriesTabNavigator}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 11, color: color }}>Danh mục</Text>
          ),
          tabBarIcon: ({ color }) => (
            <Feather name="grid" size={23} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="News"
        component={NewsTabNavigator}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 11, color: color }}>Tin mới</Text>
          ),
          tabBarIcon: ({ color }) => (
            <AntDesign name="laptop" size={23} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatTabNavigator}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 11, color: color }}>Chat</Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-chatbubble-outline" size={23} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountTabNavigator}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 11, color: color }}>Tôi</Text>
          ),
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={23} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const HomeTabStack = createStackNavigator<HomeTabParamList>();

function HomeTabNavigator() {
  return (
    <HomeTabStack.Navigator>
      <HomeTabStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeTabStack.Navigator>
  );
}

const CategoriesTabStack = createStackNavigator<CategoriesTabParamList>();

function CategoriesTabNavigator() {
  return (
    <CategoriesTabStack.Navigator>
      <CategoriesTabStack.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{ headerShown: false }}
      />
    </CategoriesTabStack.Navigator>
  );
}

const NewsTabStack = createStackNavigator<NewsTabParamList>();

function NewsTabNavigator() {
  return (
    <NewsTabStack.Navigator>
      <NewsTabStack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{ headerShown: false }}
      />
    </NewsTabStack.Navigator>
  );
}

const ChatTabStack = createStackNavigator();

function ChatTabNavigator() {
  return (
    <ChatTabStack.Navigator>
      <ChatTabStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </ChatTabStack.Navigator>
  );
}

const AccountTabStack = createStackNavigator<AccountTabParamList>();

function AccountTabNavigator() {
  return (
    <AccountTabStack.Navigator>
      <AccountTabStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerShown: false }}
      />

      <AccountTabStack.Screen
        name="InfoScreen"
        options={{ title: "Sửa hồ sơ" }}
        component={ProfileScreen}
      />
    </AccountTabStack.Navigator>
  );
}
