import {
  View,
  SafeAreaView,
  RefreshControl,
  Dimensions,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tab, Text, TabView, ListItem, Avatar, Image } from "@rneui/themed";
import * as firebase from "firebase";
import { signOut } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import EditBarber from "./AdminPanel/EditBarber";
import EditAdmin from "./AdminPanel/EditAdmin";
import EditService from "./AdminPanel/EditService";
import ProfilePicture from "./Profile/ProfilePicture";
import { Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Admin({ navigation }) {
  function Item(props) {
    const { index, item } = props;
    return (
      <TouchableHighlight
        key={item.id}
        onPressIn={() => setSelectedItem(item.id)}
        onPress={() => setModalVisible(true)}
      >
        <View style={{ flex: 1, width: width }}>
          <ListItem
            containerStyle={{
              backgroundColor:
                index === 0
                  ? "#161616"
                  : index === 1
                  ? "#181818"
                  : index === 2
                  ? "#161616"
                  : index === 3
                  ? "#181818"
                  : "",
              height: width < 375 ? 49 : 75,
            }}
          >
            <ListItem.Content>
              <ListItem.Title
                style={{ color: "#9f9f9f", fontSize: width < 375 ? 12 : 24 }}
              >
                {item.title}
              </ListItem.Title>
              <ListItem.Subtitle
                style={{ color: "#fafafa", fontSize: width < 375 ? 11 : 24 }}
              >
                {index === 0
                  ? fullname
                  : index === 1
                  ? currentEmail
                  : index === 2
                  ? phone
                  : index === 3
                  ? "****"
                  : ""}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="white" />
          </ListItem>
        </View>
      </TouchableHighlight>
    );
  }

  const data = [
    { id: "1", title: "FullName" },
    { id: "2", title: "Email" },
    { id: "3", title: "Phone" },
    { id: "4", title: "Password" },
  ];

  const [modalVisible, setModalVisible] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [index, setIndex] = React.useState(0);
  const [fullname, setFullname] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [adminmi, setAdminmi] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState("");
  const [phonenew, setPhonenew] = useState("");
  const [uploading, setUploading] = useState("");
  const [emailnew, setEmailnew] = useState("");
  const [fullnamenew, setFullnamenew] = useState("");
  const collectionRef = firebase.firestore().collection("users").doc(userId);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setnewEmail] = useState("");
  const [documentCount, setDocumentCount] = useState(0);
  const [servicescount, setServicesCount] = useState(0);
  const [barbercount, setBarberCount] = useState(0);
  const [admincount, setAdminCount] = useState(0);
  const [acceptedapps, setAcceptedapps] = useState(0);
  const [documentCount2, setDocumentCount2] = useState(0);
  const userId = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userId);

  userRef.get().then((doc) => {
    const userData = doc.data();
    const fullname = userData.fullname;
    setFullname(fullname);
    const phone = userData.phone;
    setPhone(phone);
    const password = userData.password;
    setPassword(password);
    const email = userData.email;
    setCurrentEmail(email);
    const image = userData.image;
    setImage(image);
    const admin = userData.admin;
  });
  let adminValue = null;
  const [admin, setAdmin] = useState(null);

  const renderModal = () => {
    switch (selectedItem) {
      case "1":
        return (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#121212",
                  padding: 20,
                  width: width - 60,
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={"#909090"}
                  onChangeText={(fullnamenew) => setFullnamenew(fullnamenew)}
                  keyboardType={"default"}
                />
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => handleSubmit2(fullnamenew)}
                    style={styles.button2}
                  >
                    <Text style={styles.buttonText2}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.button3}
                  >
                    <Text style={styles.buttonText2}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        );
      case "2":
        return (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
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
                    onPress={() => setModalVisible(false)}
                    style={styles.button3}
                  >
                    <Text style={styles.buttonText2}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        );
      case "3":
        return (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#121212",
                  padding: 20,
                  width: width - 60,
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor={"#909090"}
                  onChangeText={(phonenew) => setPhonenew(phonenew)}
                  keyboardType={"phone-pad"}
                  maxLength={11}
                />
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => handleSubmit(phonenew)}
                    style={styles.button2}
                  >
                    <Text style={styles.buttonText2}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.button3}
                  >
                    <Text style={styles.buttonText2}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        );
      case "4":
        return (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#121212",
                  padding: 20,
                  width: width - 60,
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
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={handleChangePassword}
                    style={styles.button2}
                  >
                    <Text style={styles.buttonText2}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.button3}
                  >
                    <Text style={styles.buttonText2}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        );
      default:
        return null;
    }
  };

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

  useEffect(() => {
    const collectionRef = firebase.firestore().collection("users");
    const unsubscribe = collectionRef.onSnapshot((querySnapshot) => {
      setDocumentCount(querySnapshot.size);
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const collectionRef = firebase.firestore().collection("services");
    const unsubscribe = collectionRef.onSnapshot((querySnapshot) => {
      setServicesCount(querySnapshot.size);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const collectionRef = firebase
      .firestore()
      .collection("users")
      .where("barber", "==", "yes");
    const unsubscribe = collectionRef.onSnapshot((querySnapshot) => {
      setBarberCount(querySnapshot.size);
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const collectionRef = firebase
      .firestore()
      .collection("users")
      .where("admin", "==", "evet");
    const unsubscribe = collectionRef.onSnapshot((querySnapshot) => {
      setAdminCount(querySnapshot.size);
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const collectionRef2 = firebase.firestore().collection("users");
    const unsubscribe = collectionRef2.onSnapshot((querySnapshot) => {
      let count = 0;
      querySnapshot.forEach((doc) => {
        const appointmentRef = doc.ref.collection("appointment");
        appointmentRef.get().then((subCollectionSnapshot) => {
          count += subCollectionSnapshot.size;
          setDocumentCount2(count);
        });
      });
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    const collectionRef2 = firebase.firestore().collection("users");
    const unsubscribe = collectionRef2.onSnapshot((querySnapshot) => {
      let count = 0;
      querySnapshot.forEach((doc) => {
        const appointmentRef = doc.ref.collection(
          "Barber_Accepted_Appointments"
        );
        appointmentRef.get().then((subCollectionSnapshot) => {
          count += subCollectionSnapshot.size;
          setAcceptedapps(count);
        });
      });
    });

    return unsubscribe;
  }, []);

  const handleChangePassword = () => {
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
        // Update the user's password
        return user.updatePassword(newPassword);
      })
      .then(() => {
        // Password updated successfully
        Alert.alert("Success", "Password updated successfully");
        return updateFirestorePassword();
      })
      .catch((error) => {
        // Handle errors here
        Alert.alert("Error", error.message);
      });
    setModalVisible(false);
  };
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
        setModalVisible(false);
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
  const updateFirestorePassword = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const newDocRef = firebase.firestore().collection("users").doc(userId);
      await newDocRef.update({
        password: newPassword,
      });
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  const handleSubmit = async (phone) => {
    try {
      setPhone(phonenew);
      console.log(userId);
      const collectionRef = firebase
        .firestore()
        .collection("users")
        .doc(userId);
      await collectionRef.update({
        phone,
      });
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating phone number:", error);
    }
  };
  const handleSubmit2 = async (fullname) => {
    try {
      setFullname(fullnamenew);
      const collectionRef = firebase
        .firestore()
        .collection("users")
        .doc(userId);
      await collectionRef.update({
        fullname,
      });
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating phone number:", error);
    }
  };
  const [refreshing, setRefreshing] = useState(!1);
  function onRefresh() {
    console.log("yenilendi");
    setRefreshing(!0);
    setRefreshing(!1);
  }
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#141414",
          height: 50,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "700",
            alignItems: "center",
            fontSize: 17,
            alignContent: "center",
            textAlign: "center",
            width: width,
            fontSize: 17,
          }}
        >
          Profile
        </Text>
      </View>
      <Tab
        value={index}
        containerStyle={{
          height: 50,
          backgroundColor: "#161616",
          borderTopColor: "#999",
          borderTopWidth: 0.2,
        }}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 2,
        }}
        variant="primary"
      >
        <Tab.Item title="Profile" titleStyle={{ fontSize: 12 }} />
        <Tab.Item title="Notifications" titleStyle={{ fontSize: 12 }} />
        <Tab.Item title="Admin" titleStyle={{ fontSize: 12 }} />
      </Tab>
      <TabView
        value={index}
        onChange={setIndex}
        animationType="timing"
        disableSwipe={true}
      >
        <TabView.Item style={{ backgroundColor: "#181818", width: "100%" }}>
          <View
            style={{ width: width, height: height, backgroundColor: "#181818" }}
          >
            <ProfilePicture />
            <ListItem
              containerStyle={{ backgroundColor: "#181818", marginTop: 0 }}
            >
              <ListItem.Content>
                <ListItem.Title style={{ color: "#fff", marginTop: 5 }}>
                  Admin Information
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <FlatList
              data={data}
              renderItem={Item}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#F8852D"
                />
              }
              keyExtractor={(item) => item.id}
              style={{ flexGrow: 1 }}
            />
            {renderModal()}
          </View>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "#181818", width: "100%" }}>
          <View
            style={{ width: width, height: height, backgroundColor: "#181818" }}
          >
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                top: height - 180,
              }}
            >
              <View style={{ width: width }}>
                <Text style={styles.editText2}>²°²³</Text>
              </View>
            </View>
          </View>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "#181818", width: "100%" }}>
          <View
            style={{ width: width, height: height, backgroundColor: "#181818" }}
          >
            <EditAdmin />
            <EditBarber />
            <EditService />
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <TouchableHighlight
                onPress={() => console.log("Total Customer pressed")}
              >
                <View
                  style={{
                    width: width / 2,
                    height: 60,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.editText}>Total Customer</Text>
                  <Text style={styles.editText}>{documentCount}</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => console.log("Total Appointments pressed")}
              >
                <View
                  style={{
                    width: width / 2,
                    height: 60,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.editText}>Total Appointment</Text>
                  <Text style={styles.editText}>{documentCount2}</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <TouchableHighlight
                onPress={() => console.log("Total Services pressed")}
              >
                <View
                  style={{
                    width: width / 2,
                    height: 60,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.editText}>Total Services</Text>
                  <Text style={styles.editText}>{servicescount}</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => console.log("Total Barbers pressed")}
              >
                <View
                  style={{
                    width: width / 2,
                    height: 60,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.editText}>Total Barbers</Text>
                  <Text style={styles.editText}>{barbercount}</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <TouchableHighlight
                onPress={() => console.log("Total Admins pressed")}
              >
                <View
                  style={{
                    width: width / 2,
                    height: 60,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.editText}>Total Admins</Text>
                  <Text style={styles.editText}>{admincount}</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => console.log("Total Barbers pressed")}
              >
                <View
                  style={{
                    width: width / 2,
                    height: 60,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.editText}>Total Accepted Apps.</Text>
                  <Text style={styles.editText}>{acceptedapps}</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                top: height - 180,
              }}
            >
              <View style={{ width: width }}>
                <Text style={styles.editText2}></Text>
              </View>
            </View>
          </View>
        </TabView.Item>
      </TabView>
    </SafeAreaView>
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
