import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native-web";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { SafeAreaView } from "react-native";

const Dashboard = () => {
  const [name, setName] = useState("");

  useEffect(()=>{
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot)=> {
      if(snapshot.exists){
        setName(snapshot.data())
      }
      else{
        console.log("user not found")
      }
    })
  },[])

  return(
    <SafeAreaView>
      <Text>Hello</Text>
    </SafeAreaView>
  )
};

export default RegisterScreen;
