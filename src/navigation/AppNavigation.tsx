import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen'
import HomeScreen from '../screens/HomeScreen';
import BottomTabNavigator from './BottomTabNavigator';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} >
      <Stack.Screen name='DashboardScreen' component={BottomTabNavigator}/>
      {/* <Stack.Screen name='HomeScreen' component={HomeScreen}/> */}
      {/* <Stack.Screen name='BottomTabNavigator' component={BottomTabNavigator}/> */}
    </Stack.Navigator>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})