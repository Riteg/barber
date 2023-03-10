import {
  View,
  RefreshControl,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  Button,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  ViewComponent,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tab, Text, TabView, ListItem, Avatar, Image } from "@rneui/themed";
import * as firebase from "firebase";
import { Alert } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function Password({ navigation }) {
  const userId = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userId);
  userRef.get().then((doc) => {
    const userData = doc.data();
    const password = userData.password;
    setPassword(password)
  });

  const [modalVisible4, setModalVisible4] = useState(false);
  const collectionRef = firebase.firestore().collection("users").doc(userId);
  const [password, setPassword] = React.useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = () => {
    // Get the current user
    const user = firebase.auth().currentUser;

    // Get the user's credentials
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    // Reauthenticate the user using their current credentials
    user.reauthenticateWithCredential(credentials)
      .then(() => {
        // Update the user's password
        return user.updatePassword(newPassword);
      })
      .then(() => {
        // Password updated successfully
        Alert.alert('Success', 'Password updated successfully');
        return updateFirestorePassword();
      })
      .catch((error) => {
        // Handle errors here
        Alert.alert('Error', error.message);
      });
      setModalVisible4(false)
  };

  const updateFirestorePassword = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const newDocRef = firebase.firestore().collection('users').doc(userId);
      await newDocRef.update({
        password: newPassword,
      });
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  }; 

  return (
    <>
    <TouchableOpacity onPress={() => setModalVisible4(true)}>
    <ListItem containerStyle={{ backgroundColor: "#181818" }}>
      <ListItem.Content>
        <ListItem.Title style={{ color: "#fff" }}>Password</ListItem.Title>
        <ListItem.Subtitle style={{ color: "#fff" }}>
          *****
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  </TouchableOpacity>
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible4}
    onRequestClose={() => {
      setModalVisible4(false);
    }}
  >
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          backgroundColor: "#121212",
          padding: 20,
          width:width-60,
        }}
      >
  <TextInput
    secureTextEntry
    placeholder="Current Password"
    placeholderTextColor={"#909090"}
    style={styles.input}
    value={currentPassword}
    onChangeText={setCurrentPassword}
  />
  <TextInput
    secureTextEntry
    placeholder="New Password"
    value={newPassword}
    placeholderTextColor={"#909090"}
    style={styles.input}
    onChangeText={setNewPassword}
  />
    <View style={{flexDirection:"row"}}>
    <TouchableOpacity onPress={handleChangePassword}          
        style={styles.button2}>
      <Text style={styles.buttonText2}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible4(false)}          
        style={styles.button3}>
      <Text style={styles.buttonText2}>Close</Text>
        </TouchableOpacity>
    </View>
      </View>
    </View>
  </Modal>
  </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 150,
    width: width,
  },
  edit: {
    position: "absolute",
    right: 3,
    backgroundColor: "#00000064",
    height: 25,
  },
  editText: {
    color: "#fff",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },
  editText2: {
    color: "#fff",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 8,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    flex: 1,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#404040",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
  },

  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 15,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 80,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#d90",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    justifyContent: "center",
    textAlign: "center",
  },
  button2: {
    marginTop: 20,
    height: 45,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "49%",
    borderRadius: 0,
    backgroundColor: "#123123",
  },
  button3: {
    marginTop: 20,
    height: 45,
    marginLeft: "2%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "49%",
    borderRadius: 0,
    backgroundColor: "#800020",
  },
  buttonText2: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    justifyContent: "center",
    textAlign: "center",
  },
  text: {
    color: "white",
  },
});
