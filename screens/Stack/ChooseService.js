import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import { Animated } from "react-native";
import { Pressable } from "react-native";
import { CheckBox } from "@rneui/themed/dist/CheckBox";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../config";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const { width: screenWidth } = Dimensions.get("window");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("31",token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function ChooseService({ props, navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    console.log("33",expoPushToken)
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("31",response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);






  const [status, setStatus] = useState("");
  const [barbers, setBarbers] = useState("");

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection("users").doc(userId);
    userRef
      .update({
        userId,
        expoPushToken:expoPushToken
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }, [userId]);
  const fullList = barbers;
  const userId = firebase.auth().currentUser.uid;
  const collectionRef = firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("appointment");
  const barberRef = firebase.firestore().collection("barbers");
  const [docum, setDocum] = useState("");
  collectionRef
    .doc()
    .get()
    .then((doc1) => {
      const index = 0;
      barberRef
        .where("index", "==", index)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc2) => {
            // Here, you can access the data from both documents.
            console.log(doc1.data(), doc2.data());
          });
        });
    });

  const handleSubmit = async () => {
    const newDocRef = collectionRef.doc();
    const formatted = await formattedServices;
    console.log("formattedServices:", formatted);
    if (!formatted.trim()) {
      alert("Please Select Service");
      return;
    }
    newDocRef
      .set({
        formatted,
        totalLocation,
      })
      .then(() => {
        console.log("Data saved successfully with ID:", newDocRef.id);
        const docum = newDocRef.id;
        navigation.navigate("ChooseBarber", {
          docum,
          service: formatted,
          totalLocation,
          expoPushToken,
        });
      })
      .then(() => {
        setSelectedItems([]);
        setTotalLocation(0);
      })
      .catch((error) => console.error("Error saving data: ", error));
  };

  const [service, setService] = useState("");
  const [ilac, setIlac] = useState("");
  const [tanim, setTanim] = useState("");
  const [tarih, setTarih] = useState("");

  const filteredList = useMemo(() => {
    if (!Array.isArray(fullList)) return [];
    if (status === "NONE") return fullList;
    return fullList.filter((item) => status === item.Status);
  }, [status, fullList]);
  const onClick = (status) => () => {
    setStatus(status);
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("services")
      .onSnapshot((querySnapshot) => {
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setBarbers(userData);
      });

    return () => {
      unsubscribe();
    };
  }, [userId]);
  const carouselRef = useRef();
  const [translateValue] = useState(new Animated.Value(0));
  const [selected, setSelected] = useState(0);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const [check3, setCheck3] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalLocation, setTotalLocation] = useState(0);
  const selectedServices = [
    ...new Set(selectedItems.map((item) => selectedItems.toString())),
  ];
  const formattedServices = selectedServices.join(", "); // using comma as delimiter
  const [selectedItemsLocationSum, setSelectedItemsLocationSum] = useState();

  function Item(props) {
    const handleSelect = () => {
      if (selectedItems.includes(props.item.name)) {
        setSelectedItems(
          selectedItems.filter((item) => item !== props.item.name)
        );
        setTotalLocation(Number(totalLocation) - Number(props.item.location));
      } else {
        setSelectedItems([...selectedItems, props.item.name]);
        setTotalLocation(Number(totalLocation) + Number(props.item.location));
      }
    };

    return (
      <View style={{ flexDirection: "row", padding: 7, width: width }}>
        <Image style={styles.serviceimg} source={{ uri: props.item.imgUrl }} />
        <View style={styles.item}>
          <Text style={{ color: "#fff" }}>{props.item.name}</Text>
          <Text style={{ color: "#fff" }}>{props.item.location} mins</Text>
        </View>
        <TouchableOpacity
          onPress={handleSelect}
          style={{
            backgroundColor: selectedItems.includes(props.item.name)
              ? "#DF2E38"
              : "#539165",
            marginLeft: 10,
            width: "25%",
            height: 80,
            borderRadius: 10,
            justifyContent: "center",
            alignSelf: "flex-end",
            marginRight: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fefefe" }}>
            {selectedItems.includes(props.item.name) ? "Remove" : "Select"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    console.log("yenilendi");
    setRefreshing(true);

    // Do something here to fetch and update the data

    setRefreshing(false);
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#181818" }}>
        <View
          style={{ width: width, height: height, backgroundColor: "#141414" }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#181818",
              height: 50,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                textAlign: "center",
                width: width,
                fontSize: 17,
                alignContent: "center",
              }}
            >
              Select Service
            </Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.barberbutton2}>Choose Category</Text>
            <View style={styles.filterBar}>
              <TouchableOpacity
                style={styles.button}
                title="Man"
                onPress={onClick(1)}
              >
                <Image
                  style={styles.tinyLogo}
                  source={require("../../assets/man.jpg")}
                />
                <Text style={styles.barberbutton2}>Man</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                title="Child"
                onPress={onClick(2)}
              >
                <Image
                  style={styles.tinyLogo}
                  source={require("../../assets/kid.jpg")}
                />
                <Text style={styles.barberbutton2}>Kids</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.barberbutton2}>Choose Service</Text>
            <FlatList ref={carouselRef} data={filteredList} renderItem={Item} />
            <View
              style={{
                flexDirection: "row",
                width: width,
                alignItems: "center",
                backgroundColor: "#141414",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: width / 2,
                  backgroundColor: "#161616",
                  borderTopLeftRadius: 25,
                }}
              >
                <Text style={styles.barberbutton3}>
                  <Ionicons
                    name="cut"
                    style={{ marginRight: 15, marginLeft: 15 }}
                    size={24}
                    color="white"
                  />
                </Text>
                <Text style={styles.barberbutton3}>
                  {" "}
                  {formattedServices ? formattedServices : "Empty"}
                </Text>
              </View>
              <View style={{ flexDirection: "column", width: width / 2 }}>
                <Text style={styles.barberbutton3}>
                  <MaterialCommunityIcons
                    name="timetable"
                    style={{ marginRight: 15, marginLeft: 15 }}
                    size={24}
                    color="white"
                  />
                </Text>
                <Text style={styles.barberbutton3}> {totalLocation} mins</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button2} onPress={handleSubmit}>
              <Text style={styles.barberbutton2}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 50,
    width: width,
  },
  list: {
    height: "100%",
    width: width,
    color: "white",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  serviceimg: {
    height: 75,
    width: 125,
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  tinyLogo: {
    height: 75,
    width: 100,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  button: {
    width: width / 2,
    backgroundColor: "#181818",
  },
  button2: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: width,
    height: 50,
    backgroundColor: "#d90",
  },
  barberbutton2: {
    textAlign: "center",
    marginVertical: 10,
    color: "#fff",
  },
  barberbutton3: {
    textAlign: "center",
    marginVertical: 8,
    marginLeft: 20,
    color: "#fff",
  },
  filterBar: {
    flexDirection: "row",
    // flex: 0.2,
    width: width,
    height: 100,
    color: "white",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    width: "75%",
    alignContent: "center",
    backgroundColor: "#181818",
    color: "white",
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "#181818",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  title: {
    color: "#fff",
    position: "absolute",
    bottom: 50,
    left: 25,
    textAlign: "left",
    alignContent: "center",
    alignSelf: "center",
    fontSize: 22,
  },
  price: {
    color: "#fff",
    position: "absolute",
    bottom: 25,
    left: 25,
    textAlign: "left",
    alignContent: "flex-start",
    alignSelf: "flex-start",
    fontSize: 22,
  },
});
