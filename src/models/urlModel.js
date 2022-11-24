const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema(
  {
    short: { type: String, required: true },
    full: { type: String, required: true },

    clicks: { type: Number, default: 0 },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'author' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('url', UrlSchema);
