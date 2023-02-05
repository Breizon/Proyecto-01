const { Router } = require('express');
const {
  register,
  login,
  getHistory,
} = require('../controllers/user.controller');

const router = Router();

router.post('/signup', register);

router.post('/login', login);

// router.get('/:id/history', getHistory);

module.exports = {
  usersRouter: router,
};
