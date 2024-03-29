const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
let cors = require("cors");

const indexRouter = require('./routes/indexRoutes');
const usersRouter = require('./routes/userRoutes');
const restaurantsRouter = require('./routes/restaurantRoutes');
const foodsRouter = require('./routes/foodRoutes');
const ordersRouter = require('./routes/orderRoutes');
const commonsRouter = require('./routes/commonRoutes');
const initDb = require("./database/dbConnection").initDb;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.disable('etag');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/foods', foodsRouter);
app.use('/orders', ordersRouter);
app.use('/categories', commonsRouter);

initDb(function (err) {
    if (err) {
        throw err;
    }
    console.log("API Up and running!");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
