import { View, SafeAreaView, Dimensions,ImageBackground,Button,Modal, TouchableOpacity,StyleSheet, TextInput, ScrollView, ViewComponent } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import React,{useEffect,useState} from 'react'
import { auth } from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tab, Text, TabView ,ListItem,Avatar,Image } from '@rneui/themed';
import * as firebase from 'firebase';
import { signOut } from 'firebase/auth'
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import EditBarber from "./AdminPanel/EditBarber";
import EditAdmin from "./AdminPanel/EditAdmin";
import EditService from "./AdminPanel/EditService";
import EditTime from "./AdminPanel/EditTime";
import FullName from "./Profile/FullName";
import Email from "./Profile/Email";
import Phone from "./Profile/Phone";
import Password from "./Profile/Password";
import ProfilePicture from "./Profile/ProfilePicture";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export default function User({ navigation }) {
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
      setCurrentEmail(email)
      const image = userData.image;
      setImage(image)
      const admin = userData.admin;
  });
  let adminValue = null;
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid; 
    const userRef = firebase.firestore().collection('users').doc(userId);
    userRef.get().then((doc) => {
      const userData = doc.data();
      const admin = userData.admin;
      setAdmin(admin);
      adminValue = admin; // set the variable value inside the useEffect
    });
  }, []);


  const [fullname, setFullname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [adminmi, setAdminmi] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [phonenew, setPhonenew] = useState("");
  const [uploading, setUploading] = useState("");
  const [emailnew, setEmailnew] = useState("");
  const [fullnamenew, setFullnamenew] = useState("");
  const collectionRef = firebase.firestore().collection('users').doc(userId);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setnewEmail] = useState('');
  
    const handleChangePassword = () => {
      // Get the current user
      const user = firebase.auth().currentUser;
  
      // Get the user's credentials
      const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
  
      // Reauthenticate the user using their current credentials
      user.reauthenticateWithCredential(credentials)
        .then(() => {
          // Update the user's password
          return user.updatePassword(newPassword);
        })
        .then(() => {
          // Password updated successfully
          Alert.alert('Success', 'Password updated successfully');
          return updateFirestorePassword();
        })
        .catch((error) => {
          // Handle errors here
          Alert.alert('Error', error.message);
        });
        setModalVisible4(false)
    };
    const handleChangeEmail = () => {
      // Get the current user
      const user = firebase.auth().currentUser;
    
      // Get the user's credentials
      const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
    
      // Reauthenticate the user using their current credentials
      user.reauthenticateWithCredential(credentials)
        .then(() => {
          // Update the user's email
          return user.updateEmail(newEmail);
        })
        .then(() => {
          // Email updated successfully
          Alert.alert('Success', 'Email updated successfully');
          setCurrentEmail(newEmail); // update the state with the new email
          
          // Update the email in Firestore
          return updateFirestoreEmail();
        })
        .catch((error) => {
          // Handle errors here
          Alert.alert('Error', error.message);
        })
        .finally(() => {
          setnewEmail(null)
          setModalVisible3(false)
        });
    };
    
    const updateFirestoreEmail = async () => {
      try {
        const userId = firebase.auth().currentUser.uid;
        const newDocRef = firebase.firestore().collection('users').doc(userId);
        await newDocRef.update({
          email: newEmail,
        });
      } catch (error) {
        console.error('Error saving data: ', error);
      }
    };
    const updateFirestorePassword = async () => {
      try {
        const userId = firebase.auth().currentUser.uid;
        const newDocRef = firebase.firestore().collection('users').doc(userId);
        await newDocRef.update({
          password: newPassword,
        });
      } catch (error) {
        console.error('Error saving data: ', error);
      }
    };  
    
    
  const handleSubmit = async (phone) => {
    try {
      setPhone(phonenew)
      await collectionRef.update({
        phone,
      });
      setModalVisible(false)
    } catch (error) {
      console.error('Error updating phone number:', error);
    }
  };
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

 
 <>
    
    <View style={{flexDirection:'row',backgroundColor:"#181818",height:50,alignItems:'center',justifyContent:'space-between'}}>
      <Text style={{color:'white',fontWeight:'700',alignItems:'center',fontSize:17,alignContent:"center",textAlign:'center',width:width,fontSize:17}}>Profile</Text>
    </View>
      <Tab
      value={index}
      containerStyle={{height:50,backgroundColor:"#181818",borderTopColor:"#999",borderTopWidth:0.2}}
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
    </Tab>
    <TabView value={index} onChange={setIndex} animationType="timing" disableSwipe={true}>
      <TabView.Item style={{ backgroundColor: '#181818', width: '100%' }}>
      <View
            style={{ width: width, height: height, backgroundColor: "#181818" }}
          >
            <ProfilePicture />
            <ListItem
              containerStyle={{ backgroundColor: "#181818", marginTop: 0 }}
            >
              <ListItem.Content>
                <ListItem.Title style={{ color: "#fff", marginTop: 5 }}>
                  User Information
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <FullName />
            <Email />
            <Phone />
            <Password />
          </View>
      
    
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: "#181818", width: "100%" }}>
          <View
            style={{ width: width, height: height, backgroundColor: "#181818" }}
          >
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                top: height - 180,
              }}
            >
              <View style={{ width: width }}>
                <Text style={styles.editText2}>created by: Smartist Tech</Text>
              </View>
            </View>
          </View>
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
  editText2: {
    color: "#fff",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 8,
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
    width: 150,
    borderRadius: 0,
    backgroundColor: "#123123",
  },
  button3: {
    marginTop: 20,
    height: 45,
    marginLeft:5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    width: 150,
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
