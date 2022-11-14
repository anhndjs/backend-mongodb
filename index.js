require('dotenv').config();
require('./config');

const { connectDB } = require('./models/connection');

const { createUser, getUsers, updateUser } = require('./controllers');

// IIFE
(async () => {
  await connectDB();

  // await createUser();
  await updateUser();
  // await getUsers();
})();
