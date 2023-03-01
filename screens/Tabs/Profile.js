import { View, SafeAreaView, Dimensions, Image,ImageBackground,Button, TouchableOpacity,StyleSheet, TextInput, ScrollView, ViewComponent } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import React,{useEffect,useState} from 'react'
import { auth } from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tab, Text, TabView ,ListItem,Avatar } from '@rneui/themed';
import * as firebase from 'firebase';
import { signOut } from 'firebase/auth'



const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export default function Profile({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const userId = firebase.auth().currentUser.uid; 
  const userRef = firebase.firestore().collection('users').doc(userId);
   userRef.get().then((doc) => {
      const userData = doc.data();
      const fullname = userData.fullname;
      setFullname(fullname)
      const phone = userData.phone;
      setPhone(phone)
      const password = userData.password;
      setPassword(password)
      const email = userData.email;
      setEmail(email)
  });

  const [fullname, setFullname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignOut=()=>{
    firebase.auth().signOut();
};
  return (
    <>
    <View style={{flexDirection:'row',backgroundColor:"#181818",height:50,alignItems:'center',justifyContent:'space-between'}}>
      <Text style={{color:'white',fontWeight:'700',alignItems:'center',fontSize:17,alignContent:"center",textAlign:'center',width:width,fontSize:17}}>Profile</Text>
    </View>
      <Tab
      value={index}
      containerStyle={{height:50,backgroundColor:"#181818"}}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: 'white',
        height: 2,
      }}
      variant="primary"
    >
      <Tab.Item
        title="Profile"
        titleStyle={{ fontSize: 12 }}
      />
      <Tab.Item
        title="Notifications"
        titleStyle={{ fontSize: 12 }}
      />
      <Tab.Item
        title="Account"
        titleStyle={{ fontSize: 12 }}
      />
    </Tab>
    <TabView value={index} onChange={setIndex} animationType="spring">
      <TabView.Item style={{ backgroundColor: '#181818', width: '100%' }}>
      <View style={{width: width,height: height,backgroundColor: "#181818",}}>
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/videos/1.gif')} style={{borderWidth:1,borderColor:"#000"}}>
          <View style={styles.header}>
          </View>
        </ImageBackground>
        <Image style={styles.avatar}source={require("../../assets/user.png")}/>
        <TouchableOpacity
                onPress={handleSignOut}
                style={styles.edit}
              >
                <Text style={styles.editText}>Edit Profile</Text>
              </TouchableOpacity>
        <ScrollView>
        <ListItem.Accordion
          content={
            <ListItem.Content>
              <ListItem.Title style={{color:"#fff"}}>Personal Information
              </ListItem.Title>
            </ListItem.Content>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
          containerStyle={{backgroundColor:"#181818"}}
        >
          <View style={{height:300}}>
            <ScrollView>
            <ListItem           containerStyle={{backgroundColor:"#181818"}}>
            <ListItem.Content>
              <ListItem.Title style={{color:"#fff"}}>Full Name</ListItem.Title>
              <ListItem.Subtitle style={{color:"#fff"}}>{fullname}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <ListItem          containerStyle={{backgroundColor:"#181818"}}>
            <ListItem.Content>
              <ListItem.Title style={{color:"#fff"}}>Email Adress</ListItem.Title>
              <ListItem.Subtitle style={{color:"#fff"}}>{email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <ListItem           containerStyle={{backgroundColor:"#181818"}}>
            <ListItem.Content>
              <ListItem.Title style={{color:"#fff"}}>Phone Number</ListItem.Title>
              <ListItem.Subtitle style={{color:"#fff"}}>{phone}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <ListItem           containerStyle={{backgroundColor:"#181818"}}>
            <ListItem.Content>
              <ListItem.Title style={{color:"#fff"}}>Password</ListItem.Title>
              <ListItem.Subtitle style={{color:"#fff"}}>{password}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem >
            </ScrollView>
          </View>

        </ListItem.Accordion>
        <ListItem.Accordion
          content={
            <ListItem.Content>
              <ListItem.Title style={{color:"#fff"}}>General Informations</ListItem.Title>
            </ListItem.Content>
          }
          isExpanded={expanded2}
          onPress={() => {
            setExpanded2(!expanded2);
          }}
          containerStyle={{backgroundColor:"#181818"}}

        >
          <View style={{height:300}}>
          <ScrollView>
            <ListItem           containerStyle={{backgroundColor:"#181818"}}>
            <ListItem.Content>
              <ListItem.Title style={{color:"#fff"}}>Full Name</ListItem.Title>
              <ListItem.Subtitle style={{color:"#fff"}}>Barber John</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <ListItem          containerStyle={{backgroundColor:"#181818"}}>
            <ListItem.Content>
              <ListItem.Title style={{color:"#fff"}}>Email Adress</ListItem.Title>
              <ListItem.Subtitle style={{color:"#fff"}}>johnbarber@gmail.com</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <ListItem           containerStyle={{backgroundColor:"#181818"}}>
            <ListItem.Content>
              <ListItem.Title style={{color:"#fff"}}>Phone Number</ListItem.Title>
              <ListItem.Subtitle style={{color:"#fff"}}>+999999999</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <ListItem           containerStyle={{backgroundColor:"#181818"}}>
            <ListItem.Content>
              <ListItem.Title style={{color:"#fff"}}>Password</ListItem.Title>
              <ListItem.Subtitle style={{color:"#fff"}}>*******</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem >
            </ScrollView>
          </View>
        </ListItem.Accordion>
        </ScrollView>
        <TouchableOpacity
      onPress={handleSignOut}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>
      </View>
    </View>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: '#181818', width: '100%' }}>
        <Text h1>2.sayfa</Text>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: '#181818', width: '100%' }}>
        <Text h1>3.sayfa</Text>
      </TabView.Item>
    </TabView>
    </>

)
}


const styles = StyleSheet.create({
  header: {
    height: 150,
    width:width,
  },
  edit:{
    position:"absolute",
    right:3,
    backgroundColor:"#00000064",
    height:25,
  },
  editText:{
    color:"#fff",
    justifyContent:"center",
    alignContent:"center",
    textAlign:"center",
    alignSelf:"center",
    marginTop:2
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    height:height,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 50,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    marginBottom: 20,
    width: 150,
    borderRadius: 30,
    backgroundColor: "#0d9",
  },
  text:{
    color:"white"
  },
})
