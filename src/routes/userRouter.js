const express = require('express');
const userController = require('../controller/userController');
const authorsController = require('../controller/authorsController');

const router = express.Router();
router
  .route('/login')
  .post(authorsController.login);
router
  .route('/')
  .get(authorsController.proTect, userController.getallUser)
  .post(authorsController.createUser);
router
  .route('/:id')
  .get(userController.getIdUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
