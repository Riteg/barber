import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, Button, Dimensions, TextInput, Image, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebase';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from "../../config";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useState } from 'react';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [gemail, setGemail] = React.useState(null);
  const [gname, setGname] = React.useState(null);
  const [gid, setGid] = React.useState(null);
  const [gpic, setGpic] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "493794739289-5m5tipo54iqdf5ojmf50di3lidbi98f8.apps.googleusercontent.com",
    iosClientId: "493794739289-hu7rslrgnhbjc1lb9juah81t356hpvmi.apps.googleusercontent.com",
    androidClientId: "493794739289-codbee0prp7s5r371uuijhm9jov2v3lo.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken])

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    const userInfo = await response.json();
    const userSnapshot = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", userInfo.email)
      .get();

    if (userSnapshot.size > 0) {
      // User already exists, sign in
      await firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.id);
    } else {
      // User doesn't exist, sign up
      await firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.id);

      // Send verification email
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: "https://berber-2df5c.firebaseapp.com",
      });

      // Save user info to Firestore
      await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
        fullname: `${userInfo.given_name} ${userInfo.family_name}`,
        email: userInfo.email,
        phone: "-",
        password: userInfo.id,
        image: userInfo.picture,
        admin: "",
        barber: "",
      });
    }
    setGemail(userInfo.email)
    setGid(userInfo.id)
    setGname(userInfo.name)
    setGpic(userInfo.picture)
    console.log('Logged in with:', userInfo.email);
  }











  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log("auth state changed", user);
      if (user) {
        navigation.replace("Map")
      }
    })

    // Manually set the user object to test navigation
    // const user = auth.currentUser;
    // if (user) {
    //   navigation.replace("Map")
    // }

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
        <Image style={styles.tinyLogo} source={require("../../assets/l2.png")} />
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
        <TouchableOpacity onPress={handleLogin} style={styles.TouchableOpacity} >
          <Text style={styles.Text}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.Text3}>or</Text>
        <View style={styles.LoginButtons}>
          <TouchableOpacity disabled={!request} onPress={() => { promptAsync(); }} style={styles.TouchableOpacity2} >
            <Text style={styles.Text2}><AntDesign name="google" size={24} color="white" /></Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")} style={{ marginTop: 20 }}>
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
    backgroundColor: "#181818"
  },
  inputContainer: {
    width: '80%'
  },
  buttonOutlineText2: {
    color: '#eee',
    fontWeight: '700',
    fontSize: width < 375 ? 11 : 14,
  },
  input: {
    backgroundColor: '#404040',
    color: "#fff",
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
    justifyContent: "flex-end",
    width: 125,
    backgroundSize: "cover",
    height: 125,
    padding: 15,
    borderRadius: 15,
    alignContent: "flex-end",
    justifyContent: "center",
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
    justifyContent: "center",
  },
  buttonText2: {
    color: '#dd9900',
    backgroundColor: "#18181875",
    fontWeight: '700',
    fontSize: 13,
    justifyContent: "center",
    textAlign: "center",
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  tinyLogo: {
    width: 200,
    backgroundSize: "cover",
    height: 100,
    marginBottom: 15,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  TabNavigator2: {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarActiveTintColor: "#d90",
    tabBarStyle: [
      {
        display: "flex",
        height: 45,
        backgroundColor: "#181818",
        borderTopWidth: 0,
      },
      null,
    ],
  },
  TouchableOpacity: {
    backgroundColor: "#d90",
    height: 50,
    padding: 10,
    width: width - 80,
    borderRadius: 5,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  TouchableOpacity2: {
    backgroundColor: "#d90",
    height: 60,
    padding: 10,
    width: 75,
    borderRadius: 50,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  LoginButtons: {
    flexDirection: "row",
    marginTop: 15,
    width: width,
    justifyContent: "center",
    alignContent: "center",
  },
  Text: {
    fontWeight: "900",
    fontSize: 18,
    color: "#fff",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  Text2: {
    fontWeight: "900",
    fontSize: 18,
    color: "#fff",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  Text3: {
    fontWeight: "900",
    fontSize: 18,
    color: "#ddd",
    marginTop: 20,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  Page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  PageName: {
    width: width,
    height: height,
    backgroundColor: "#181818",
    alignSelf: "center",
  },
  PageHeader: {
    flexDirection: "row",
    backgroundColor: "#121314",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
  PageHeaderText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    width: width,
    fontSize: 17,
    alignContent: "center",
  },
  inputContainer: {
    width: width - 80,
    justifyContent: "center",
    alignContent: "center",
  },
  buttonOutlineText2: {
    color: "#eee",
    fontWeight: "700",
    fontSize: 14,
  },
  input: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#262626",
    color: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 3,
    marginTop: 10,
  },
  buttonContainer: {
    width: width - 120,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#d90",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  button2: {
    backgroundColor: "#ddd",
    justifyContent: "flex-end",
    width: 125,
    backgroundSize: "cover",
    height: 125,
    padding: 15,
    borderRadius: 15,
    alignContent: "flex-end",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    justifyContent: "center",
  },
  buttonText2: {
    color: "#dd9900",
    backgroundColor: "#18181875",
    fontWeight: "700",
    fontSize: 13,
    justifyContent: "center",
    textAlign: "center",
  },
  buttonOutlineText: {
    color: "#565656",
    fontWeight: "700",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  buttonOutlineText2: {
    color: "#ddd",
    fontWeight: "700",
    fontSize: 16,
  },
  LoginContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: height - 280,
    width: width - 50,
    backgroundColor: "#181818",
    marginTop: 100,
  },
  Smartist: {
    width: 120,
    height: 8,
    position: "absolute",
    flex: 0,
    bottom: 40,
    alignSelf: "center",
  },
  Quapp: {
    width: width - 200,
    height: 40,
    flex: 0,
    bottom: 20,
    alignSelf: "center",
  },
})