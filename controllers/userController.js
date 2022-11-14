const faker = require('faker');

const { User } = require('../models');

async function createUser() {
  try {
    const userInput = {
      age: faker.datatype.number(),
      name: faker.internet.userName(),
    };

    const user = await User.create(userInput);
    console.log(user);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateUser() {
  try {
    const user = await User.findByIdAndUpdate('6368b689442886fcf1feb899', { name: 'bb' }, { new: true, upsert: true }).select('name').lean();
    console.log(user);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUsers() {
  try {
    const users = await User.find().select('name').lean();
    console.log(users);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
};
