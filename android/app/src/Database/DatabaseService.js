import {initDB} from './Database';
import {v4 as uuidv4} from 'uuid';

let dbInstance;

export const getDB = async () => {
  if (!dbInstance) {
    dbInstance = await initDB();
  }
  return dbInstance;
};

// Add a new Business
export const addBusiness = async name => {
  console.log('name in db', name);
  const db = await getDB();
  console.log('dgf2', db);
  if (!db.businesses) {
    console.error('⚠️ Database not initialized properly!');
    return;
  }
  console.log('dgf', db);
  return db.businesses.insert({
    id: uuidv4(),
    name,
  });
};

// Fetch all Businesses
export const getBusinesses = async () => {
  const db = await getDB();
  const businesses = await db.businesses.find().exec();
  console.log(businesses.map(b => b.toJSON()));
  return db.businesses.find().exec();
};

// Add a new Article
export const addArticle = async (title, content, businessId) => {
  const db = await getDB();
  return db.articles.insert({
    id: uuidv4(),
    title,
    content,
    businessId,
  });
};

// Fetch all Articles related to a Business
export const getArticlesForBusiness = async businessId => {
  const db = await getDB();
  return db.articles.find({selector: {businessId}}).exec();
};
