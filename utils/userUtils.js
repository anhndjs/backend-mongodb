const bcrypt = require('bcrypt');

async function hashPassWord(password) {
  const hashPw = await bcrypt.hash(password, saltRounds = 10);
  return hashPw;
}

async function comparePassWord(passwordInput, hashPassWords) {
  const match = await bcrypt.compare(passwordInput, hashPassWords);
  return match;
}

module.exports = {
  hashPassWord,
  comparePassWord,
};
