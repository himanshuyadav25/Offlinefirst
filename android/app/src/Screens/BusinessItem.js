import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const BusinessItem = ({business}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.name}>{business.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BusinessItem;
