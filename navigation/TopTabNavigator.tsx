import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { TopTabParamList } from '../types';
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const TopTabStack = createStackNavigator<TopTabParamList>();

export default function TopTabNavigator() {
  return (
    <TopTabStack.Navigator>
      <TopTabStack.Screen name="SearchScreen" component={SearchScreen} />
      <TopTabStack.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <TopTabStack.Screen name="CartScreen" component={CartScreen} />
    </TopTabStack.Navigator>
  );
}