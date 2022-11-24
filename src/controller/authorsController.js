const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { User } = require('../models');
const Apperror = require('../util/appError');

const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN,
});

async function createUser(req, res, next) {
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  // kiem tra email va mat khau co ton tai k
  if (!email || !password) {
    return next(new Apperror('Lam on dien email mat khau', 400));
  }
  // 2 kiem tra nguoi dung co ton tai mat khau khong
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new Apperror('ket noi email hoac mat khau that bai', 401));
  }
  // 3 neu moi thu dieu on goi token cho client
  const token = signToken(user._id);
  res.status(200).json({
    isSuccess: true,
    data: {
      token,
    },
  });
}

async function proTect(req, res, next) {
  let token;
  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new Apperror('Ban chua dang nap! lam on hay dang nhap', 401),
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // kiem tra nguoi dung con ton tai khong
  const freshuser = await User.findById(decoded.id);
  if (!freshuser) {
    return next(
      new Apperror(
        'The user  belonging to this token does no longer exist',
      ),
    );
  }
  // kiem tra nguoi dung da doi mat khau chua
  next();
}
module.exports = {
  createUser,
  login,
  proTect,
};
