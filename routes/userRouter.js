const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();
router.route('/').get(userController.getUsers);
router.route('/:id').get(userController.getUser);
router.route('/login').post(userController.loGin);
router.route('/singup').post(userController.createUser);
router.route('/forgotPassword').post(userController.forgotPassword);
router.route('/updatePassword/:id').patch(userController.updatePassword);
router.route('/disableUser/:id').delete(userController.disaBle);
// router.route('/logout').post(userController.logout);
module.exports = router;
