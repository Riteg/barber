import React from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';

const CustomAlert = ({ message, backgroundColor, textColor }) => {
  return (
    <View style={[styles.alert, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.alertText, { color: textColor }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomAlert;
