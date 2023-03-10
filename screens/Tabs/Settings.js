import { View, Text, SafeAreaView, Dimensions, Image, TouchableOpacity, TextInput, ScrollView, ViewComponent } from 'react-native'
import React from 'react'
import { useEffect,useState } from 'react'
import { firebase } from "../../config";
import { AntDesign ,Ionicons} from '@expo/vector-icons';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


export default function Settings({ navigation }) {
  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('barbers').onSnapshot(querySnapshot => {
        const userData = [];
        querySnapshot.forEach(doc => {
          userData.push(doc.data());
        });
        setUserHastalik(userData.map(user => user.name));
      });
    
      return () => {
        unsubscribe();
      }
    }, [userId]); 
    const [userHastalik, setUserHastalik] = useState("");
    const userId = firebase.auth().currentUser.uid;
    const berbernames = userHastalik;
    console.log(berbernames);

    useEffect(() => {
      const unsubscribe = firebase.firestore().collection('users').doc(userId).collection("appointment").onSnapshot(querySnapshot => {
          const userData = [];
          querySnapshot.forEach(doc => {
            userData.push(doc.data());
          });
          setUserHasta(userData.filter(user => berbernames.includes(user.barber)).map(user => user.barber));

        });
      
        return () => {
          unsubscribe();
        }
      }, [userId]); 
      const [userhasta, setUserHasta] = useState("");
      const hastaliklar = userhasta;
      console.log(hastaliklar);  
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#141313'}}>
      <View style={{flex:1,width:width,height:height,backgroundColor:'#141313',marginTop:0,marginLeft:0,alignSelf:'center'}} >
         <View style={{flexDirection:'row',backgroundColor:"#181818",height:50,alignItems:'center',justifyContent:'space-between'}}>
               <Text style={{color:'white',fontWeight:'700',textAlign:'center',width:width,fontSize:17,alignContent:"center"}}>Settings</Text>
         </View>
      </View> 
    </SafeAreaView>
  )
}
