import React, {useRef, useState, useEffect,useMemo} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel-deprecated-prop-types';
import {View,Text,Dimensions,StyleSheet,TouchableOpacity,Platform,SafeAreaView,Image} from 'react-native';
import { Animated } from 'react-native';
import { Pressable } from 'react-native';
import { CheckBox } from '@rneui/themed/dist/CheckBox';
import { FlatList } from 'react-native';
import DatePicker from "react-native-styled-datepicker";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import {LocaleConfig} from 'react-native-calendars';
import { AntDesign,MaterialIcons,Ionicons } from '@expo/vector-icons';

import { firebase } from "../../config";
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const {width: screenWidth} = Dimensions.get('window');


export default function Finish({route, navigation }) {











  
  const [check3, setCheck3] = useState(false);
  const userId = firebase.auth().currentUser.uid;
  const { docum } = route.params;
  const { barberId } = route.params;
  const { barber } = route.params;
  const { service } = route.params;
  const { barberPhoto } = route.params;
  const { time } = route.params;
  const { hour } = route.params;
  const { currentDate } = route.params;
  console.log(barberId)
  const docId = docum;



  const barberAppointmentsCollection = firebase.firestore().collection('users').doc(barberId).collection("Barber_Appointments");

  barberAppointmentsCollection.add({
    userId: userId,
    time: time ,
    hour: hour,
    service: service,
    currentDate:currentDate,
    barber:barber,
    // other appointment details
  })
  .then((docRef) => {
    console.log('Appointment added with ID:', docRef.id);
  })
  .catch((error) => {
    console.error('Error adding appointment:', error);
  });
  const barberAppointmentsQuery = barberAppointmentsCollection.where('barberId', '==', "barberId");
  
  barberAppointmentsQuery.onSnapshot((querySnapshot) => {
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push(doc.data());
    });
    console.log('Appointments for barber:', appointments);
  });





  return (
    <>
    <SafeAreaView style={{flex:1,backgroundColor:'#181818'}}>
      <View style={{width: width, height: height,backgroundColor: "#141414"}}>
        <View style={{flexDirection:'row',backgroundColor:"#181818",height:50,alignItems:'center',justifyContent:'space-between'}}>
          <Text style={{color:'white',fontWeight:'700',textAlign:'center',width:width,fontSize:17,alignContent:"center"}}>Appointment Successfully</Text>
        </View>
        <View
        style={{
          flexDirection: "column",
          marginTop: 10,
          height: 380,
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
                  {hour}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{justifyContent:"center",alignContent:"center",alignSelf:"flex-start"}}>
        <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: 22,
                marginTop:20,
                marginLeft:20
              }}
            >
              Barber Name
            </Text>
          <View style={{ flexDirection: "row",alignContent:"center",alignItems:"center" ,marginTop:20}}>
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
                justifyContent:"center",
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
                marginTop:20,
                marginLeft:20
              }}
            >
              Service Name
            </Text>
          <View style={{ flexDirection: "row" ,alignContent:"center",alignItems:"center",marginTop:20}}>
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
              {service}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={{marginTop:0}} onPress={() => navigation.navigate("ChooseService")}>
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
              Back
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      </View>

    </SafeAreaView>
    </>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    marginBottom:0,
  },
  list: {
    height: '100%',
    width: width,
    color:"white",

  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  serviceimg: {
    height: 170,
    width: 125,
    alignItems:"flex-start",
    alignContent:"flex-start",
    justifyContent:"flex-start",
    alignSelf:"flex-start",
  },
  tinyLogo: {
    height: 75,
    width: 100,
    alignItems:"center",
    alignContent:"center",
    justifyContent:"center",
    alignSelf:"center",
  },
  button: {
    width: width/3,
    backgroundColor:"#181818",
  },
  barberbutton2: {
    textAlign:"center",
    marginVertical:10,
    color:"#fff",
  },
  filterBar: {
    flexDirection: 'row',
    // flex: 0.2,
    height: 100,
    color:"white",

  },
  item: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    alignContent:"center",
    backgroundColor: '#181818',
    color:"white",

  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: '#181818',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title:{
    color:"#fff",
    position:"absolute",
    bottom:50,
    left:25,
    textAlign:"left",
    alignContent:"center",
    alignSelf:"center",
    fontSize:22,
  },
  price:{
    color:"#fff",
    position:"absolute",
    bottom:25,
    left:25,
    textAlign:"left",
    alignContent:"flex-start",
    alignSelf:"flex-start",
    fontSize:22,
  }
});  
