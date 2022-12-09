const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  role: { type: String, enum: ['Other', 'Admin'], default: 'Admin' },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: true, select: false },
  userUrl: [{ type: Schema.Types.ObjectId, ref: 'url' }],
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema);
