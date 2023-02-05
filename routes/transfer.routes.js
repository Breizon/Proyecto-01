const { Router } = require('express');
const { newTransfer } = require('../controllers/transfer.controller');

const router = Router();

router.post('', newTransfer);

module.exports = {
  transfersRouter: router,
};
