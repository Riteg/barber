import {
  View,
  RefreshControl,
  StyleSheet,
  FlatList,
  Image,
  Text,
} from "react-native";
import React from "react";
import { useEffect, useState, useMemo } from "react";
import { firebase } from "../../config";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function CustomerAppointments({ navigation }) {
  const [acceptedbarber, setAcceptedBarber] = useState("");
  const [acceptedcurrentdate, setAcceptedCurrentDate] = useState("");
  const [acceptedcustomerimage, setAcceptedCustomerImage] = useState("");
  const [acceptedcustomername, setAcceptedCustomerName] = useState("");
  const [accepteddocid, setAcceptedDocId] = useState("");
  const [acceptedhour, setAcceptedHour] = useState("");
  const [acceptedservice, setAcceptedService] = useState("");
  const [accepteddoc, setberberAcceptedDoc] = useState("");
  const [accepteddoc2, setberberAcceptedDoc2] = useState("");
  const [acceptedtime, setAcceptedTime] = useState("");
  const [barberaccepteddata, setBarberAcceptedData] = useState("");

  const combinedData = [
    { title: "Today's Appointments", data: [] },
    { title: "Future Appointments", data: [] },
  ];
  const filteredList = useMemo(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());

    const dateString = currentDate.toISOString().substring(0, 10);
    if (!Array.isArray(barberaccepteddata)) return [];
    if (acceptedtime === "null") {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate());

      const dateString = currentDate.toISOString().substring(0, 10);
      return barberaccepteddata.filter((item) => item.time !== dateString);
    } else {
      return barberaccepteddata.filter((item) => acceptedtime === item.time);
    }
  }, [acceptedtime, barberaccepteddata]);

  const userId = firebase.auth().currentUser.uid;

  function Item3(props) {
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
              source={{ uri: props.item.customerimage }}
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
              {props.item.customername}
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
              {props.item.totalLocation} mins.
            </Text>
          </View>
        </View>
      </View>
    );
  }
  useEffect(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());

    const dateString = currentDate.toISOString().substring(0, 10);
    console.log(dateString);

    // Get the current date/time
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("Barber_Accepted_Appointments")
      .where("time", ">=", dateString) // Only include documents where "time" is after or equal to the current date/time
      .orderBy("time", "asc")
      .onSnapshot((querySnapshot) => {
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setBarberAcceptedData(userData);

        if (userData.length > 0) {
          const firstUserData = userData[0];
          const barber = firstUserData.barber;
          setAcceptedBarber(barber || "");
          const currentDate = firstUserData.currentDate;
          setAcceptedCurrentDate(currentDate || "");
          const customerimage = firstUserData.customerimage;
          setAcceptedCustomerImage(customerimage || "");
          const customername = firstUserData.customername;
          setAcceptedCustomerName(customername || "");
          const docId = firstUserData.docId;
          setAcceptedDocId(docId || "");
          const hour = firstUserData.hour;
          setAcceptedHour(hour || "");
          const service = firstUserData.service;
          setAcceptedService(service || "");
          const time = firstUserData.time;
          setAcceptedTime(time || "");
        }
      });
    return () => {
      unsubscribe();
    };
  }, [userId]);
  const [refreshing, setRefreshing] = useState(!1);
  function onRefresh() {
    console.log("yenilendi");
    setRefreshing(!0);
    setRefreshing(!1);
  }
  if (barberaccepteddata) {
    combinedData[0].data = filteredList;
    combinedData[1].data = barberaccepteddata.slice(
      filteredList.length,
      Math.max(barberaccepteddata.length, filteredList.length + 5)
    );
    return (
      <FlatList
        data={combinedData}
        style={{ marginBottom: 150 }}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#F8852D"
          />
        }
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
            <FlatList data={item.data} renderItem={Item3} />
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
