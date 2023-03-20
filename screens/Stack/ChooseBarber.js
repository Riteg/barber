import React, { useRef, useState, useEffect, useMemo } from "react";

import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../config";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const { width: screenWidth } = Dimensions.get("window");
export default function ChooseBarber({ route, navigation }) {
  const [check3, setCheck3] = useState(false);
  const userId = firebase.auth().currentUser.uid;
  const { docum } = route.params;
  const { formatted, totalLocation ,expoPushToken} = route.params;
  const docId = docum;
  const collectionRef = firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("appointment");

  const handleSubmit = async (barber, barberPhoto, barberId) => {
    try {
      const newDocRef = collectionRef.doc(docId);
      await newDocRef.update({
        barber,
        barberPhoto,
        barberExpo,
        barberId,
      });
      console.log("Data saved successfully with ID:", newDocRef.id);
      const docum = newDocRef.id;
      navigation.navigate("ChooseTime", {
        docum,
        barberId,
        formatted,
        barberPhoto,
        barber,
        barberExpo,
        expoPushToken,
        totalLocation,
      });
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };
  const [barber, setBarber] = useState("");
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .where("barber", "==", "yes")
      .onSnapshot((querySnapshot) => {
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setBarbers(userData);
        setBarberId(userData.userId);
      });

    return () => {
      unsubscribe();
    };
  }, [userId, barberId]);

  const [barbers, setBarbers] = useState("");
  const [barberPhoto, setBarberPhoto] = useState("");
  const berber = barbers;
  const [barberId, setBarberId] = useState("");
  const [barberExpo, setBarberExpo] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    console.log("yenilendi");
    setRefreshing(true);

    // Do something here to fetch and update the data

    setRefreshing(false);
  }
  const handleBarberPress = (barber, barberPhoto, barberId,expoPushToken) => {
    setBarber(barber);
    setBarberPhoto(barberPhoto);
    setBarberId(barberId);
    setBarberExpo(expoPushToken)
  };

  const handleBarberPressAndSubmit = async (barber, barberPhoto, barberId) => {
    try {
      const newDocRef = collectionRef.doc(docId);
      await newDocRef.update({
        barber,
        barberPhoto,
        barberId,
      });
      console.log("Data saved successfully with ID:", newDocRef.id);
      const docum = newDocRef.id;
      navigation.navigate("ChooseTime", { docum }, { barberId });
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  function Item(props) {
    return (
      <View style={{ flexDirection: "row", padding: 7, width: width }}>
        <Image style={styles.serviceimg} source={{ uri: props.item.image }} />
        <View style={styles.item}>
          <Text style={{ color: "#fff" }}>{props.item.fullname}</Text>
          <Text style={{ color: "#fff" }}>{props.item.berberlocation}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            handleSubmit(
              props.item.fullname,
              props.item.image,
              props.item.userId
            )
          }
          onPressIn={() =>
            handleBarberPress(
              props.item.fullname,
              props.item.image,
              props.item.userId,
              props.item.expoPushToken,
            )
          }
          style={{
            backgroundColor: "#539165",
            marginLeft: 10,
            width: 80,
            height: 170,
            justifyContent: "center",
            alignSelf: "flex-end",
            marginRight: 5,
            borderRadius: 10,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fefefe" }}>Select</Text>
        </TouchableOpacity>
      </View>
    );
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
              Select Barber
            </Text>
          </View>
          <FlatList data={berber} renderItem={Item} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    marginBottom: 50,
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
    height: 170,
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
    width: width / 3,
    backgroundColor: "#181818",
  },
  barberbutton2: {
    textAlign: "center",
    marginVertical: 10,
    color: "#fff",
  },
  filterBar: {
    flexDirection: "row",
    // flex: 0.2,
    height: 100,
    color: "white",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
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
