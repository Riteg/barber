import React from "react";
import Redirect from "./Stack/Redirect";
import Intro2 from "./Stack/Intro2";
import LoginScreen from "./Stack/LoginScreen";
import RegisterScreen from "./Stack/RegisterScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function StackNavigator({ navigation }) {
  return (
    <Stack.Navigator>
    <Stack.Screen  options={{headerShown: false,presentation: 'modal',animationTypeForReplace: 'push',animation:'slide_from_right'}} name="Intro"component={Intro2}/>
    <Stack.Screen  options={{headerShown: false,presentation: 'modal',animationTypeForReplace: 'push',animation:'slide_from_right'}} name="LoginScreen" component={LoginScreen} />
    <Stack.Screen  options={{headerShown: false,presentation: 'modal',animationTypeForReplace: 'push',animation:'slide_from_right'}} name="RegisterScreen" component={RegisterScreen} />
  </Stack.Navigator>
  );
}
