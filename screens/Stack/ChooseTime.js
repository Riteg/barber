import React, {useRef, useState, useEffect,useMemo} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel-deprecated-prop-types';
import {View,Text,Dimensions,StyleSheet,TouchableOpacity,Platform,SafeAreaView,Image,Button} from 'react-native';
import { Animated } from 'react-native';
import { CheckBox } from '@rneui/themed/dist/CheckBox';
import { FlatList } from 'react-native';
import DatePicker from "react-native-styled-datepicker";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import {LocaleConfig} from 'react-native-calendars';
import { firebase } from "../../config";
import {TimePicker, ValueMap} from 'react-native-simple-time-picker';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const {width: screenWidth} = Dimensions.get('window');

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: "Today"
};
LocaleConfig.defaultLocale = 'en';
export default function ChooseTime({route, navigation }) {

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [hour, setHour] = useState("");
  
  const handlePress = (index) => {
    setSelectedButtonIndex(index);
    setHour(index);
  };
  
  const buttonStyle = (index, selectedButtonIndex) => {
    const selectedColor = '#d90';
    const unselectedColor = '#181818';
    
    if (index === selectedButtonIndex) {
      return {...styles.buttontitle, backgroundColor: selectedColor};
    }
    else {
      return {...styles.buttontitle, backgroundColor: unselectedColor};
    } 
  };
  
  const [currentDate, setCurrentDate] = useState(new Date().toUTCString());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(interval);
    
  }, []);
  const [check3, setCheck3] = useState(false);
  const userId = firebase.auth().currentUser.uid;
  const { docum } = route.params;
  const { barberId } = route.params;
  const { service } = route.params;
  const { barberPhoto } = route.params;
  const { barber } = route.params;
  const berbersID = barberId;
  const docId = docum;
