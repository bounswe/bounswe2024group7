import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SpinboxInput = ({onChange}) => {
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
const newValue = Math.min(value + 1, 2);
    setValue(newValue);
    onChange(newValue);  };

  const handleDecrement = () => {
const newValue = Math.max(value - 1, 0);
    setValue(newValue);
    onChange(newValue);  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDecrement}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity style={styles.button} onPress={handleIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 20,
  },
  value: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default SpinboxInput;