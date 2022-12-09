const _ = require('lodash');
const AppError = require('http-errors');
const jwt = require('jsonwebtoken');
const { hashPassWord, comparePassWord, createAccessToken, cookieOptions } = require('../utils');
const sendEmail = require('../utils/email');
const User = require('../models/User');
const { redis } = require('../redis/connect');

async function getUsers(req, res) {
  try {
    const { id, firstName } = req.body;
    const filter = {};

    if (id) {
      filter._id = id;
    }

    if (firstName) {
      filter.firstName = firstName;
    }

    const users = await User.find(filter).lean();

    res.status(200).json({
      isSuccess: true,
      users,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUser(req, res) {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ isSuccess: false });
    }
    const user = await User.findById().lean();
    return res.status(200).json({
      isSuccess: true,
      user,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createUser(req, res) {
  const input = req.body;

  const { password } = input;

  const hashPw = await hashPassWord(password);

  const user = await User.create({ ...input, password: hashPw });

  res.status(201).json({
    isSuccess: true,
    user: _.omit(user, 'password'),
  });
}

async function loGin(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ $and: [{ email }, { isDelete: { $ne: false } }] });
    if (!user) {
      return next(AppError(401, 'user not found'));
    }

    const checkUser = await redis.hGet(`id:${user._id}`, 'name');

    if (checkUser) {
      return res.status(201).json({
        isSuccess: true,
        user: _.omit(user, 'password'),
      });
    }

    const hashPassWords = user.password;
    const match = await comparePassWord(password, hashPassWords);
    if (!match) {
      return next(AppError(401, 'in correct password'));
    }
    const token = createAccessToken(user);
    const { _id, lastName } = jwt.decode(token);
    await redis.hSet(`id:${_id}`, 'name', lastName);
    res.cookie('jwt', token, cookieOptions);

    res.status(201).json({
      isSuccess: true,
      token,
      user: _.omit(user, 'password'),
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function forgotPassword(req, res, next) {
  const { email } = req.body;
  const user = await User.findOne({ email }).lean();
  if (!user) {
    return next(AppError(401, 'user not found'));
  }
  const resetToken = createAccessToken(user);
  const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;
  const message = `forgot your password? submit  a patch request with your new password and passwordConfirm to:${resetURL}.\n if you didn't forget your password, please ignore this email`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'your password reset token (valid for 10 min)',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',

    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(AppError('there was an error sending the email, try again later '), 500);
  }

  return next();
}

async function updatePassword(req, res, next) {
  try {
    const { id } = req.params;
    const passwords = req.body.password;
    const hashPassword = await hashPassWord(passwords);
    const userPassword = await User.findByIdAndUpdate({ _id: id }, { hashPassword }, { new: true });
    return res.status(200).json({ isSuccess: true, data: userPassword });
  } catch (error) {
    return next(AppError(400, 'Error Occured'));
  }
}

async function disaBle(req, res) {
  await User.findByIdAndUpdate(req.params.id, { isDelete: false });
  await redis.del(`id:${req.params.id}`);
  res.status(204).json({
    status: 'success',
    data: null,
  });
}
module.exports = {
  getUsers,
  getUser,
  createUser,
  loGin,
  forgotPassword,
  updatePassword,
  disaBle,
};
