const mongoose = require('mongoose');

const { Schema } = mongoose;

const StorySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
});

module.exports = mongoose.model('story', StorySchema);
