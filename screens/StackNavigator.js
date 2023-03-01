import React from "react";
import Redirect from "./Stack/Redirect";
import Intro from "./Stack/Intro";
import LoginScreen from "./Stack/LoginScreen";
import RegisterScreen from "./Stack/RegisterScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from "./TabNavigator";
const Stack = createNativeStackNavigator();

export default function StackNavigator({ navigation }) {
  return (
    <Stack.Navigator>
    <Stack.Screen  options={{ headerShown: false }} name="Intro"component={Intro}/>
    <Stack.Screen  options={{ headerShown: false }} name="RedirectHome"component={TabNavigator}/>
    <Stack.Screen  options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
    <Stack.Screen  options={{ headerShown: false }} name="RegisterScreen" component={RegisterScreen} />
  </Stack.Navigator>
  );
}
