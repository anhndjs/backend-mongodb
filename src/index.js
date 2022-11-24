require('dotenv').config();
require('./config');

const express = require('express');
const { createBook, createAuthors, popuLate, getBook } = require('./controller');
const { userRouter, urlRouter } = require('./routes');
const { connectDB } = require('./models/connection');

const { redis } = require('./redis/connect');

const app = express();
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
// redis

// router;
app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/url', urlRouter);

// IIFE
(async () => {
  await connectDB();
  await redis.connect();
  await createAuthors();
  await createBook();
  await getBook('6374548019e0909da0cfd1f7');
})();
