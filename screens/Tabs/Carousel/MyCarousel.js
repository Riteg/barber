import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel-deprecated-prop-types';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import data from './data';


const {width: screenWidth} = Dimensions.get('window');

const MyCarousel = props => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(data);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
        <TouchableOpacity>
      <View style={styles.item}>
        <ParallaxImage
          source={item.imgUrl}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <View style={{backgroundColor:"#181818",height:100}}>
        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
        <Text style={styles.price} numberOfLines={3}>{item.time} min.</Text>
        </View>

      </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
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
    textAlign:"center",
    alignContent:"center",
    alignSelf:"center",
    fontSize:22,
  },
  price:{
    color:"#fff",
    position:"absolute",
    bottom:25,
    textAlign:"center",
    alignContent:"center",
    alignSelf:"center",
    fontSize:22,
  }
});