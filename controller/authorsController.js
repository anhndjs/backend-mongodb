// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
// const { promisify } = require('util');
// const AppError = require('http-errors');
// const { User } = require('../models');
// const sendEmail = require('../utils/email');
// const { redis } = require('../redis/connect');

// async function createUser(req, res) {
//   const newUser = await User.create(req.body);
//   // await redis.set(String(_id), token);
//   createSendToken(newUser, 201, res);
// }

// async function login(req, res, next) {
//   const { email, password } = req.body;

//   if (!email || !password) {   // kiem tra email va mat khau co ton tai k
//     return next(AppError(400, 'Please enter password'));
//   }
//   // 2 kiem tra nguoi dung co ton tai mat khau khong
//   const user = await User.findOne({ email }).select('+password');
//   if (!user || !(await user.correctPassword(password, user.password))) {
//     return next(AppError(401, 'email connection or password failed'));
//   }
//   const token = signToken(user._id);
//   const { _id, name, role } = user;
//   await redis.hSet(String(_id), ['token', token, 'email', String(email), 'username', String(name), 'role', String(role)]);
//   // 3 neu moi thu dieu on goi token cho client
//   createSendToken(user, 201, res);
// }

// async function Protect(req, res, next) {
//   let token;
//   if (
//     req.headers.authorization
//     && req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }
//   if (!token) {
//     return next(AppError(401, 'you are not logged in please login'));
//   }

//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//   // kiem tra nguoi dung con ton tai khong
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return next(AppError('The user  belonging to this token does no longer exist'));
//   }
//   // kiem tra nguoi dung da doi mat khau chua
//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(AppError(401, 'Password has been reset, please login again'));
//   }

//   // Grant access to protected Route
//   req.user = currentUser;
//   next();
//   em gọi
// }

// async function restrictTo(...roles) {
//   try {
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         return next(AppError(403, 'you do not have permission to perform this action'));
//       }
//       next();
//     };
//   } catch (error) {
//     throw new AppError(error.message);
//   }
// }

// async function ForgotPassword(req, res, next) {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return next(AppError(404, 'there is no user with email address'));
//   }
//   // 2) Generate the random reset token
//   const resetToken = user.createPasswordResetToken();
//   await user.save({ validateBeforeSave: false });
//   // 3) send it to user's email
//   const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;
//   const message = `forgot your password? submit  a patch request with your new password and passwordConfirm to: ${resetURL}.\n if you didn't forget your password, please ignore this email`;
//   try {
//     await sendEmail({
//       email: user.email,
//       subject: 'your password reset token (valid for 10 min)',
//       message,
//     });
//     res.status(200).json({
//       status: 'success',
//       message: 'Token sent to email!',

//     });
//   } catch (err) {
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave: false });
//     return next(AppError(500, 'there was an error sending the email, try again later '));
//   }
// }

// async function ResetPassword(req, res, next) {
//   // lấy token của user
//   const hashedToken = crypto
//     .createHash('sha256')
//     .update(req.params.token)
//     .digest('hex');

//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });
//   // nếu token còn thoiwfhanj thì cập nhập mk cho user
//   if (!user) {
//     return next(AppError(400, 'Token in valid or has expired'));
//   }
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();

//   createSendToken(user, 201, res);
// }

// async function updatePassword(req, res, next) {
//   // laays id user
//   const user = await User.findById(req.user.id).select('+password');

//   // 2 kiem tra nhap mk cua tai khoan dung chua
//   if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
//     return next(AppError(401, 'your current password is wrong'));
//   }
//   // 3) neu dung update password
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   await user.save();
//   // user.findbyidandupdate wil work as intended

//   // 4) dang nhap laij va goi token
//   createSendToken(user, 200, res);
// }
// module.exports = {
//   createUser,
//   Login,
//   Protect,
//   restrictTo,
//   ForgotPassword,
//   ResetPassword,
//   updatePassword,
// };
