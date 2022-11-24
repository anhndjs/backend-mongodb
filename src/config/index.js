const db = require('./db');
const redis = require('./redis')
module.exports = {
  ...db,
  ...redis
};
