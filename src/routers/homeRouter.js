const express = require('express');

const homeRouter = express.Router();


// homeRouter.route('/').get((req,res)=>
// {
//   res.send('home page')
// });

homeRouter.route('/').get((req,res)=>
{
  res.render('home')
});

module.exports = homeRouter;
