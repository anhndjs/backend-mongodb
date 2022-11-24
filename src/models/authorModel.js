const mongoose = require('mongoose');

const { Schema } = mongoose;

const AuthorSchema = Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model('author', AuthorSchema);
