import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Label = ({ className, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.class}>{className}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6247aa', // Blue background color, you can change it to any color you like
    borderRadius: 20, // Circular corners
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  class: {
    color: '#fff', // White text color
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    color: '#fff', // White text color
  },
});

export default Label;