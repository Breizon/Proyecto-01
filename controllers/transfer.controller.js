const { response } = require('express');
const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

exports.newTransfer = async (req, res = response) => {
  try {
    const { amount, accountNumber, senderUserId } = req.body;

    const userRx = await User.findOne({
      where: {
        id,
        status: true,
        accountNumber,
      },
    });

    const receiverUserId = userRx.id;

    const userTx = await User.findOne({
      where: {
        status: true,
        id: senderUserId,
      },
    });

    if (amount > userTx.amount) {
      return res.status(400).json({
        status: 'Error',
        message:
          'You do not have a sufficient amount to carry out the transaction.',
      });
    }

    if (senderUserId === receiverUserId) {
      return res.status(400).json({
        status: 'Error',
        message:
          'The account number received is the same! Please verify the recipient account number.',
      });
    }

    let newAmountUserMakeTransfer = amount - userTx;

    let newAmountUserReceiver = userRx + amount;

    await userTx.update({ amount: newAmountUserMakeTransfer });

    await userRx.update({ amount: newAmountUserReceiver });

    await Transfer.create({
      amount,
      senderUserId,
      receiverUserId,
    });

    res.status(201).json({
      status: 'success',
      message: 'The trasfers was created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
