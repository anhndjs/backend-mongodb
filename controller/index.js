const bookController = require('./bookController');
const authorController = require('./authorbookController');
const userController = require('./userController');
const urlController = require('./urlController');
const authorsController = require('./authorsController');

module.exports = {
  ...bookController,
  ...authorController,
  ...userController,
  ...urlController,
  ...authorsController,
};
