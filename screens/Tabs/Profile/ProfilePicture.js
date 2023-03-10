import { View,RefreshControl, SafeAreaView, Dimensions,ImageBackground,Button,Modal, TouchableOpacity,StyleSheet, TextInput, ScrollView, ViewComponent } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import React,{useEffect,useState} from 'react'
import { auth } from '../../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tab, Text, TabView ,ListItem,Avatar,Image } from '@rneui/themed';
import * as firebase from 'firebase';
import { MaterialIcons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth'
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export default function ProfilePicture({ navigation }) {
  const [uploading, setUploading] = useState("");
  
  const userId = firebase.auth().currentUser.uid; 
  const userRef = firebase.firestore().collection('users').doc(userId);
   userRef.get().then((doc) => {
      const userData = doc.data();
      const image = userData.image;
      setImage(image)

  });
  const [image, setImage] = useState(null);
  useEffect(() => {
  }, [image]);
  const pickImage = async (image) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setUploading(true);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const filename = result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf("/") + 1
      );
  
      var ref = firebase.storage().ref().child(filename).put(blob);
      try {
        await ref;
      } catch (e) {}
  
      setUploading(false);
      const downloadUrl = await firebase
        .storage()
        .ref()
        .child(filename)
        .getDownloadURL();
  
      const userId = firebase.auth().currentUser.uid;
      const docRef = firebase.firestore().collection("users").doc(userId);
  
      docRef
        .update({
          image: downloadUrl, // update image with the download URL
        })
        .then(() => {
          console.log("Image URL updated successfully",image);
          setImage(downloadUrl); // set the image state after updating the database
        })
        .catch((error) => {
          console.error("Error updating image URL: ", error);
        });
    }
  }; 
  const handleSignOut=()=>{
    firebase.auth().signOut();

};

  return (
    <View style={{alignItems:"center",alignContent:"center",alignSelf:"center",height:180}}>
    <ImageBackground source={require('../../../assets/videos/1.gif')} style={{borderWidth:1,borderColor:"#000",height:200,width:width,position:"absolute"}}>
      <View style={styles.header}>
      </View>
    </ImageBackground>
    <TouchableOpacity onPress={pickImage}>

    {image ? (
      <View style={{width:130,height:130,position:"relative",top:0,zIndex:1}}>
                  <Image
        source={{ uri: image }}
        style={{marginTop:15, borderRadius: 5,width:130,height:130,backgroundSize:"cover" ,borderRadius:63,borderWidth: 2,borderColor: "white"}}
        imageStyle={{ borderRadius: 5,width:150,height:150,backgroundSize:"cover" }}
      >
        <View style={{justifyContent:"center",alignItems:"center",alignContent:"center",justifyContent:"center",marginTop:"60%",marginLeft:"60%",backgroundColor:"#505050",borderColor:"#ffe",borderWidth:1,borderRadius:50}}>
        <MaterialIcons name="add" size={56} style={{marginTop:-4,marginLeft:-4}}  color="#ffffff" />
        </View>
      </Image>
      </View>
    ) : (
      <View style={{width:130,height:130,position:"relative",top:0,zIndex:1}}>
        <View style={{justifyContent:"center",alignItems:"center",alignContent:"center"}}>
        <Image
        source={require('../../../assets/user.png')}
        style={{marginTop:15, borderRadius: 5,width:130,height:130,backgroundSize:"cover" ,borderRadius:63,borderWidth: 2,borderColor: "white"}}
        imageStyle={{ borderRadius: 5,width:150,height:150,backgroundSize:"cover" }}
      >
        <View style={{justifyContent:"center",alignItems:"center",alignContent:"center",justifyContent:"center",marginTop:"60%",marginLeft:"60%",backgroundColor:"#505050",borderColor:"#ffe",borderWidth:1,borderRadius:50}}>
        <MaterialIcons name="add" size={56} style={{marginTop:-4,marginLeft:-4}}  color="#ffffff" />
        </View>
      </Image>
        </View>
      </View>
    )}
  </TouchableOpacity>
  <TouchableOpacity
  onPress={handleSignOut}
  style={styles.button}
>
  <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>
    </View>
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
    marginTop: 28,
    height: 45,
    zIndex:1,
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
