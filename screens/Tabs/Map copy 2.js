import { View, Text, SafeAreaView, Dimensions,StyleSheet,Button, TouchableOpacity, ScrollView,Image,TextInput,ViewComponent, } from 'react-native'
import React from "react";
import barbers from "./Datas/barbers";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


export default function Map({ navigation }) {
  return (
    <>
    <SafeAreaView style={{flex:1,backgroundColor:'#181818'}}>
      <View style={{width: width, height: height,backgroundColor: "#141414"}}>
        <View style={{flexDirection:'row',backgroundColor:"#181818",height:50,alignItems:'center',justifyContent:'space-between'}}>
          <Text style={{color:'white',fontWeight:'700',textAlign:'center',width:width,fontSize:17,alignContent:"center"}}>Select Barber</Text>
        </View>
        <ScrollView>
          <View style={styles.container}>
              {barbers.map((barber) => {
                return (
                  <View style={styles.barberdv}>
                    <View style={styles.barberdiv}>
                      <Image style={styles.barberimg}source={barber.img}></Image>
                      <View style={styles.barberdiv2}>
                        <View style={styles.barberdiv3}>
                          <Text style={styles.barberfullname}>{barber.name}</Text>
                          <Text style={styles.barberlocation}>{barber.location}</Text>
                        </View>

                      </View>
                    </View>
                    <View>
                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.barberbutton2}>Select Barber</Text>
                    </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
        </ScrollView>
      </View>
    </SafeAreaView>
    </>
    
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10,
    padding: 10,
  },
  barbername: {
    fontSize: 12,
    marginTop: 5,
    color:"#fff",
  },
  barberfullname: {
    fontSize: 14,
    marginTop: 5,
    color:"#fff",
  },
  barberlocation: {
    fontSize: 14,
    marginTop: 5,
    color:"#fff",
  },
  barbername2: {
    fontSize: 14,
    marginTop: 0,
    marginLeft:20,
    color:"#fff",
  },
  barbername3: {
    fontSize: 12,
    color:"#fff",
  },
  barberimg:{
    width:75,
    height:75,
    margin:20,
  },
  barberdiv:{
    marginBottom:20,
    height:100,
    flexDirection:"row",  
    backgroundColor:"#141414"
  },
  barberdv:{
    marginBottom:20,
    height:150,
    flexDirection:"column",
    backgroundColor:"#141414",
    shadowColor: '#fff',
    shadowOffset: {
      width: 22,
      height: 22,
    },
    shadowOpacity: 0.5,
    elevation: 4,
  },
  barberdiv2:{
    marginTop:20,
    flexDirection:"row"
  },
  barberdiv3:{
    marginTop:20,
    flexDirection:"column"
  },
  barberdiv5:{
    marginTop:20,
    flexDirection:"row",
    marginLeft:5,
    height:25,
  },
  barberdiv4:{
    flexDirection:"row",
    borderWidth:1,
    textAlign:'center',
  },
  barberbutton:{
    color:"#fff",
    justifyContent:"center",
    alignContent:"center",
    alignSelf:"center",
    textAlign:"center",
    marginTop:2,
  },
  barberbutton2:{
    color:"#181818",
    justifyContent:"center",
    alignContent:"center",
    alignSelf:"center",
    textAlign:"center",
    marginTop:2,
  },
  button: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    width: 130,
    backgroundColor: "#fff",
    position:"absolute",
    shadowColor: '#181818',
    shadowOffset: {
      width: 22,
      height: 22,
    },
    shadowOpacity: 0.5,
    elevation: 4,
    right:10,
    top:-20,
  },
  button2: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    backgroundColor: "#121212",
    marginRight:3,
    shadowColor: '#fff',
    shadowOffset: {
      width: 22,
      height: 22,
    },
    shadowOpacity: 0.5,
    elevation: 4,
  },
});
