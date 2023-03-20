import {
  View,
  SafeAreaView,
  RefreshControl,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  ScrollView,
  ViewComponent,
} from "react-native";
import React from "react";
import { useEffect, useState, useMemo } from "react";
import { firebase } from "../../config";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tab, Text, TabView, ListItem, Avatar, Image } from "@rneui/themed";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Appointments2({ navigation }) {
  const handleDelete = async (docId) => {
    try {
      const docRef = firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("Barber_Appointments")
        .doc(docId);
      await docRef.delete();
      alert("Appointment Declined Successfully!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

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
  const [accepteduserid, setAcceptedUserId] = useState("");
  const [barberaccepteddata, setBarberAcceptedData] = useState("");
  const [barberPhoto, setBarberPhoto] = useState("");
  const [totalLocation, setTotalLocation] = useState("");
  const [uidd, setUidd] = useState("");
  const handleOkey = async (docId) => {
    const userId2 = firebase.auth().currentUser.uid;
    try {
      const barberAccepted = firebase
        .firestore()
        .collection("users")
        .doc(userId2)
        .collection("Barber_Accepted_Appointments");
      const docRef = await barberAccepted.add({
        userId: accepteduserid,
        time: acceptedtime,
        hour: acceptedhour,
        service: acceptedservice,
        currentDate: acceptedcurrentdate,
        barber: acceptedbarber,
        customername: acceptedcustomername,
        customerimage: acceptedcustomerimage,
        olddocid: accepteddocid,
        docId: "",
        customerId: uidd,
        totalLocation: totalLocation,
        // other appointment details
      });

      console.log("Appointment added with ID:", docRef.id);
      setberberAcceptedDoc(docRef.id);
      const barberAppointmentsCollection2 = firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("Barber_Accepted_Appointments")
        .doc(docRef.id);

      await barberAppointmentsCollection2.update({ docId: docRef.id });

      alert("Appointment Successfully Accepted");
      const userAccepted = firebase
        .firestore()
        .collection("users")
        .doc(uidd)
        .collection("User_Accepted_Appointments");
      const docRef2 = await userAccepted.add({
        userId: accepteduserid,
        time: acceptedtime,
        hour: acceptedhour,
        service: acceptedservice,
        currentDate: acceptedcurrentdate,
        barber: acceptedbarber,
        customername: acceptedcustomername,
        customerimage: acceptedcustomerimage,
        barberphoto: barberPhoto,
        olddocid: accepteddocid,
        docId: "",
        customerid: uidd,
        totalLocation: totalLocation,
        // other appointment details
      });
      console.log("Appointment added with ID:", docRef2.id);
      setberberAcceptedDoc2(docRef2.id);
      const barberAppointmentsCollection3 = firebase
        .firestore()
        .collection("users")
        .doc(uidd)
        .collection("User_Accepted_Appointments")
        .doc(docRef2.id);

      await barberAppointmentsCollection3.update({ docId: docRef2.id });
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
    try {
      const docRef = firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("Barber_Appointments")
        .doc(docId);
      await docRef.delete();
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("Barber_Appointments")
      .orderBy("time", "asc")
      .onSnapshot((querySnapshot) => {
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setBarberAppointment(userData);
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
          const userId = firstUserData.userId;
          setAcceptedUserId(userId || "");
          const totalLocation = firstUserData.totalLocation;
          setTotalLocation(totalLocation || "");
          const barberPhoto = firstUserData.barberPhoto;
          setBarberPhoto(barberPhoto || "");
        }
        // use callback function to set uidd once
        userData.length > 0 && setUidd(userData[0].userId);
      });

    return () => {
      unsubscribe();
    };
  }, [userId]);
  const combinedData = [
    { title: "Last Appointment", data: [] },
    { title: "Old Appointment", data: [] },
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
          const userId = firstUserData.userId;
          setAcceptedUserId(userId || "");
        }
      });
    return () => {
      unsubscribe();
    };
  }, [userId]);

  const [userHastalik, setUserHastalik] = useState("");
  const [filtered2, setfiltered2] = useState("");
  const [barberappointment, setBarberAppointment] = useState("");
  const userId = firebase.auth().currentUser.uid;
  const hastaliklar = userHastalik;
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
          height: 200,
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
              {props.item.totalLocation} mins.
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ChooseService")}>
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
  function Item2(props) {
    return (
      <View
        style={{
          flexDirection: "column",
          marginTop: 10,
          height: 200,
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
        <View style={{ flexDirection: "row", width: width }}>
          <TouchableOpacity
            style={{ width: width / 2 - 10, marginLeft: 8 }}
            onPress={() => handleOkey(props.item.docId)}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                height: 40,
                width: "96%",
                marginLeft: "2%",
                borderRadius: 15,
                backgroundColor: "#058964",
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
                Accept
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableHighlight
            style={{ width: width / 2 - 10 }}
            onPress={() => handleDelete(props.item.docId)}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                height: 40,
                width: "96%",
                marginLeft: "2%",
                borderRadius: 15,
                backgroundColor: "#8b0000",
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
                Decline
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
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
  let barberVal = null;
  const [barberValue, setBarberValue] = useState(null);

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection("users").doc(userId);
    userRef.get().then((doc) => {
      const userData = doc.data();
      const barber = userData.barber;
      setBarberValue(barber);
      barberVal = barberValue; // set the variable value inside the useEffect
    });
  }, []);

  const [index, setIndex] = React.useState(0);
  if (hastaliklar) {
    combinedData[0].data = hastaliklar.slice(0, 2);
    combinedData[1].data = hastaliklar.slice(2,6);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#141313" }}>
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
                Appointments History
              </Text>
            </View>

            <FlatList
        data={combinedData}
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
            <FlatList
              data={item.data}
              renderItem={Item}
              style={{ marginBottom: 50 }}
            />
          </>
        )}
      />
      </SafeAreaView>
    );
  } else {
    return (
      <Text
        style={{
          position: "absolute",
          top: 100,
          left:"35%",
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
  barberbutton:{
    color:"#fff",
  },
  button:{
    backgroundColor:"#fff",
  }
  
});
