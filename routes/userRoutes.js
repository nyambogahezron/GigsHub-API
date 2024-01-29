const express = require('express');
const router = express.Router();

const {
  createCompany,
  updateCompany,
  deleteCompany,
  getSingleCompany,
} = require('../controllers/userController');

const { authenticateUser } = require('../middleware/authentication');

router.route('').post(authenticateUser, createCompany);
router
  .route('/:id')
  .patch(authenticateUser, updateCompany)
  .delete(authenticateUser, deleteCompany)
  .get(getSingleCompany);

module.exports = router;
