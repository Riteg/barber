import React from "react";
import Profile from "./Tabs/Profile";
import History from "./Tabs/History";
import Map from "./Tabs/Map";
import Settings from "./Tabs/Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5,MaterialIcons,FontAwesome,Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation }) {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({tabBarShowLabel:false,headerShown: false,tabBarLabelStyle:{fontSize:14},tabBarActiveBackgroundColor:"#262626",tabBarActiveTintColor:"#d90",tabBarStyle: {height: 50,paddingHorizontal: 5,paddingTop: 0,backgroundColor: '#181818',position: 'absolute',borderTopWidth: 0,}})} >
    <Tab.Screen name="Home" component={Map}options={{tabBarIcon: ({ color, size }) => (<FontAwesome5 name="cut" size={26} color="white" />)}}/>
    <Tab.Screen name="Geçmiş" component={History} options={{tabBarIcon: ({ color, size }) => (<MaterialIcons name="date-range" size={26} color="white" />)}}/>
    <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: ({ color, size }) => (<FontAwesome5 name="user" size={28} color="white" />)}}/>
    <Tab.Screen name="Settings" component={Settings} options={{tabBarIcon: ({ color, size }) => (<FontAwesome name="gear" size={28} color="white" />)}}/>
  </Tab.Navigator>
  );
}
