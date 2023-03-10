import { View,RefreshControl, SafeAreaView, Dimensions,ImageBackground,Button,Modal, TouchableOpacity,StyleSheet, TextInput, ScrollView, ViewComponent } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import React,{useEffect,useState} from 'react'
import { auth } from '../../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tab, Text, TabView ,ListItem,Avatar,Image } from '@rneui/themed';
import * as firebase from 'firebase';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export default function FullName({ navigation }) {
  const userId = firebase.auth().currentUser.uid; 
  const userRef = firebase.firestore().collection('users').doc(userId);
   userRef.get().then((doc) => {
      const userData = doc.data();
      const fullname = userData.fullname;
      setFullname(fullname)
  });
  const [fullname, setFullname] = React.useState('');
  const [modalVisible2, setModalVisible2] = useState(false);
  const [fullnamenew, setFullnamenew] = useState("");
  const collectionRef = firebase.firestore().collection('users').doc(userId);

  


  const handleSubmit2 = async (fullname) => {
    try {
      setFullname(fullnamenew)
      await collectionRef.update({
        fullname,
      });
      setModalVisible2(false)
    } catch (error) {
      console.error('Error updating phone number:', error);
    }
  };


  return (

        <>
        <TouchableOpacity onPress={() => setModalVisible2(true)}>
        <ListItem containerStyle={{ backgroundColor: "#181818" }}>
          <ListItem.Content>
            <ListItem.Title style={{ color: "#fff" }}>Full Name</ListItem.Title>
            <ListItem.Subtitle style={{ color: "#fff" }}>
              {fullname}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "#121212",
              padding: 20,
              width:width-60,
            }}
          >
          <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={"#909090"}
          onChangeText={(fullnamenew) => setFullnamenew(fullnamenew)}
          keyboardType={"default"}
        />
        <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={()=> handleSubmit2(fullnamenew)}          
            style={styles.button2}>
          <Text style={styles.buttonText2}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible2(false)}          
            style={styles.button3}>
          <Text style={styles.buttonText2}>Close</Text>
            </TouchableOpacity>
        </View>
          </View>
        </View>
      </Modal>
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
  },
  editText2:{
    color:"#fff",
    justifyContent:"center",
    alignContent:"center",
    textAlign:"center",
    alignSelf:"center",
    fontSize:8,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    flex:1,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  input: {
    backgroundColor: '#404040',
    color:"#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
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
    marginTop: 15,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    width: 80,
    borderRadius: 20,
    borderWidth:2,
    borderColor:"#fff",
    backgroundColor: "#d90",
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
    justifyContent:"center",
    textAlign:"center",
  },
  button2: {
    marginTop: 20,
    height: 45,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    width: "49%",
    borderRadius: 0,
    backgroundColor: "#123123",
  },
  button3: {
    marginTop: 20,
    height: 45,
    marginLeft:"2%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    width: "49%",
    borderRadius: 0,
    backgroundColor: "#800020",
  },
  buttonText2: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
    justifyContent:"center",
    textAlign:"center",
  },
  text:{
    color:"white"
  },
})
