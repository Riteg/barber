import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Button,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import React, { useState,useEffect } from "react";
import { firebase } from "../../config";
import { SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/core'
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

export default function RegisterScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [uploading, setUploading] = useState("");
  const [foto, setFoto] = useState("");
  const [admin, setAdmin] = useState("");
  const [barber, setBarber] = useState("");
  const [image, setImage] = useState(null);


  useEffect(() => {
  }, [image]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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
      } catch (e) {
      }
      setUploading(false);
      const downloadUrl = await firebase.storage().ref().child(filename).getDownloadURL();
      setImage(downloadUrl);
      console.log("down",downloadUrl)
    }

  };

console.log("Image",image)

 const registerUser = async (email, password, fullname, phone,image,admin,barber) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://berber-2df5c.firebaseapp.com",
          })
          .then(() => {
            alert("Verification email sent");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                fullname,
                email,
                phone,
                password,
                image,
                admin,
                barber,
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
<SafeAreaView
style={styles.container}
behavior="padding"
>

<View style={styles.inputContainer}>
<Image style={styles.tinyLogo}source={require("../../assets/l2.png")}/>
<View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={"#909090"}
          onChangeText={(fullname) => setFullname(fullname)}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Email Adress"
          placeholderTextColor={"#909090"}
          onChangeText={(email) => setEmail(email)}
          keyboardType={"email-address"}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor={"#909090"}
          onChangeText={(phone) => setPhone(phone)}
          keyboardType={"phone-pad"}
          maxLength={11}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#909090"}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

</View>
<View style={{backgroundColor:"#404040",width:"80%",alignItems:"center",borderRadius:10,flexDirection:"row",marginTop:20 }}>
<Text style={{color:'#909090',textAlign:"center",fontSize:13,paddingLeft:0,fontWeight:"600",width:120}}>Choose Picture</Text>
    <View style={{marginLeft:85}}>
    <TouchableOpacity onPress={pickImage}>
        {image ? (
          <ImageBackground
            source={{ uri: image }}
            style={styles.button2}
            imageStyle={{ borderRadius: 5 }}
          >
            <View style={{justifyContent:"center",alignItems:"center",alignContent:"center"}}>
            <MaterialIcons name="insert-photo" size={56}  color="#ffffff01" />
            </View>
          </ImageBackground>
        ) : (
          <View style={styles.button2}>
            <View style={{justifyContent:"center",alignItems:"center",alignContent:"center"}}>
            <MaterialIcons name="insert-photo" size={56}  color="#000" />
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
    </View>
<View style={styles.buttonContainer}>
      <TouchableOpacity
      onPress={()=> registerUser(email,password,fullname,phone,image,admin,barber)}
      style={styles.button}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity
          onPress={()=> navigation.navigate("LoginScreen")}
          style={{marginTop:20}}
        >
          <Text style={styles.buttonOutlineText2}>Already have account? Login Now</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#181818"
  },
  inputContainer: {
    width: '80%'
  },
  buttonOutlineText2: {
    color: '#eee',
    fontWeight: '700',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#404040',
    paddingHorizontal: 15,
    color:"#fff",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#d90',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  button2: {
    backgroundColor: '#ddd',
    justifyContent:"flex-end",
    width: 125,
    backgroundSize:"cover",
    height:125,
    padding: 15,
    borderRadius: 15,
    alignContent:"flex-end",
    justifyContent:"center",
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    justifyContent:"center",
  },
  buttonText2: {
    color: '#dd9900',
    backgroundColor:"#18181875",
    fontWeight: '700',
    fontSize: 13,
    justifyContent:"center",
    textAlign:"center",
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  tinyLogo: {
    width:105,
    backgroundSize:"cover",
    height:50,
    alignContent:"center",
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
  },
})