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
  TextInput,
} from "react-native";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";

import { firebase } from "../../config";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const { width: screenWidth } = Dimensions.get("window");

export default function Finish({ route, navigation }) {
  const [check3, setCheck3] = useState(false);
  const userId = firebase.auth().currentUser.uid;
  const { docum } = route.params;
  const { barberId } = route.params;
  const { barber } = route.params;
  const { formatted, totalLocation,expoPushToken,barberExpo } = route.params;
  const { barberPhoto } = route.params;
  const { time } = route.params;
  const { hour } = route.params;
  const { currentDate } = route.params;
  const docId = docum;
  const userRef = firebase.firestore().collection("users").doc(userId);
  userRef.get().then((doc) => {
    const userData = doc.data();
    const fullname = userData.fullname;
    setFullname(fullname);
    const image = userData.image;
    setCustomerImage(image);
  });
  const appointmentRef = firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("appointment")
    .doc(docum);
  appointmentRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        const servisler = userData.formatted;
        setServisler(servisler);
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.error("Error getting data: ", error);
    });

  const [fullname, setFullname] = React.useState("");
  const [customerimage, setCustomerImage] = React.useState("");
  const [servisler, setServisler] = React.useState("");
  const barberAppointmentsCollection = firebase
    .firestore()
    .collection("users")
    .doc(barberId)
    .collection("Barber_Appointments");
  const [berberdoc, setberberDoc] = React.useState("");
  const handleOkey = async () => {
    alert("Appointment Succesfully");
    barberAppointmentsCollection
      .add({
        userId: userId,
        totalLocation: totalLocation,
        time: time,
        hour: hour,
        service: servisler,
        currentDate: currentDate,
        barber: barber,
        customername: fullname,
        customerimage: customerimage,
        docId: "",
        barberPhoto: barberPhoto,
        barberExpo:barberExpo,
        expoPushToken:expoPushToken,
        // other appointment details
      })
      .then((docRef) => {
        console.log("Appointment added with ID:", docRef.id);
        setberberDoc(docRef.id);

        const barberAppointmentsCollection2 = firebase
          .firestore()
          .collection("users")
          .doc(barberId)
          .collection("Barber_Appointments")
          .doc(docRef.id);

        barberAppointmentsCollection2.update({ docId: docRef.id });

        navigation.navigate("ChooseService");
      })
      .catch((error) => {
        console.error("Error adding appointment:", error);
      });
  };

  const sendNotification2 = async (barberExpo) => {

    fetch('https://exp.host/--/api/v2/push/send', {
method: 'POST',
headers: {
  Accept: 'application/json',
  'Accept-Encoding': 'gzip, deflate',
  'Content-Type': 'application/json',
},
body: JSON.stringify({
  to: barberExpo,
  data: { extraData: 'Some data' },
  title: `User ${fullname} Sent Request.`,
  body: `For ${time} ${hour}`,
}),
})
    }
  const barberAppointmentsQuery = barberAppointmentsCollection.where(
    "barberId",
    "==",
    "barberId"
  );

  barberAppointmentsQuery.onSnapshot((querySnapshot) => {
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push(doc.data());
    });
    console.log("Appointments for barber:", appointments);
  });

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
              Appointment Confirmation
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginTop: 10,
              height: height - 150,
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
                  <Text
                    style={{ color: "white", fontWeight: "700", fontSize: 18 }}
                  >
                    {time}
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
                    style={{
                      width: "40%",
                      flexDirection: "row",
                      paddingTop: 0,
                    }}
                  >
                    <AntDesign
                      name="clockcircleo"
                      style={{ marginLeft: 25 }}
                      size={24}
                      color="white"
                    />
                  </View>
                  <View
                    style={{
                      width: "60%",
                      flexDirection: "row",
                      paddingTop: 0,
                    }}
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
                      {hour}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "flex-start",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 22,
                  marginTop: 20,
                  marginLeft: 20,
                }}
              >
                Barber Name
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Image
                  source={{ uri: barberPhoto }}
                  style={{
                    marginRight: 15,
                    marginLeft: 15,
                    width: 60,
                    height: 60,
                    borderColor: "#fff",
                    borderWidth: 1,
                    resizeMode: "contain",
                    alignSelf: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 22,
                  }}
                >
                  {barber}
                </Text>
              </View>
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 22,
                  marginTop: 20,
                  marginLeft: 20,
                }}
              >
                Service Name
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Ionicons
                  name="cut"
                  style={{ marginRight: 15, marginLeft: 15 }}
                  size={54}
                  color="white"
                />
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 22,
                  }}
                >
                  {servisler}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Add Your Extra Suggestions"
                  placeholderTextColor={"#909090"}
                />
              </View>
            </View>
            <TouchableOpacity style={{ marginTop: 0 }} onPress={handleOkey}
             onPressIn={() => sendNotification2(barberExpo)}
            
            >
              <View
                style={{
                  alignItems: "center",
                  height: 40,
                  width: "96%",
                  marginLeft: "2%",
                  borderRadius: 15,
                  backgroundColor: "#5a5a5a",
                  borderColor: "#aaa",
                  borderWidth: 2,
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
                  Confirm Appointment
                </Text>
              </View>
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
    padding: 8,
    marginBottom: 0,
  },
  list: {
    height: "100%",
    width: width,
    color: "white",
  },
  input: {
    backgroundColor: "#404040",
    paddingHorizontal: 15,
    color: "#fff",
    width: width - 20,
    marginLeft: "2%",
    paddingVertical: width < 375 ? 5 : 10,
    borderRadius: width < 375 ? 5 : 10,
    marginTop: width < 375 ? 2 : 5,
    height: width < 375 ? 100 : 120,
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
