import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ViewComponent,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { firebase } from "../../config";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function History({ navigation }) {
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("appointment")
      .orderBy("currentDate", "desc")
      .onSnapshot((querySnapshot) => {
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setUserHastalik(userData);
      });

    return () => {
      unsubscribe();
    };
  }, [userId]);
  const [userHastalik, setUserHastalik] = useState("");
  const userId = firebase.auth().currentUser.uid;
  const hastaliklar = userHastalik;
  console.log(hastaliklar);
  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    console.log("yenilendi");
    setRefreshing(true);

    // Do something here to fetch and update the data

    setRefreshing(false);
  }
  const handleBarberPress = (barber, barberPhoto) => {
    setBarber(barber);
    setBarberPhoto(barberPhoto);
  };
  function Item(props) {
    return (
      <View
        style={{
          flexDirection: "column",
          marginTop: 10,
          height: 180,
          borderColor: "#181818",
          backgroundColor: "#2d2d2d",
          borderWidth: 3,
          borderRadius: 15,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: 50,
            width: "98%",
            paddingLeft: "2%",
            borderRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              height: 40,
              alignSelf: "center",
              backgroundColor: "#5a5a5a",
              borderRadius: 5,
            }}
          >
            <View
              style={{
                width: "60%",
                paddingTop: 2,
                paddingLeft: 15,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign
                name="calendar"
                style={{ marginRight: 10 }}
                size={24}
                color="white"
              />
              <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
                {props.item.time}
              </Text>
            </View>
            <View
              style={{
                width: "40%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{ width: "40%", flexDirection: "row", paddingTop: 0 }}
              >
                <AntDesign
                  name="clockcircleo"
                  style={{ marginLeft: 25 }}
                  size={24}
                  color="white"
                />
              </View>
              <View
                style={{ width: "60%", flexDirection: "row", paddingTop: 0 }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    marginTop: 0,
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {props.item.hour}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: props.item.barberPhoto }}
              style={{
                marginRight: 15,
                marginLeft: 15,
                width: 25,
                height: 25,
                borderColor: "#fff",
                borderWidth: 1,
                resizeMode: "contain",
                alignSelf: "center",
                alignContent: "center",
                alignItems: "center",
                borderRadius: 50,
              }}
            />
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: 11,
                marginTop: 5,
              }}
            >
              {props.item.barber}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="cut"
              style={{ marginRight: 15, marginLeft: 15 }}
              size={24}
              color="white"
            />
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: 11,
                marginTop: 5,
              }}
            >
              {props.item.service}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              height: 40,
              width: "96%",
              marginLeft: "2%",
              borderRadius: 15,
              backgroundColor: "#5a5a5a",
              borderColor: "#aaa",
              borderWidth: 2,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: 16,
                marginTop: 5,
              }}
            >
              Repeat Appointment
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#141313" }}>
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
            Appointment History
          </Text>
        </View>
        <View style={{ marginBottom: 50 }}>
          <ScrollView>
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: 18,
                marginLeft: 15,
              }}
            >
              Last Appointment
            </Text>
            <FlatList
              data={hastaliklar.slice(0, 2)}
              renderItem={Item}
              style={{ marginBottom: 0 }}
            />
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: 18,
                marginLeft: 15,
                marginTop: 15,
              }}
            >
              Old Appointment
            </Text>
            <FlatList
              data={hastaliklar.slice(2)}
              renderItem={Item}
              style={{ marginBottom: 50 }}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    marginBottom: 50,
  },
});
