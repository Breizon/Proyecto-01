const { response } = require('express');
const User = require('../models/user.model');

exports.register = async (req, res = response) => {
  try {
    const { name, password } = req.body;

    let number = 999999 - 100000 + 1 + 100000;

    let accountNumber = Math.floor(Math.random() * number);

    const amount = 1000;

    const newUser = await User.create({
      name,
      accountNumber,
      password,
      amount,
    });

    res.status(201).json({
      status: 'success',
      message: 'The user was created successfully',
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.login = async (req, res = response) => {
  try {
    const { accountNumber, password } = req.body;

    const user = await User.findOne({
      where: {
        status: true,
        accountNumber,
        password,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'Error',
        message: 'User is not register',
      });
    }

    res.status(201).json({
      status: 'success',
      message: 'The user has successfully logged in.',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

// exports.getHistory = async (req, res) => {
//   const history = await User.findOne({
//     where: {
//       id,
//       status: true,
//     },
//   });

//   res.status(200).json({
//     status: 'success',
//     message: 'Users was found successfully',
//     history,
//   });
// };
