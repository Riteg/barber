import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index }) => {
  return (
    
    <View style={styles.container} key={index}>
      <TouchableOpacity>
      <Image style={styles.image} source={item.imgUrl} />
      <Text style={styles.header2}>Service Name</Text>
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body2}>Service Price</Text>
      <Text style={styles.body}>${item.price}</Text>
      <Text style={styles.body2}>Service Time</Text>
      <Text style={styles.body}>{item.time} minutes</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181818',
    borderRadius: 20,
    height:350,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 170,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },
  header: {
    color: "#fff",
    fontSize: 14,
    backgroundColor:"#181818",
    fontWeight: "bold",
    paddingLeft: 20,
  },
  body: {
    color: "#ddd",
    backgroundColor:"#181818",
    fontSize: 14,
    paddingLeft: 20,
    fontWeight: "bold",
    paddingRight: 20
  },
  header2: {
    color: "#d80",
    fontSize: 18,
    backgroundColor:"#181818",
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body2: {
    color: "#d80",
    backgroundColor:"#181818",
    fontSize: 18,
    paddingLeft: 20,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default CarouselCardItem