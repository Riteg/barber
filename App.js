import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import TabNavigator from "./screens/TabNavigator"
import StackNavigator from "./screens/StackNavigator";
import MapStack from './screens/MapStack';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
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
