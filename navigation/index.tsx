import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import RegisterScreen from "../screens/RegisterScreen"
import LoginScreen from '../screens/LoginScreen'

import { RootStackParamList, StackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import TopTabNavigator from './TopTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import CommentsScreen from '../screens/CommentsScreen'
import ProductReviews from '../screens/ProductReviews'
import PurchaseScreen from '../screens/PurchaseScreen'
import PurchaseDetailsScreen from '../screens/PurchaseDetailsScreen'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={RootStackTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}


const RootStack = createStackNavigator<StackParamList>();

function RootStackTabNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="PurchaseDetailsScreen"
        options={{ title: "Thông tin đơn hàng" }}
        component={PurchaseDetailsScreen}
      />
      <RootStack.Screen
        name="PurchaseScreen"
        options={{ title: "Đơn mua" }}
        component={PurchaseScreen}
      />
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="BottomNav"
        component={BottomTabNavigator}
        options={{ headerShown: false }} />
      <RootStack.Screen
        name="TopNav"
        component={TopTabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ItemDetailScreen"
        component={ItemDetailScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="CommentsScreen"
        options={{ title: 'Bình luận' }}
        component={CommentsScreen}
      />
      <RootStack.Screen
        name="ProductReviewsScreen"
        options={{ title: 'Gửi bình luận' }}
        component={ProductReviews}
      />
    </RootStack.Navigator>
  )
}
