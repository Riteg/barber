import React, { useRef, useState, useEffect, useMemo } from "react";
import Carousel, {
  ParallaxImage,
} from "react-native-snap-carousel-deprecated-prop-types";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import { Animated } from "react-native";
import { Pressable } from "react-native";
import { CheckBox } from "@rneui/themed/dist/CheckBox";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../config";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const { width: screenWidth } = Dimensions.get("window");
export default function ChooseService({ props, navigation }) {
  const [status, setStatus] = useState("");
  const [barbers, setBarbers] = useState("");

  useEffect(() => {
    const userRef = firebase.firestore().collection("users").doc(userId);
    userRef
      .update({
        userId,
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }, [userId]);
  const fullList = barbers;
  const userId = firebase.auth().currentUser.uid;
  const collectionRef = firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .collection("appointment");
  const barberRef = firebase.firestore().collection("barbers");
  const [docum, setDocum] = useState("");
  collectionRef
    .doc()
    .get()
    .then((doc1) => {
      const index = 0;
      barberRef
        .where("index", "==", index)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc2) => {
            // Here, you can access the data from both documents.
            console.log(doc1.data(), doc2.data());
          });
        });
    });

  const handleSubmit = async () => {
    try {
      const newDocRef = collectionRef.doc();

      await newDocRef.set({
        service,
      });

      console.log("Data saved successfully with ID:", newDocRef.id);
      const docum = newDocRef.id;
      navigation.navigate("ChooseBarber", { docum, service });
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };
  const [service, setService] = useState("");
  const [ilac, setIlac] = useState("");
  const [tanim, setTanim] = useState("");
  const [tarih, setTarih] = useState("");

  const filteredList = useMemo(() => {
    if (!Array.isArray(fullList)) return [];
    if (status === "NONE") return fullList;
    return fullList.filter((item) => status === item.Status);
  }, [status, fullList]);
  const onClick = (status) => () => {
    setStatus(status);
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("services")
      .onSnapshot((querySnapshot) => {
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setBarbers(userData);
      });

    return () => {
      unsubscribe();
    };
  }, [userId]);
  const carouselRef = useRef();
  const [translateValue] = useState(new Animated.Value(0));
  const [selected, setSelected] = useState(0);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const [check3, setCheck3] = useState(false);
  function Item(props) {
    return (
      <View style={{ flexDirection: "row", padding: 7, width: screenWidth }}>
        <Image style={styles.serviceimg} source={{ uri: props.item.imgUrl }} />
        <View style={styles.item}>
          <Text style={{ color: "#fff" }}>{props.item.name}</Text>
          <Text style={{ color: "#fff" }}>{props.item.location} mins</Text>
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          onPressIn={(service) => setService(props.item.name)}
          style={{
            backgroundColor: "#181818",
            marginLeft: 10,
            width: 80,
            height: 80,
            justifyContent: "center",
            alignSelf: "flex-end",
            marginRight: 30,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fefefe" }}>Select</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    console.log("yenilendi");
    setRefreshing(true);

    // Do something here to fetch and update the data

    setRefreshing(false);
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
              Select Service
            </Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.barberbutton2}>Choose Category</Text>
            <View style={styles.filterBar}>
              <TouchableOpacity
                style={styles.button}
                title="Man"
                onPress={onClick(1)}
              >
                <Image
                  style={styles.tinyLogo}
                  source={require("../../assets/man.jpg")}
                />
                <Text style={styles.barberbutton2}>Man</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                title="Child"
                onPress={onClick(2)}
              >
                <Image
                  style={styles.tinyLogo}
                  source={require("../../assets/kid.jpg")}
                />
                <Text style={styles.barberbutton2}>Kids</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.barberbutton2}>Choose Service</Text>
            <FlatList ref={carouselRef} data={filteredList} renderItem={Item} />
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
    height: 75,
    width: 100,
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
    width: width / 2,
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
