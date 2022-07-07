const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();
const sessionsRouter = require('./src/routers/sessionsRouter');
const productsRouter = require('./src/routers/productsRouter');
const homeRouter = require('./src/routers/homeRouter');
const adminRouter = require('./src/routers/adminRouter');
const userRouter = require('./src/routers/userRouter');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

//Routers Section
app.use('/sessions', sessionsRouter);
app.use('/products', productsRouter);
app.use('/home', homeRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);


app.get('/', (req, res) => {
    res.render('index', { title: 'Globomantics', data: ['a', 'b', 'c'] });
  });

app.get('/', (req, res) => {
    res.send('Hello from my app');
  });
  
  app.listen(PORT, () => {
   //console.log(`listening on port ${chalk.red('3000')}`);
   debug(`listening on port ${chalk.red(PORT)}`);
});
