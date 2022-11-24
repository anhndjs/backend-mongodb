const { User } = require('../models');

async function getallUser(req, res, next) {
  try {
    const user = await User.find();
    res.status(200).json({ isSuccess: true,
      requestedAt: req.requestTime,
      results: user.length,
      user });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getIdUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      isSuccess: true, user,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({ isSuccess: true, data: null });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ isSuccess: true, user });
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getallUser,
  getIdUser,
  deleteUser,
  updateUser,
};
