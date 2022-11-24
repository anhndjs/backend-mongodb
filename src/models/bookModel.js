const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = Schema({
  title: String,
  author: [{ type: Schema.Types.ObjectId, ref: 'author' }],
});

module.exports = mongoose.model('book', BookSchema);
