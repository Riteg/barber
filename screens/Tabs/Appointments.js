import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
  Image,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { firebase } from "../../config";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function Appointments({ navigation }) {
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("User_Accepted_Appointments")
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
  const combinedData = [
    { title: "Last Appointment", data: [] },
    { title: "Old Appointment", data: [] },
  ];
  const [userHastalik, setUserHastalik] = useState("");
  const userId = firebase.auth().currentUser.uid;
  const hastaliklar = userHastalik;
  const [refreshing, setRefreshing] = useState(!1);
  function onRefresh() {
    console.log("yenilendi");
    setRefreshing(!0);
    setRefreshing(!1);
  }
  function Item(props) {
    return (
      <View
        style={{
          flexDirection: "column",
          marginTop: 10,
          height: 150,
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
              source={{ uri: props.item.barberphoto }}
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
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="timetable"
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
              {props.item.totalLocation}mins.
            </Text>
          </View>
        </View>
      </View>
    );
  }
  if (hastaliklar) {
    combinedData[0].data = hastaliklar.slice(0, 2);
    combinedData[1].data = hastaliklar.slice(2, 6);
    return (
      <FlatList
        data={combinedData}
        style={{ marginBottom: 150 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#F8852D"
          />
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: 18,
                marginLeft: 15,
                marginTop: 15,
              }}
            >
              {item.title}
            </Text>
            <FlatList data={item.data} renderItem={Item} />
          </>
        )}
      />
    );
  } else {
    return (
      <Text
        style={{
          position: "absolute",
          top: 100,
          left: "35%",
          textAlign: "center",
          color: "#fff",
        }}
      >
        Loading...
      </Text>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    marginBottom: 50,
  },
});
