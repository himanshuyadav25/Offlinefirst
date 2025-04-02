import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import {initDB} from '../Database/Database';

const AddArticlesScreen = ({route}) => {
  const {businessId} = route.params;
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      const db = await initDB();
      const articleDocs = await db.articles
        .find({selector: {business_id: businessId}})
        .exec();
      setArticles(articleDocs);
    };
    loadArticles();
  }, []);

  return (
    <View>
      <FlatList
        data={articles}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default AddArticlesScreen;