const collectionRef = firebase.firestore().collection('users').doc(userId).collection("appointment");
const handleSubmit = async () => {
  try {
    const newDocRef = collectionRef.doc(docId);
    await newDocRef.update({
      time,
      hour,
      currentDate,
    });
    console.log('Data saved successfully with ID:', newDocRef.id);
    const docum = newDocRef.id;
    navigation.navigate('Finish', {  docum, barberId ,service,barberPhoto,time,hour,currentDate,barber });
  } catch (error) {
    console.error('Error saving data: ', error);
  }
}
  const [time, setTime] = useState("");
  return (
    <>
    <SafeAreaView style={{flex:1,backgroundColor:'#181818'}}>
      <View style={{width: width, height: height,backgroundColor: "#141414"}}>
        <View style={{flexDirection:'row',backgroundColor:"#181818",height:50,alignItems:'center',justifyContent:'space-between'}}>
          <Text style={{color:'white',fontWeight:'700',textAlign:'center',width:width,fontSize:17,alignContent:"center"}}>Select Time</Text>
        </View>
        <View style={styles.contasiner}>
        <Text style={styles.barberbutton2}>Choose Day</Text>
<Calendar
  markedDates={{
    [time]: {selected: true, marked: true, selectedColor: '#d90',selectedTextColor:"#fff",dotColor:"#fff"}
  }}
  theme={{
    calendarBackground: '#181818',
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: 'blue',
    selectedDayTextColor: 'red',
    todayTextColor: '#00adf5',
    dayTextColor: '#fff',
    textDisabledColor: '#2d4150',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: 'orange',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: '#fff',
    indicatorColor: '#fff',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 12,
    textMonthFontSize: 12,
    textDayHeaderFontSize: 12
  }}
  onDayPress={(day) => { 
    const dateString =day.dateString.toString()
    setTime(dateString);}}
  onDayLongPress={day => {
    console.log('selected day', day);
  }}
    onMonthChange={month => {
      console.log('month changed', month);
    }}
/>
</View>
<Text style={styles.barberbutton2}>Choose Time</Text>
<View style={{flexDirection:"column",marginLeft:10,marginBottom:20}}>
<View style={{flexDirection:"row"}}>
        <TouchableOpacity style={buttonStyle('08:00 AM',selectedButtonIndex)} onPress={() => handlePress('08:00 AM')}>
          <Text style={styles.text}>08:00 AM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle('08:30 AM',selectedButtonIndex)} onPress={() => handlePress('08:30 AM')}>
          <Text style={styles.text}>08:30 AM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle('09:00 AM',selectedButtonIndex)} onPress={() => handlePress('09:00 AM')}>
          <Text style={styles.text}>09:00 AM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle('09:30 AM',selectedButtonIndex)} onPress={() => handlePress('09:30 AM')}>
          <Text style={styles.text}>09:30 AM</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={buttonStyle('10:00 AM',selectedButtonIndex)} onPress={() => handlePress('10:00 AM')}>
          <Text style={styles.text}>10:00 AM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle('10:30 AM',selectedButtonIndex)} onPress={() => handlePress('10:30 AM')}>
          <Text style={styles.text}>10:30 AM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle('11:00 AM',selectedButtonIndex)} onPress={() => handlePress('11:00 AM')}>
          <Text style={styles.text}>11:00 AM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle('11:30 AM',selectedButtonIndex)} onPress={() => handlePress('11:30 AM')}>
          <Text style={styles.text}>11:30 AM</Text>
        </TouchableOpacity>
      </View>
  <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={buttonStyle('00:00 PM',selectedButtonIndex)} onPress={() => handlePress('00:00 PM')}>
          <Text style={styles.text}>00:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle('01:00 PM',selectedButtonIndex)} onPress={() => handlePress('01:00 PM')}>
          <Text style={styles.text}>01:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle('01:30 PM',selectedButtonIndex)} onPress={() => handlePress('01:30 PM')}>
          <Text style={styles.text}>01:30 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle('02:00 PM',selectedButtonIndex)} onPress={() => handlePress('02:00 PM')}>
          <Text style={styles.text}>02:00 PM</Text>
        </TouchableOpacity>
      </View>
  <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={buttonStyle('02:30 PM',selectedButtonIndex)} onPress={() => handlePress('02:30 PM')}>
          <Text style={styles.text}>02:30 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle('03:00 PM',selectedButtonIndex)} onPress={() => handlePress('03:00 PM')}>
          <Text style={styles.text}>03:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle('03:30 PM',selectedButtonIndex)} onPress={() => handlePress('03:30 PM')}>
          <Text style={styles.text}>03:30 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle('04:00 PM',selectedButtonIndex)} onPress={() => handlePress('04:00 PM')}>
          <Text style={styles.text}>04:00 PM</Text>
        </TouchableOpacity>
      </View>

</View>
<Button title="Submit" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
    </>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    marginBottom:0,
  },
  selected: {
    backgroundColor:"red",
  },
  buttontitle:{
    width:width/4-15,
    justifyContent: 'center',
    margin:5,
    height:30,
    backgroundColor:"#181818",
    borderRadius:30,
    borderBottomWidth:1,
    borderColor:"#141414",
  },
  text:{
    color:"#fff",
    textAlign:"center",
  },
  list: {
    height: '100%',
    width: width,
    color:"white",

  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  serviceimg: {
    height: 170,
    width: 125,
    alignItems:"flex-start",
    alignContent:"flex-start",
    justifyContent:"flex-start",
    alignSelf:"flex-start",
  },
  tinyLogo: {
    height: 75,
    width: 100,
    alignItems:"center",
    alignContent:"center",
    justifyContent:"center",
    alignSelf:"center",
  },
  button: {
    width: width/3,
  },
  barberbutton2: {
    textAlign:"center",
    marginVertical:10,
    color:"#fff",
  },
  filterBar: {
    flexDirection: 'row',
    // flex: 0.2,
    height: 100,
    color:"white",

  },
  item: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    alignContent:"center",
    color:"white",

  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: '#181818',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title:{
    color:"#fff",
    position:"absolute",
    bottom:50,
    left:25,
    textAlign:"left",
    alignContent:"center",
    alignSelf:"center",
    fontSize:22,
  },
  price:{
    color:"#fff",
    position:"absolute",
    bottom:25,
    left:25,
    textAlign:"left",
    alignContent:"flex-start",
    alignSelf:"flex-start",
    fontSize:22,
  }
});  
