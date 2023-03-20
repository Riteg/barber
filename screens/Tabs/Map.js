import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ViewComponent,
} from "react-native";
import React, { useState, useMemo } from "react";
import barbers from "./Datas/barbers";
import MyCarousel from "./Datas/MyCarousel";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Map({ navigation }) {
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
          <MyCarousel />
          <TouchableOpacity
            onPress={() => navigation.navigate("ChooseService")}
            style={{ marginBottom: 50, backgroundColor: "red" }}
          >
            <Text style={styles.buttonOutlineText2}>Next</Text>
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
    backgroundColor: "#181818",
  },
  list: {
    height: "100%",
    width: width,
    color: "white",
  },
  tinyLogo: {
    height: 50,
    width: 50,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 25,
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
    justifyContent: "flex-start",
    padding: 8,
    backgroundColor: "#181818",
    color: "white",
  },
});
