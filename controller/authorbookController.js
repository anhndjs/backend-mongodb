// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');
const _ = require('lodash');
// const Author = require('../models/authorModel');

async function createAuthors() {
  try {
    const authorInputs = [];
    const lenAuthor = _.random(1, 5);
    for (let index = 0; index < lenAuthor; index = +1) {
      authorInputs.push({ name: faker.name.fullName(), age: faker.datatype.number({ min: 23, max: 100 }) });
    }
    const author = await Author.insertMany(authorInputs);
    return author;
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = {
  createAuthors,
};
