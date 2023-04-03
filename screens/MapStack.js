import React from "react";
import ChooseService from "./Stack/ChooseService";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChooseBarber from "./Stack/ChooseBarber";
import ChooseTime from "./Stack/ChooseTime";
import Finish from "./Stack/Finish";
const Stack = createNativeStackNavigator();

export default function MapStack({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ gestureDirection: "vertical", gestureEnabled: true, fullScreenGestureEnabled: true }}>
      <Stack.Screen options={{ headerShown: false, presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} name="ChooseService" component={ChooseService} />
      <Stack.Screen options={{ headerShown: false, presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} name="ChooseBarber" component={ChooseBarber} />
      <Stack.Screen options={{ headerShown: false, presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} name="Finish" component={Finish} />
      <Stack.Screen options={{ headerShown: false, presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} name="ChooseTime" component={ChooseTime} />
    </Stack.Navigator>
  );
}
