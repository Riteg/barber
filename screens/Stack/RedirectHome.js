import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View,Text } from 'react-native';

export default function RedirectHome() {
  const navigation = useNavigation()

  // after 3 seconds it should redirect to HomeScreen
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
       CommonActions.reset({
         index: 1,
         routes: [{ name: 'Home' }],
       })
     );
    }, 1)
  }, [])

  return (
    <View style={{backgroundColor:"#181818",height:"100%",width:"100%"}}><Text></Text></View>
  );
}