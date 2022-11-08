const mongoose = require('mongoose')
const { Story, Person } = require("../backend-mongodbb/user")
require('./mongodb')
mongoose.connect("mongodb+srv://test:123qweasd@sandbox.sl1r9.mongodb.net/natourss?retryWrites=true")

async function author() {
  const author = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: 'Ian Fleming',
    age: 50
  });

  author.save(function (err) {
    if (err) return handleError(err);

    const story1 = new Story({
      title: 'Casino Royale',
      author: author._id    // assign the _id from the person
    });

    story1.save(function (err) {
      if (err) return handleError(err);
      // that's it!
    });
  })
};
// author();