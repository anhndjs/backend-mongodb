const { createClient } = require('redis');
const config = require('../config');

const redis = createClient();

redis.on('error', err => console.log('Redis Client Error', err));
redis.on('connect', err => console.log('Redis Client  connect'));

module.exports = {
  redis,
};
