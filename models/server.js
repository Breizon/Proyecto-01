const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const { usersRouter } = require('../routes/user.routes');
const { transfersRouter } = require('../routes/transfer.routes');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 2000;

    this.paths = {
      users: '/api/v1/users',
      transfers: '/api/v1/transfer',
    };

    this.database();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.transfers, transfersRouter);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticate'))
      .catch(err => console.log(err));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
