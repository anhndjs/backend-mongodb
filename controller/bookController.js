const { faker } = require('@faker-js/faker');
const _ = require('lodash');
const { Book, Author } = require('../models');

async function createBook() {
  try {
    const authors = await Author.find({}, { name: 0, age: 0 });
    const bookInput = [];
    _.fill(Array(5), 0).forEach(() => {
      const Idlist = [];
      for (let i = 0; i < _.random(3, 5); i += 1) {
        Idlist.push(_.sample(authors, _.random(3, 5)));
      }
      bookInput.push({ title: faker.lorem.words(), author: Idlist });
    });
    const books = await Book.create(bookInput);
  } catch (error) {
    throw new Error(error.message);
  }
}

// usually use in query
// $in, $ne, $lte, $lt, $gte, $gt.$nin, $set, $unset;
// async function popuLate() {
//   const Books = await Book.find({}, 'author').populate('author');
//   // console.log(Books);
// }

async function getBook(bookId) {
  const book = await Book.findById(bookId).select('author').lean();
  if (!book) {
    return null;
  }

  const { author: authorIds } = book;

  const authors = await Author.find({ _id: { $in: authorIds } }).lean();

  return authors;
}

module.exports = {
  createBook,
  getBook,
};
