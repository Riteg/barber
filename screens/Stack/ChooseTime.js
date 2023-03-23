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
  Button,
} from "react-native";

import { FlatList } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { LocaleConfig } from "react-native-calendars";
import { firebase } from "../../config";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const { width: screenWidth } = Dimensions.get("window");

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
  today: "Today",
};
LocaleConfig.defaultLocale = "en";
export default function ChooseTime({ route, navigation }) {
  const [data, setData] = useState("");
  const [sundayData, setSundayData] = useState("");

  
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [hour, setHour] = useState("");

  const handlePress = (index) => {
    setSelectedButtonIndex(index);
    setHour(index);
  };

  const buttonStyle = (index, selectedButtonIndex) => {
    const selectedColor = "#d90";
    const unselectedColor = "#181818";

    if (index === selectedButtonIndex) {
      return { ...styles.buttontitle, backgroundColor: selectedColor };
    } else {
      return { ...styles.buttontitle, backgroundColor: unselectedColor };
    }
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("times")
      .orderBy("id")
      .onSnapshot((querySnapshot) => {
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setData(userData)
      });

    return () => {
      unsubscribe();
    };
  }, [userId, barberId]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("sundaytimes")
      .orderBy("id")
      .onSnapshot((querySnapshot) => {
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setSundayData(userData)
        console.log("31",sundayData)
      });

    return () => {
      unsubscribe();
    };
  }, [userId, barberId]);


  const [currentDate, setCurrentDate] = useState(new Date().toUTCString());
  const currentDate2 = new Date();
  const minDate = currentDate2.toISOString().split("T")[0];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);







  const [check3, setCheck3] = useState(false);
  const userId = firebase.auth().currentUser.uid;
  const { docum } = route.params;
  const { barberId } = route.params;
  const { formatted, totalLocation } = route.params;
  const { barberPhoto,expoPushToken,barberExpo } = route.params;
  const { barber } = route.params;
  const berbersID = barberId;
  const docId = docum;
  const collectionRef = firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("appointment");
  const handleSubmit = async () => {
    try {
      const newDocRef = collectionRef.doc(docId);
      if (!time.trim()) {
        alert("Please Choose Date");
        return;
      }
      if (!hour.trim()) {
        alert("Please Choose Time");
        return;
      }
      await newDocRef.update({
        time,
        hour,
        currentDate,
      });
      console.log("Data saved successfully with ID:", newDocRef.id);
      const docum = newDocRef.id;
      navigation.navigate("Finish", {
        docum,
        barberId,
        formatted,
        barberPhoto,
        barberExpo,
        time,
        hour,
        expoPushToken,
        currentDate,
        barber,
        totalLocation,
      });
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };
  const [time, setTime] = useState("");
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
              Select Time
            </Text>
          </View>
          <View style={styles.container2}>
            <Calendar
              markedDates={{
                [time]: {
                  selected: true,
                  marked: true,
                  selectedColor: "#d90",
                  selectedTextColor: "#fff",
                  dotColor: "#fff",
                },
              }}
              theme={{
                calendarBackground: "#181818",
                textSectionTitleColor: "#b6c1cd",
                textSectionTitleDisabledColor: "#d9e1e8",
                selectedDayBackgroundColor: "blue",
                selectedDayTextColor: "red",
                todayTextColor: "#00adf5",
                dayTextColor: "#fff",
                textDisabledColor: "#2d4150",
                dotColor: "#00adf5",
                selectedDotColor: "#ffffff",
                arrowColor: "orange",
                disabledArrowColor: "#d9e1e8",
                monthTextColor: "#fff",
                indicatorColor: "#fff",
                textDayFontFamily: "monospace",
                textMonthFontFamily: "monospace",
                textDayHeaderFontFamily: "monospace",
                textDayFontWeight: "300",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "300",
                textDayFontSize: 12,
                textMonthFontSize: 12,
                textDayHeaderFontSize: 12,
              }}
              minDate={minDate}
              onDayPress={(day) => {
                const dateString = day.dateString.toString();
                setTime(dateString);
              }}
              onDayLongPress={(day) => {
                console.log("selected day", day);
              }}
              onMonthChange={(month) => {
                console.log("month changed", month);
              }}
            ></Calendar>
          </View>
          <Text style={styles.barberbutton2}>Choose Time</Text>
          <View
            style={{
              flexDirection: "column",
              marginLeft: 10,
              marginBottom: 20,
            }}
          >
            <FlatList
              data={new Date().getDay() === 0 ? sundayData : data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row" }}>
                  {item.times.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={buttonStyle(time, selectedButtonIndex)}
                      onPress={() => handlePress(time)}
                    >
                      <Text style={styles.text}>{time}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
          </View>
          <TouchableOpacity style={styles.button2} onPress={handleSubmit}>
            <Text style={styles.barberbutton2}>Next</Text>
          </TouchableOpacity>
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
  container2: {
    height: "42%",
  },
  selected: {
    backgroundColor: "red",
  },
  button2: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: width,
    height: 45,
    position:"absolute",
    bottom:50,
    backgroundColor: "#d90",
  },
  buttontitle: {
    width: width / 4 - 15,
    justifyContent: "center",
    margin: 5,
    height: 30,
    backgroundColor: "#181818",
    borderRadius: 30,
    borderBottomWidth: 1,
    borderColor: "#141414",
  },
  text: {
    color: "#fff",
    textAlign: "center",
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
  },
  barberbutton2: {
    textAlign: "center",
    marginBottom:5,
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
