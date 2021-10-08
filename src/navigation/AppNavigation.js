import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import RecoverPassword from '../screens/RecoverPassword';
import ActivityGoal from '../screens/ActivityGoals/index';
import MonetaryGoal from '../screens/MonetaryGoal';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../screens/SignUp';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
        <Stack.Screen name="ActivityGoal" component={ActivityGoal} />
        <Stack.Screen name="MonetaryGoal" component={MonetaryGoal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppNavigationTab = () => {
  const initialRoute = 'Home';
  return (
    <NavigationContainer>
      <Tab.Navigator initialRoute={initialRoute}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="ActivityGoal" component={ActivityGoal} />
        <Tab.Screen name="MonetaryGoal" component={MonetaryGoal} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export { AppNavigation, AppNavigationTab };
