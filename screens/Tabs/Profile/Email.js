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
export default function Email({ navigation }) {
  const userId = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userId);
  userRef.get().then((doc) => {
    const userData = doc.data();
    const email = userData.email;
    setCurrentEmail(email);
    const image = userData.image;
  });

  const [modalVisible3, setModalVisible3] = useState(false);
  const collectionRef = firebase.firestore().collection("users").doc(userId);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setnewEmail] = useState("");

  const handleChangeEmail = () => {
    // Get the current user
    const user = firebase.auth().currentUser;

    // Get the user's credentials
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    // Reauthenticate the user using their current credentials
    user
      .reauthenticateWithCredential(credentials)
      .then(() => {
        // Update the user's email
        return user.updateEmail(newEmail);
      })
      .then(() => {
        // Email updated successfully
        Alert.alert("Success", "Email updated successfully");
        setCurrentEmail(newEmail); // update the state with the new email

        // Update the email in Firestore
        return updateFirestoreEmail();
      })
      .catch((error) => {
        // Handle errors here
        Alert.alert("Error", error.message);
      })
      .finally(() => {
        setnewEmail(null);
        setModalVisible3(false);
      });
  };

  const updateFirestoreEmail = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const newDocRef = firebase.firestore().collection("users").doc(userId);
      await newDocRef.update({
        email: newEmail,
      });
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible3(true)}>
        <ListItem containerStyle={{ backgroundColor: "#181818" }}>
          <ListItem.Content>
            <ListItem.Title style={{ color: "#fff" }}>
              Email Address
            </ListItem.Title>
            <ListItem.Subtitle style={{ color: "#fff" }}>
              {currentEmail}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(false);
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "#121212",
              padding: 20,
              width: width - 60,
            }}
          >
            <TextInput
              placeholder="Current Email"
              placeholderTextColor={"#909090"}
              style={styles.input}
              value={currentEmail}
              onChangeText={setCurrentEmail}
            />
            <TextInput
              placeholder="New Email"
              value={newEmail}
              placeholderTextColor={"#909090"}
              style={styles.input}
              onChangeText={setnewEmail}
            />
            <TextInput
              secureTextEntry
              placeholder="Current Password"
              placeholderTextColor={"#909090"}
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={handleChangeEmail}
                style={styles.button2}
              >
                <Text style={styles.buttonText2}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible3(false)}
                style={styles.button3}
              >
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
