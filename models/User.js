const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = Schema({
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
});

module.exports = mongoose.model('user', UserSchema);
