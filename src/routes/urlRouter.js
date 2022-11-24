const express = require('express');
const urlController = require('../controller/urlController');
const authorsController = require('../controller/authorsController');

const router = express.Router();

router.route('/:id')
  .delete(urlController.deleteUrl);
router
  .route('/')
  .post(urlController.createUrl);
// router.route('/link/:shortlink')
//   .get(authorsController.protect, urlController.getLink);
module.exports = router;
