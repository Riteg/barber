import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Redirect from "./Redirect";
import { useState } from "react";

export default function Intro({ navigation }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
  };
  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 150,
        }}
      >
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };

  return (
    <>
      {showRealApp ? (
        <Redirect></Redirect>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          bottomButton
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  titleStyle: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  paragraphStyle: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
  introImageStyle: {
    marginTop: "30%",
    width: "90%",
    height: "50%",
    resizeMode: "contain",
  },
  introTextStyle: {
    fontSize: 16,
    color: "white",
    justifyContent: "flex-start",
    textAlign: "left",
    alignItems: "center",
    alignContent: "center",
    paddingVertical: 20,
    marginTop: 120,
    paddingLeft: 10,
    paddingRight: 10,
  },
  introTitleStyle: {
    fontSize: 22,
    marginTop: 150,
    color: "white",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  },
});

const slides = [
  {
    key: "s1",
    text: "Through this application, you can make an appointment at any time, without calling the barber, and perform the operations.",
    title: "Welcome to Barber Appointment App",
    image: require("../../assets/giris1.png"),
    backgroundColor: "#181818",
  },
  {
    key: "s2",
    title: "Welcome to Barber Appointment App",
    text: "You can easily and quickly access the transactions you want to do.",
    image: require("../../assets/giris2.png"),
    backgroundColor: "#181818",
  },
  {
    key: "s3",
    title: "Welcome to Barber Appointment App",
    text: "Don\'t forget to turn on notifications to be notified instantly of developments.",
    image: require("../../assets/giris3.png"),
    backgroundColor: "#181818",
  },
];
