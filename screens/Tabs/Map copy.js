import { View, Text, SafeAreaView, Dimensions,StyleSheet, TouchableOpacity, ScrollView,Image,TextInput,ViewComponent, } from 'react-native'
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Carousel from 'react-native-snap-carousel-deprecated-prop-types';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './Carousel/CarouselCardItem'
import data from './Carousel/data';
import { List ,Avatar} from 'react-native-paper';
import { useState } from "react";
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import MyCarousel from './Carousel/MyCarousel';

const sday=getToday();
const day = getFormatedDate(new Date(), "YYYY/MM/DD h:m"); 

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


export default function Map({ navigation }) {
  const isCarousel = React.useRef(null)
  const [selectedDate, setSelectedDate] = useState('');
  

  return (
    <>
    <SafeAreaView style={{flex:1,backgroundColor:'#141313'}}>
    <View
        style={{
          width: width,
          height: height,
          backgroundColor: "#040904",
        }}
      >
      <View style={{flexDirection:'row',backgroundColor:"#181818",height:50,alignItems:'center',justifyContent:'space-between'}}>
        <Text style={{color:'white',fontWeight:'700',textAlign:'center',width:width,fontSize:17,alignContent:"center"}}>Select Appointment</Text>
      </View>
      <ProgressSteps progressBarColor={"#d90"} activeStepIconBorderColor={"#d90"} completedProgressBarColor={"#d90"} completedStepIconColor={"#d90"} activeLabelColor={"#d90"}>
        <ProgressStep label="Choose Service" nextBtnText={"Next"}nextBtnTextStyle={{color:"#ddd"}}  nextBtnStyle={{marginTop:-65,position:"absolute",right:-60,alignItems:"center",backgroundColor:"#d90",width:width/2}}>
        <View style={{ alignItems: 'center' ,height:height/2+20,paddingBottom:0 }}>
        <View>
          <View style={{marginTop:20}}>
            <MyCarousel/>
          </View>
    </View>
            </View>
        </ProgressStep>
        <ProgressStep label="Choose Barber" nextBtnText={"Next"} nextBtnTextStyle={{color:"#ddd"}} previousBtnTextStyle={{color:"#ddd"}} nextBtnStyle={{marginTop:-60,position:"absolute",right:-55,alignItems:"center",backgroundColor:"#dada",width:width/2}}previousBtnText={"Back"} previousBtnStyle={{marginTop:-60,position:"absolute",left:-65,alignItems:"center",backgroundColor:"#dada",width:width/2}}>
            <View style={{height:height/2+40,marginTop:20,backgroundColor:"#181818"}}>
            <List.Section>
              <List.Subheader style={{color:"#ddd"}}>Choose Barber</List.Subheader>
              <ScrollView>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
                <TouchableOpacity><List.Item title="Berber 1"description="The cutter"left={props => <Avatar.Image style={{marginLeft:20}} size={64} source={require('../../assets/user.png')} />}titleStyle={{color:"#fff"}}descriptionStyle={{color:"#ddd"}}/></TouchableOpacity>
          </ScrollView>
              </List.Section>
          </View>
        </ProgressStep>
        <ProgressStep label="Choose Time" nextBtnText={"Next"}nextBtnTextStyle={{color:"#ddd"}} previousBtnTextStyle={{color:"#ddd"}} nextBtnStyle={{marginTop:-60,position:"absolute",right:-55,alignItems:"center",backgroundColor:"#dada",width:width/2}}previousBtnText={"Back"} previousBtnStyle={{marginTop:-60,position:"absolute",left:-65,alignItems:"center",backgroundColor:"#dada",width:width/2}}>
          <View style={{ alignItems: 'center' ,height:height/2+20,paddingBottom:0,backgroundColor:"#181818" }}>
          <DatePicker
            options={{
              backgroundColor: '#090C08',
              textHeaderColor: '#FFA25B',
              textDefaultColor: '#F6E7C1',
              selectedTextColor: '#fff',
              mainColor: '#F4722B',
              textSecondaryColor: '#D6C7A1',
              borderColor: 'rgba(122, 146, 165, 0.1)',
            }}
            current={day}
            selected={sday}
            mode="datepicker"
            minuteInterval={5}
            style={{ borderRadius: 10 }}
            onSelectedChange={date => setSelectedDate(date)}
    />
            </View>
        </ProgressStep>
        <ProgressStep label="Finish" nextBtnText={"Next"}nextBtnTextStyle={{color:"#ddd"}} previousBtnTextStyle={{color:"#ddd"}} nextBtnStyle={{marginTop:-60,position:"absolute",right:-55,alignItems:"center",backgroundColor:"#dada",width:width/2}}previousBtnText={"Back"} previousBtnStyle={{marginTop:-60,position:"absolute",left:-65,alignItems:"center",backgroundColor:"#dada",width:width/2}}>
          <View style={{ alignItems: 'center' ,height:height/2+20,paddingBottom:0,backgroundColor:"#d92" }}>
                <Text >Randevu başarıyla alındı ekranı ve randevu detayları</Text>
            </View>
        </ProgressStep>
    </ProgressSteps>

</View>
    </SafeAreaView>
    </>
    
  )
}
const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop:55,
    padding: 35,
    height:height-175,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    width:width/2,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#732732',
    bottom:20,
    left:30,
    position:"absolute"
  },
  buttonAdd: {
    backgroundColor: '#166446',
    bottom:20,
    right:30,
    position:"absolute"
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
