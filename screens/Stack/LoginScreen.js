import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import {useEffect} from "react";
import { SafeAreaView, StyleSheet, Text,Button ,TextInput,Image, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebase'
import { useState } from 'react';


export default function LoginScreen({ navigation }) {
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
    fontSize: 14,
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