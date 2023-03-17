import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';


const data = [
  {
    text: "Through this application, you can make an appointment at any time, without calling the barber, and perform the operations.",
    title: "Welcome to Barber Appointment App",
    image: require("../../assets/giris1.png"),
    bg: "#181818",
  },
  {
    title: "Welcome to Barber Appointment App ",
    text: "You can easily and quickly access the transactions you want to do.",
    image: require("../../assets/giris2.png"),
    bg: "#181818",
  },
  {
    title: "Welcome to Barber Appointment App  ",
    text: "Don\'t forget to turn on notifications to be notified instantly of developments.",
    image: require("../../assets/giris3.png"),
    bg: "#181818",
  },
];



type Item = typeof data[0];

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: "90%",
    height: "40%",
    resizeMode: "contain",
  },
  header:{
    position:"absolute",
    color:"#fff",
    top:"5%",
    width:"100%",
    fontSize:18,
    alignContent:"center",
    textAlign:"center",
    zIndex:1,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom:80,
    fontSize:18,
    paddingHorizontal:20,
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 60,
    left: 16,
    right: 16,
  },
  paginationDots: {
    height: 16,
    margin: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 8,
    borderRadius: 15,
    height:60,
    backgroundColor: '#282A3A',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default class Intro2 extends React.Component {
  slider: AppIntroSlider | undefined;
  _renderItem = ({item}: {item: Item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  _keyExtractor = (item: Item) => item.title;

  _renderPagination = (activeIndex: number) => {
    return (
      <View style={styles.paginationContainer}>
        <SafeAreaView>
          <View style={styles.paginationDots}>
            {data.length > 1 &&
              data.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.dot,
                    i === activeIndex
                      ? {backgroundColor: 'white'}
                      : {backgroundColor: '#777'},
                  ]}
                  onPress={() => this.slider?.goToSlide(i, true)}
                />
              ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate("LoginScreen")}
              style={[styles.button, {backgroundColor: '#B46060'}]}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate("RegisterScreen")}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <Text style={styles.header}>Welcome to Barber Appointment App</Text>
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          renderPagination={this._renderPagination}
          data={data}
          ref={(ref) => (this.slider = ref!)}
        />
      </View>
    );
  }
}