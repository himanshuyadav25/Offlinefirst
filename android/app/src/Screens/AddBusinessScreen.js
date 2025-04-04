import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import {initDB} from '../Database/Database';
import {nanoid} from 'nanoid';
import {addBusiness, getBusinesses} from '../Database/DatabaseService';

const AddBusinessScreen = ({navigation}) => {
  const [businessName, setBusinessName] = useState('');

  const addName = () => {
    getBusinesses();
    console.log('businessName', businessName);
    if (businessName) {
      addBusiness(businessName);
    }
    setBusinessName('');
  };

  return (
    <View>
      <TextInput
        placeholder="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
      />
      <Button title="Add Business" onPress={addName} />
    </View>
  );
};

export default AddBusinessScreen;
