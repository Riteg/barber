import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import TabNavigator from "./screens/TabNavigator"
import StackNavigator from "./screens/StackNavigator";
import { LogBox } from 'react-native';
import registerNNPushToken from 'native-notify';
import { getPushDataObject } from 'native-notify';



LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications



export default function App() {










  registerNNPushToken(6821, 'JQu9lUf2yV3cibDTlogGKK');
  let pushDataObject = getPushDataObject();
  useEffect(() => {
       console.log(pushDataObject);
  }, [pushDataObject]);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (user) {
    return (
      <>
        <ExpoStatusBar hidden={true} />
        <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
      </>

    );
  }
  return (
    <>
    <ExpoStatusBar hidden={true} />
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
    </>
  );
}