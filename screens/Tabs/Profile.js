import { SafeAreaView, RefreshControl, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import Admin from "./Admin";
import User from "./User";
import { ScrollView } from "react-native";

export default function Profile({ navigation }) {
  let adminValue = null;
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection("users").doc(userId);
    userRef.get().then((doc) => {
      const userData = doc.data();
      const admin = userData.admin;
      setAdmin(admin);
      adminValue = admin; // set the variable value inside the useEffect
    });
  }, []);

  return <SafeAreaView>{admin === "evet" ? <Admin /> : <User />}</SafeAreaView>;
}
