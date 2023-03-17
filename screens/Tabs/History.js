import {
  View,
  SafeAreaView,
  RefreshControl,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,TouchableHighlight,
  ScrollView,
  ViewComponent,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { firebase } from "../../config";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Tab, Text, TabView, ListItem, Avatar, Image } from "@rneui/themed";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function History({ navigation }) {
  const handleDelete = async (docId) => {
    try {
      const docRef = firebase.firestore().collection("users").doc(userId).collection("Barber_Appointments").doc(docId);
      await docRef.delete();
      alert("Appointment Declined Successfully!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  }


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
  const [acceptedbarber, setAcceptedBarber] = useState("");
  const [acceptedcurrentdate, setAcceptedCurrentDate] = useState("");
  const [acceptedcustomerimage, setAcceptedCustomerImage] = useState("");
  const [acceptedcustomername, setAcceptedCustomerName] = useState("");
  const [accepteddocid, setAcceptedDocId] = useState("");
  const [acceptedhour, setAcceptedHour] = useState("");
  const [acceptedservice, setAcceptedService] = useState("");
  const [accepteddoc, setberberAcceptedDoc] = useState("");
  const [acceptedtime, setAcceptedTime] = useState("");
  const [accepteduserid, setAcceptedUserId] = useState("");
  const [barberaccepteddata, setBarberAcceptedData] = useState("");
  
  const handleOkey = async (docId) => {
  const userId2 = firebase.auth().currentUser.uid;
  const barberAccepted = firebase.firestore().collection('users').doc(userId2).collection("Barber_Accepted_Appointments");
    try {
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
        // other appointment details
      });
  
      console.log('Appointment added with ID:', docRef.id);
      setberberAcceptedDoc(docRef.id);
  
      const barberAppointmentsCollection2 = firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('Barber_Accepted_Appointments')
        .doc(docRef.id);
  
      await barberAppointmentsCollection2.update({ docId: docRef.id });
  
      alert("Appointment Successfully Accepted");
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
    try {
      const docRef = firebase.firestore().collection("users").doc(userId).collection("Barber_Appointments").doc(docId);
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
        setBarberAppointment(userData)
      });
  
    return () => {
      unsubscribe();
    };
  }, [userId]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("Barber_Accepted_Appointments")
      .orderBy("time", "asc")
      .onSnapshot((querySnapshot) => {
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setBarberAcceptedData(userData)
        console.log(barberaccepteddata)
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
        </View>
        <View style={{flexDirection:"row",width:width}}>
        <TouchableOpacity style={{width:width/2-10,marginLeft:8}} onPress={() => handleOkey(props.item.docId)}>
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
        <TouchableHighlight style={{width:width/2-10}} onPress={() => handleDelete(props.item.docId)}>
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
          height: 130,
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
        </View>
      </View>
    );
  }
  let barberVal = null;
  const [barberValue, setBarberValue] = useState(null);

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid; 
    const userRef = firebase.firestore().collection('users').doc(userId);
    userRef.get().then((doc) => {
      const userData = doc.data();
      const barber = userData.barber;
      setBarberValue(barber);
      barberVal = barberValue; // set the variable value inside the useEffect
    });
  }, []);

  const [index, setIndex] = React.useState(0);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#141313" }}>

{barberValue === 'yes' ? (  
<>
<Tab
value={index}
containerStyle={{ height: 50, backgroundColor: "#161616",borderTopColor:"#999",borderTopWidth:0.2 }}
onChange={(e) => setIndex(e)}
indicatorStyle={{
backgroundColor: "white",
height: 2,
}}
variant="primary"
>
<Tab.Item title="Appointments" titleStyle={{ fontSize: 12 }} />
<Tab.Item title="Customers" titleStyle={{ fontSize: 12 }} />
<Tab.Item title="Requests" titleStyle={{ fontSize: 12 }} />
</Tab>
<TabView
value={index}
onChange={setIndex}
animationType="timing"
disableSwipe={true}
>
<TabView.Item style={{ backgroundColor: "#181818", width: "100%" }}>
<View
        style={{ width: width, height: height, backgroundColor: "#141414" }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#181818",
            height: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
</TabView.Item>
<TabView.Item style={{ backgroundColor: "#181818", width: "100%" }}>
<View
        style={{ width: width, height: height, backgroundColor: "#141414" }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#181818",
            height: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
              Soonest Appointments
            </Text>
            <FlatList
              data={barberaccepteddata}
              renderItem={Item3}
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
              Subsequent Appointments
            </Text>
            <FlatList
              data={barberaccepteddata.slice(3)}
              renderItem={Item3}
              style={{ marginBottom: 50 }}
            />
          </ScrollView>
        </View>
      </View>
</TabView.Item>
<TabView.Item style={{ backgroundColor: "#181818", width: "100%" }}>
<View
        style={{ width: width, height: height, backgroundColor: "#141414" }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#181818",
            height: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
              Waiting Appointments
            </Text>
            <FlatList
              data={barberappointment}
              renderItem={Item2}
              style={{ marginBottom: 0 }}
            />
          </ScrollView>
        </View>
      </View>
</TabView.Item>
</TabView>
</>
      ) : (
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
      )}
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
