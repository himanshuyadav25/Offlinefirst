import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import {initDB} from '../Database/Database';
import BusinessItem from '../Screens/BusinessItem';

const HomeScreen = ({navigation}) => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const loadBusinesses = async () => {
      const db = await initDB();
      const businessDocs = await db.businesses.find().exec();
      setBusinesses(businessDocs);
    };
    loadBusinesses();
  }, []);

  return (
    <View>
      <Button
        title="Add Business"
        onPress={() => navigation.navigate('BusinessScreen')}
      />
      <FlatList
        data={businesses}
        keyExtractor={item => item.id}
        renderItem={({item}) => <BusinessItem business={item} />}
      />
    </View>
  );
};

export default HomeScreen;
