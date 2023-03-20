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
import SelectDropdown from "react-native-select-dropdown";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function EditService({ navigation }) {
  const [notadmins, setNotAdmins] = useState(null);
  const [servicename, setservicename] = useState("");
  const [servicetime, setservicetime] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [stat, setStat] = useState("");
  const handleSubmit2 = async () => {
    //Check for the Name TextInput
    if (!servicename.trim()) {
      alert("Please Enter Service Name");
      return;
    }
    //Check for the Email TextInput
    if (!servicetime.trim()) {
      alert("Please Enter Service Time");
      return;
    }
    if (stat === null) {
      alert("Please Add Category");
      return;
    }
    if (image === null) {
      alert("Please add an image.");
      return;
    }
    const userRef = firebase.firestore().collection("services").doc();
    userRef
      .set({
        name: servicename,
        location: servicetime,
        imgUrl: image,
        Status: stat,
      })
      .then(() => {
        console.log("Document successfully updated!");
        const docId = userRef.id; // get the ID of the newly created document
        console.log("New document ID: ", docId);
        // update the serviceId field with the document ID
        // assuming serviceId is a state variable
        setServiceId(docId);

        // update the document with the serviceId field
        userRef
          .update({
            serviceId: docId,
          })
          .then(() => {
            setservicename("");
            setservicetime("");
            setImage(null);
            setStat(null);
            console.log("Document successfully updated!");
            alert("Service Succesfully added");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  useEffect(() => {}, [image]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUploading(true);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const filename = result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf("/") + 1
      );

      var ref = firebase.storage().ref().child(filename).put(blob);
      try {
        await ref;
      } catch (e) {}
      setUploading(false);
      const downloadUrl = await firebase
        .storage()
        .ref()
        .child(filename)
        .getDownloadURL();
      setImage(downloadUrl);
    }
  };

  const [image, setImage] = useState(null);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("services")
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
  }, []);

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
          .filter((item) => item.name.toLowerCase().includes(filterToken))
          .map((item) => ({
            title: item.name,
            fullname: item.location,
            userId: item.serviceId,
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
    .collection("services")
    .doc(selectedUserId);
  const selectedUserId = selectedItem;
  const [uploading, setUploading] = useState("");
  const [admin, setAdmin] = useState("");
  const categories = ["Man", "Kid"];
  const handleSubmit = async () => {
    try {
      const docRef = firebase
        .firestore()
        .collection("services")
        .doc(selectedItem);
      await docRef.delete();
      alert("Service Deleted Successfully!");
      console.log("Document successfully deleted!", selectedItem);
      setSelectedItem(null);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
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

  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!servicename.trim()) {
      alert("Please Enter Name");
      return;
    }
    //Check for the Email TextInput
    if (!servicetime.trim()) {
      alert("Please Enter Email");
      return;
    }
    //Checked Successfully
    //Do whatever you want
    alert("Success");
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible6(true)}>
        <ListItem containerStyle={{ backgroundColor: "#181818", width: width }}>
          <ListItem.Content style={{ flex: 1, flexDirection: "row" }}>
            <ListItem.Title style={{ color: "#fff", width: width * (12 / 14) }}>
              Service Settings
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
            <View style={{ height: height * (3 / 4) }}>
              <View style={{ marginBottom: width < 375 ? 10 : 25 }}>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor={"#909090"}
                  style={styles.input}
                  value={servicename}
                  onChangeText={setservicename}
                />
                <TextInput
                  placeholder="Time"
                  keyboardType="number-pad"
                  placeholderTextColor={"#909090"}
                  style={styles.input}
                  value={servicetime}
                  onChangeText={setservicetime}
                />
                <SelectDropdown
                  data={categories}
                  buttonStyle={{
                    borderRadius: 10,
                    width: width - 50,
                    marginTop: 5,
                    justifyContent: "center",
                    flexDirection: "column",
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    backgroundColor: "#404040",
                  }}
                  placeholderTextColor={"#fff"}
                  defaultButtonText={"Category"}
                  dropdownStyle={{ backgroundColor: "#404040" }}
                  rowTextStyle={{ color: "#fff" }}
                  selectedRowStyle={{ backgroundColor: "#181818" }}
                  selectedRowTextStyle={{ color: "#fff" }}
                  buttonTextStyle={{
                    justifyContent: "center",
                    marginTop: 12,
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    textAlign: "center",
                    color: "#909090",
                    fontSize: 15,
                  }}
                  onSelect={(selectedItem, index) => {
                    setStat(index + 1);
                    // add this line to display the index
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
                <View
                  style={{
                    backgroundColor: "#404040",
                    width: width - 50,
                    alignItems: "center",
                    borderRadius: 10,
                    flexDirection: "row",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#909090",
                      textAlign: "center",
                      fontSize: 13,
                      paddingLeft: 0,
                      fontWeight: "600",
                      width: 120,
                    }}
                  >
                    Choose Picture
                  </Text>
                  <View style={{ marginLeft: width < 375 ? 20 : 85 }}>
                    <TouchableOpacity onPress={pickImage}>
                      {image ? (
                        <ImageBackground
                          source={{ uri: image }}
                          style={styles.button2}
                          imageStyle={{ borderRadius: 5 }}
                        >
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <MaterialIcons
                              name="insert-photo"
                              size={56}
                              color="#ffffff01"
                            />
                          </View>
                        </ImageBackground>
                      ) : (
                        <View style={styles.button2}>
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <MaterialIcons
                              name="insert-photo"
                              size={56}
                              color="#000"
                            />
                          </View>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 15,
                  width: width - 50,
                }}
              >
                <Text
                  style={{
                    color: "#668",
                    fontSize: 13,
                    width: width * (10 / 14),
                  }}
                >
                  Add Service : {selectedItem2}
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
                  <Text style={styles.buttonText2}>Add</Text>
                </TouchableOpacity>
              </View>

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
                suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
                onClear={onClearPress}
                onOpenSuggestionsList={onOpenSuggestionsList}
                loading={loading}
                useFilter={false} // set false to prevent rerender twice
                textInputProps={{
                  placeholder: "Search with Service Name",
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
              <View
                style={{
                  flexDirection: "row",
                  width: width - 50,
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    color: "#668",
                    fontSize: 13,
                    width: width * (10 / 14),
                  }}
                >
                  Remove Service : {selectedItem}
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
                  <Text style={styles.buttonText2}>Remove</Text>
                </TouchableOpacity>
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
                bottom: 30,
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
    borderRadius: 10,
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
    marginTop: 0,
    height: 120,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    width: 137,
    borderRadius: 10,
    backgroundColor: "#606060",
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
