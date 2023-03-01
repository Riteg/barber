import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { firebase } from "../../config";
import { SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/core'


export default function RegisterScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");

 const registerUser = async (email, password, fullname, phone) => {
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
<View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={(fullname) => setFullname(fullname)}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Email Adress"
          onChangeText={(email) => setEmail(email)}
          keyboardType={"email-address"}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={(phone) => setPhone(phone)}
          keyboardType={"phone-pad"}
          maxLength={11}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
        />
      </View>
</View>
<View style={styles.buttonContainer}>
      <TouchableOpacity
      onPress={()=> registerUser(email,password,fullname,phone)}
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
  },
  inputContainer: {
    width: '80%'
  },
  buttonOutlineText2: {
    color: '#0782f9',
    fontWeight: '700',
    fontSize: 14,
  },
  input: {
    backgroundColor: 'white',
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
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
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
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})