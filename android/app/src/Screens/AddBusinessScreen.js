import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import {initDB} from '../Database/Database';
import {nanoid} from 'nanoid';

const AddBusinessScreen = ({navigation}) => {
  const [businessName, setBusinessName] = useState('');

  const addBusiness = async () => {
    console.log('Adding business...');

    if (!businessName.trim()) {
      Alert.alert('Error', 'Business name cannot be empty!');
      return;
    }

    try {
      console.log('Initializing DB...');
      const db = await initDB();

      if (!db.business) {
        console.error('Error: businesses collection is undefined.');
        Alert.alert('Error', 'Database not initialized correctly.');
        return;
      }

      console.log('Inserting business...');
      await db.business.insert({
        id: nanoid(),
        name: businessName,
      });

      console.log('Business added successfully.');
      setBusinessName('');
      Alert.alert('Success', 'Business added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding business:', error);
      Alert.alert('Error', 'Failed to add business. Try again.');
    }
  };
  return (
    <View>
      <TextInput
        placeholder="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
      />
      <Button title="Add Business" onPress={addBusiness} />
    </View>
  );
};

export default AddBusinessScreen;
