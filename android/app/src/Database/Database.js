import {createRxDatabase, addRxPlugin} from 'rxdb';
import {RxDBUpdatePlugin} from 'rxdb/plugins/update';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {businessSchema} from './Schemas';
import {articleSchema} from './Schemas';

addRxPlugin(RxDBUpdatePlugin);

let dbInstance = null;

export const initDB = async () => {
  if (!dbInstance) {
    dbInstance = await createRxDatabase({
      name: 'business',
      storage: {
        async getItem(key) {
          return await AsyncStorage.getItem(key);
        },
        async setItem(key, value) {
          await AsyncStorage.setItem(key, value);
        },
        async removeItem(key) {
          await AsyncStorage.removeItem(key);
        },
      },
    });

    await dbInstance.addCollections({
      business: {schema: businessSchema},
      articles: {schema: articleSchema},
    });

    console.log('Database initialized!');
  }
  return dbInstance;
};

// Function to sync with CouchDB when online
export const setupSync = async db => {
  NetInfo.addEventListener(state => {
    if (state.isConnected) {
      console.log('Syncing with CouchDB...');
      db.business.syncCouchDB({
        remote: 'http://admin:password@127.0.0.1:5984/business',
      });
      db.articles.syncCouchDB({
        remote: 'http://admin:password@127.0.0.1:5984/articles',
      });
    }
  });
};
