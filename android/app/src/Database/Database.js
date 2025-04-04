import {addRxPlugin, createRxDatabase} from 'rxdb/plugins/core';
import {getRxStorageSQLite} from 'rxdb/plugins/storage-sqlite';
import SQLiteAdapter from 'rxdb/plugins/storage-sqlite';
import {businessSchema} from './Schemas';
import {articleSchema} from './Schemas';
import {RxDBReplicationCouchDBPlugin} from 'rxdb/plugins/replication-couchdb';
import NetInfo from '@react-native-community/netinfo';
import {getRxStorageLocalstorage} from 'rxdb/plugins/storage-localstorage';
import {wrappedValidateAjvStorage} from 'rxdb/plugins/validate-ajv';
import {RxDBDevModePlugin} from 'rxdb/plugins/dev-mode';

// Enable SQLite storage
// addRxPlugin(SQLiteAdapter);
addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBReplicationCouchDBPlugin);
// Create Database Instance
export const initDB = async () => {
  const db = await createRxDatabase({
    name: 'mydatabase',
    storage: wrappedValidateAjvStorage({
      storage: getRxStorageLocalstorage(),
    }),
  });
  await db.addCollections({
    businesses: {schema: businessSchema},
    articles: {schema: articleSchema},
  });

  console.log('Database Initialized', db);
  return db;
};
export const setupSync = async db => {
  const syncUrl = 'http://127.0.0.1:5984';

  NetInfo.addEventListener(state => {
    if (state.isConnected) {
      console.log('Syncing with CouchDB...');
      db.businesses.syncCouchDB({remote: `${syncUrl}/businesses`});
      db.articles.syncCouchDB({remote: `${syncUrl}/articles`});
    }
  });
};
