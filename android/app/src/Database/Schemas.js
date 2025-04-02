export const businessSchema = {
  title: 'business schema',
  description: 'Schema for storing business details',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
  },
  required: ['id', 'name'],
};

export const articleSchema = {
  title: 'article schema',
  description: 'Schema for storing articles',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
    qty: {type: 'number'},
    selling_price: {type: 'number'},
    business_id: {type: 'string'},
  },
  required: ['id', 'name', 'qty', 'selling_price', 'business_id'],
};
