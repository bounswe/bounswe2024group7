import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Label = ({ title, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.class}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B46C1', // Purple colour that our Website has
    borderRadius: 20, // Circular corners
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  class: {
    color: '#F7F7F7', // Light background for header
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    color: '#F7F7F7', // Light background for header
  },
});

export default Label;