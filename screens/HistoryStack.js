import React from "react";
import ChooseService from "./Stack/ChooseService";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChooseBarber from "./Stack/ChooseBarber";
import ChooseTime from "./Stack/ChooseTime";
import Finish from "./Stack/Finish";
import Appointments from "./Stack/Appointments";
import CustomerAppointments from "./Tabs/CustomerAppointments";
import Requests from "./Stack/Requests";
import History from "./Tabs/History";
import Appointments2 from "./Stack/Appointments2";
const Stack = createNativeStackNavigator();

export default function MapStack({ navigation }) {
  return (
    <Stack.Navigator>
    <Stack.Screen  options={{headerShown: false,presentation: 'modal',animationTypeForReplace: 'push',animation:'slide_from_right'}} name="Appointments2" component={Appointments2} />
    <Stack.Screen  options={{headerShown: false,presentation: 'modal',animationTypeForReplace: 'push',animation:'slide_from_right'}} name="Appointments" component={Appointments} />
    <Stack.Screen  options={{headerShown: false,presentation: 'modal',animationTypeForReplace: 'push',animation:'slide_from_right'}} name="HistoryS" component={History} />
    <Stack.Screen  options={{headerShown: false,presentation: 'modal',animationTypeForReplace: 'push',animation:'slide_from_right'}} name="CustomerAppointments" component={CustomerAppointments} />
    <Stack.Screen  options={{headerShown: false,presentation: 'modal',animationTypeForReplace: 'push',animation:'slide_from_right'}} name="Requests" component={Requests} />
  </Stack.Navigator>
  );
}
