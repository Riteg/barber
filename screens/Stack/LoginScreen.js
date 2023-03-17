import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import {useEffect} from "react";
import { SafeAreaView, StyleSheet, Text,Button ,Dimensions,TextInput,Image, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebase'
import { useState } from 'react';
import { GoogleSignin } from '@react-native-community/google-signin';
import { GoogleSigninButton } from '@react-native-community/google-signin';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


export default function LoginScreen({ navigation }) {
  GoogleSignin.configure({
    webClientId: '493794739289-ufha1tj3f99k2baknhhps7m9rm7jefq2.apps.googleusercontent.com',
  });

const onGoogleButtonPress = async() => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    const user_sign_in = auth().signWithCredential(googleCredential);
    user_sign_in.then((user)=>{
      console.log(user);
    })
    .catch((error)=> {
      console.log(error)
    })
  }
 // Set an initializing state whilst Firebase connects
 const [initializing, setInitializing] = useState(true);
 const [user, setUser] = useState();

 // Handle user state changes
 function onAuthStateChanged(user) {
   setUser(user);
   if (initializing) setInitializing(false);
 }

 useEffect(() => {
   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
   return subscriber; // unsubscribe on unmount
 }, []);

 if (initializing) return null;


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Map")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <SafeAreaView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
      <Image style={styles.tinyLogo}source={require("../../assets/l2.png")}/>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"#909090"}
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"#909090"}
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <GoogleSigninButton
        style={{width:300,height:65}}
      onPress={onGoogleButtonPress}
    />
        <TouchableOpacity
          onPress={()=> navigation.navigate("RegisterScreen")}
          style={{marginTop:20}}
        >
          <Text style={styles.buttonOutlineText2}>Don't have an account? Register Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )

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
    fontSize:  width < 375 ? 11 : 14,
  },
  input: {
    backgroundColor: '#404040',
    color:"#fff",
    paddingHorizontal: 15,
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
    fontSize: width < 375 ? 13 : 16,
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
    width:200,
    backgroundSize:"cover",
    height:100,
    marginBottom:15,
    alignContent:"center",
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
  },
})