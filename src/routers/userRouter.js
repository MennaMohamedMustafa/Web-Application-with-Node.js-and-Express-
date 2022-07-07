const express = require('express');
const debug = require('debug')('app:userRouter');
const { MongoClient } = require('mongodb');
const users = require('../data/users.json');

const userRouter = express.Router();

userRouter.route('/').get((req, res) => {
  const url =
    'mongodb+srv://dbUser:sa@globomantics.ywz2mwf.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'globomantics';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      // const response = await db.collection('users').insertMany(users);
      // res.json(response);
      const users = await db.collection('users').find().toArray();

      res.render('users', { users });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

userRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  res.render('user', {
    user: users[id],
  });
});

module.exports = userRouter;
