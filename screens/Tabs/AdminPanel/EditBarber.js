import {
  View,
  RefreshControl,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  Button,
  Modal,
  Platform,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  ViewComponent,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { auth } from "../../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tab, Text, TabView, ListItem, Avatar, Image } from "@rneui/themed";
import * as firebase from "firebase";
import { signOut } from "firebase/auth";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function EditBarber({ navigation }) {
  const [notadmins, setNotAdmins] = useState(null);
  useEffect(
    () => {
      const unsubscribe = firebase
        .firestore()
        .collection("users")
        .where("barber", "!=", "yes")
        .onSnapshot((querySnapshot) => {
          const userData2 = [];
          querySnapshot.forEach((doc) => {
            userData2.push(doc.data());
          });
          setNotAdmins(userData2);
        });

      return () => {
        unsubscribe();
      };
    },
    [
      /*console.log("Admin Olmayanlar",notadmins)*/
    ]
  );

  const searchRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownController = useRef(null);
  const dropdownController2 = useRef(null);
  const getSuggestions = useCallback(
    async (q) => {
      const filterToken = q.toLowerCase();
      console.log("getSuggestions", q);
      if (typeof q !== "string" || q.length === 0) {
        setSuggestionsList(null);
        return;
      }
      setLoading(true);

      if (Array.isArray(notadmins)) {
        const suggestions = notadmins
          .filter((item) => item.email.toLowerCase().includes(filterToken))
          .map((item) => ({
            title: item.email,
            fullname: item.fullname,
            userId: item.userId,
          }));
        setSuggestionsList(suggestions);
      } else {
        console.error("notadmins is not an array");
        setSuggestionsList(null);
      }

      setLoading(false);
    },
    [notadmins]
  );

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);
  const [userId2, setuserId2] = useState("");
  const onOpenSuggestionsList = useCallback((isOpened) => {}, []);
  const onOpenSuggestionsList2 = useCallback((isOpened) => {}, []);
  const userId = firebase.auth().currentUser.uid;
  const collectionRef = firebase
    .firestore()
    .collection("users")
    .doc(selectedUserId);
  const selectedUserId = selectedItem;
  const [berberlocation, setBerberlocation] = useState("");
  const [admin, setAdmin] = useState("");

  const handleSubmit = async () => {
    if (!berberlocation.trim()) {
      alert("Please Enter Barber Location");
      return;
    }
    if (selectedItem === null) {
      alert("Please Add Barber Email");
      return;
    }
    const userRef = firebase.firestore().collection("users").doc(selectedItem);
    userRef
      .update({
        barber: "yes",
        berberlocation: berberlocation,
      })
      .then(() => {
        console.log("Document successfully updated!");
        alert("Barber Added Succesfully");
      })
      .catch((error) => {
        console.error("Error updating document: ");
      });
  };
  const handleSubmit2 = async () => {
    const userRef = firebase.firestore().collection("users").doc(selectedItem2);
    userRef
      .update({
        barber: "no",
      })
      .then(() => {
        console.log("Document successfully updated!");
        alert("Barber Removed Succesfully");
      })
      .catch((error) => {
        console.error("Error updating document: ");
      });
  };

  const [admins, setAdmins] = useState("");
  useEffect(
    () => {
      const unsubscribe = firebase
        .firestore()
        .collection("users")
        .where("barber", "==", "yes")
        .onSnapshot((querySnapshot) => {
          const userData = [];
          querySnapshot.forEach((doc) => {
            userData.push(doc.data());
          });
          setAdmins(userData);
        });

      return () => {
        unsubscribe();
      };
    },
    [
      /*console.log("Admin Olanlar",admins)*/
    ]
  );
  const searchRef2 = useRef(null);
  const [suggestionsList2, setSuggestionsList2] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const getSuggestions2 = useCallback(
    async (q) => {
      const filterToken2 = q.toLowerCase();
      console.log("getSuggestions", q);
      if (typeof q !== "string" || q.length === 0) {
        setSuggestionsList2(null);
        return;
      }
      setLoading2(true);

      if (Array.isArray(admins)) {
        const suggestions2 = admins
          .filter((item) => item.email.toLowerCase().includes(filterToken2))
          .map((item) => ({
            title: item.email,
            fullname: item.fullname,
            userId: item.userId,
          }));
        setSuggestionsList2(suggestions2);
      } else {
        console.error("admins is not an array");
        setSuggestionsList2(null);
      }

      setLoading2(false);
    },
    [admins]
  );

  const onClearPress2 = useCallback(() => {
    setSuggestionsList2(null);
  }, []);

  const [modalVisible6, setModalVisible6] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible6(true)}>
        <ListItem containerStyle={{ backgroundColor: "#181818", width: width }}>
          <ListItem.Content style={{ flex: 1, flexDirection: "row" }}>
            <ListItem.Title style={{ color: "#fff", width: width * (12 / 14) }}>
              Berber Settings
            </ListItem.Title>
            <ListItem.Chevron color="white" />
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible6}
        onRequestClose={() => {
          setModalVisible6(false);
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "#121212",
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              width: width,
              height: height,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
                height: "20%",
              }}
            >
              <View style={{ marginBottom: 20 }}>
                <View style={{ marginBottom: 20 }}>
                  <AutocompleteDropdown
                    ref={searchRef}
                    controller={(controller) => {
                      dropdownController.current = controller;
                    }}
                    // initialValue={'1'}
                    direction={Platform.select({ ios: "down" })}
                    dataSet={suggestionsList}
                    onChangeText={getSuggestions}
                    onSelectItem={(item) => {
                      item && setSelectedItem(item.userId);
                    }}
                    debounce={600}
                    suggestionsListMaxHeight={
                      Dimensions.get("window").height * 0.4
                    }
                    onClear={onClearPress}
                    onOpenSuggestionsList={onOpenSuggestionsList}
                    loading={loading}
                    useFilter={false} // set false to prevent rerender twice
                    textInputProps={{
                      placeholder: "Search with Email",
                      autoCorrect: false,
                      autoCapitalize: "none",
                      style: {
                        borderRadius: 25,
                        backgroundColor: "#383b42",
                        color: "#fff",
                        paddingLeft: 18,
                      },
                    }}
                    rightButtonsContainerStyle={{
                      right: 8,
                      height: 30,

                      alignSelf: "center",
                    }}
                    inputContainerStyle={{
                      backgroundColor: "#383b42",
                      borderRadius: 5,
                    }}
                    suggestionsListContainerStyle={{
                      backgroundColor: "#383b42",
                    }}
                    containerStyle={{
                      flexGrow: 1,
                      flexShrink: 1,
                      justifyContent: "center",
                      width: width - 50,
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                    renderItem={(item, text) => (
                      <Text style={{ color: "#fff", padding: 15 }}>
                        {item.title}
                      </Text>
                    )}
                    ChevronIconComponent={
                      <Feather name="chevron-down" size={20} color="#fff" />
                    }
                    ClearIconComponent={
                      <Feather name="x-circle" size={18} color="#fff" />
                    }
                    inputHeight={50}
                    showChevron={true}
                    closeOnBlur={false}
                    //  showClear={false}
                  ></AutocompleteDropdown>
                  <TextInput
                    placeholder="Add Location"
                    placeholderTextColor={"#909090"}
                    style={styles.input}
                    value={berberlocation}
                    onChangeText={setBerberlocation}
                  />
                </View>
                <View style={{ flexDirection: "row", width: width - 50 }}>
                  <Text
                    style={{
                      color: "#668",
                      fontSize: 13,
                      width: width * (10 / 14),
                    }}
                  >
                    Add Barber : {selectedItem}
                  </Text>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      backgroundColor: "#d90",
                      width: width * (2 / 14),
                      height: 30,
                      borderRadius: 35,
                      justifyContent: "center",
                      alignContent: "flex-end",
                    }}
                  >
                    <Text style={styles.buttonText2}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginBottom: 20 }}>
                <View style={{ marginBottom: 20 }}>
                  <AutocompleteDropdown
                    ref={searchRef2}
                    controller={(controller) => {
                      dropdownController2.current = controller;
                    }}
                    // initialValue={'1'}
                    direction={Platform.select({ ios: "down" })}
                    dataSet={suggestionsList2}
                    onChangeText={getSuggestions2}
                    onSelectItem={(item) => {
                      item && setSelectedItem2(item.userId);
                    }}
                    debounce={600}
                    suggestionsListMaxHeight={
                      Dimensions.get("window").height * 0.4
                    }
                    onClear={onClearPress2}
                    onOpenSuggestionsList={onOpenSuggestionsList2}
                    loading={loading2}
                    useFilter={false} // set false to prevent rerender twice
                    textInputProps={{
                      placeholder: "Search with Email",
                      autoCorrect: false,
                      autoCapitalize: "none",
                      style: {
                        borderRadius: 25,
                        backgroundColor: "#383b42",
                        color: "#fff",
                        paddingLeft: 18,
                      },
                    }}
                    rightButtonsContainerStyle={{
                      right: 8,
                      height: 30,

                      alignSelf: "center",
                    }}
                    inputContainerStyle={{
                      backgroundColor: "#383b42",
                      borderRadius: 5,
                    }}
                    suggestionsListContainerStyle={{
                      backgroundColor: "#383b42",
                    }}
                    containerStyle={{
                      flexGrow: 1,
                      flexShrink: 1,
                      justifyContent: "center",
                      width: width - 50,
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                    renderItem={(item, text) => (
                      <Text style={{ color: "#fff", padding: 15 }}>
                        {item.title}
                      </Text>
                    )}
                    ChevronIconComponent={
                      <Feather name="chevron-down" size={20} color="#fff" />
                    }
                    ClearIconComponent={
                      <Feather name="x-circle" size={18} color="#fff" />
                    }
                    inputHeight={50}
                    showChevron={true}
                    closeOnBlur={false}
                    //  showClear={false}
                  ></AutocompleteDropdown>
                </View>
                <View style={{ flexDirection: "row", width: width - 50 }}>
                  <Text
                    style={{
                      color: "#668",
                      fontSize: 13,
                      width: width * (10 / 14),
                    }}
                  >
                    Remove Barber : {selectedItem2}
                  </Text>
                  <TouchableOpacity
                    onPress={handleSubmit2}
                    style={{
                      backgroundColor: "#d90",
                      width: width * (2 / 14),
                      height: 30,
                      borderRadius: 35,
                      justifyContent: "center",
                      alignContent: "flex-end",
                    }}
                  >
                    <Text style={styles.buttonText2}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                width: width,
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                bottom: 50,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible6(false)}
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
    width: "30%",
    borderRadius: 0,
    backgroundColor: "#800020",
  },
  buttonText2: {
    color: "#fff",
    fontWeight: "700",
    fontSize: width < 375 ? 9 : 13,
    justifyContent: "center",
    textAlign: "center",
  },
  text: {
    color: "white",
  },
});
