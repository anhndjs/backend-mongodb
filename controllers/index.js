const userController = require('./userController');
const storyController = require('./storyController');

module.exports = {
  ...userController,
  ...storyController,
};
