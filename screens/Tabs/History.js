import { View, Text, SafeAreaView, Dimensions, Image, TouchableOpacity, TextInput, ScrollView, ViewComponent } from 'react-native'
import React from 'react'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const list = [
   {
     name: 'Amy Farha',
     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
     subtitle: 'Vice President'
   },
   {
     name: 'Chris Jackson',
     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
     subtitle: 'Vice Chairman'
   },
 ]

export default function History({ navigation }) {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#141313'}}>
      <View style={{flex:1,width:width,height:height,backgroundColor:'#141313',marginTop:0,marginLeft:0,alignSelf:'center'}} >
         <View style={{flexDirection:'row',backgroundColor:"#181818",height:50,alignItems:'center',justifyContent:'space-between'}}>
               <Text style={{color:'white',fontWeight:'700',textAlign:'center',width:width,fontSize:17,alignContent:"center"}}>Appointment History</Text>
         </View>
      </View> 
    </SafeAreaView>
  )
}
