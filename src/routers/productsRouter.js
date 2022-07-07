const express = require('express');
const debug = require('debug')('app:productsRouter');
const { MongoClient } = require('mongodb');
const products = require('../data/products.json');

const prodcuctsRouter = express.Router();

prodcuctsRouter.route('/').get((req, res) => {
  const url =
    'mongodb+srv://dbUser:sa@globomantics.ywz2mwf.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'globomantics';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      // const response = await db.collection('products').insertMany(products);
      // res.json(response);
      const products = await db.collection('products').find().toArray();

      res.render('products', { products });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});
// prodcuctsRouter.route('/').get((req, res) => {
//   res.render('products', {
//     products,
//   });
// });

prodcuctsRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  res.render('product', {
    product: products[id],
  });
});

// prodcuctsRouter.route('/:id').get((req, res) => {
//   const id = req.params.id;
//   const url =
//   'mongodb+srv://dbUser:7SMwFS96AyJWtPKq@globomantics.ywz2mwf.mongodb.net/?retryWrites=true&w=majority';
//   const dbName = 'globomantics';

//   (async function mongo() {
//     let client;
//     try {
//       client = await MongoClient.connect(url);
//       debug('Connected to the mongo DB');

//       const db = client.db(dbName);

//       const product = await db
//         .collection('products')
//         .findOne({ _id: new (id) });

//       res.render('product', {
//         product,
//       });
//     } catch (error) {
//       debug(error.stack);
//     }
//     client.close();
//   })();
// });

module.exports = prodcuctsRouter;
