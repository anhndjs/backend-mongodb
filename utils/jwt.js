const _ = require('lodash');
const jwt = require('jsonwebtoken');

function createAccessToken(user) {
  const payload = _.omit(user, 'password');
  return jwt.sign(payload.toObject(), process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

function cookieOptions() {
  const cookie = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  return cookie;
}

module.exports = {
  createAccessToken,
  cookieOptions,
};
