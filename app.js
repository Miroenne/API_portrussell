const express             = require('express');
const path                = require('path');
const cookieParser        = require('cookie-parser');
const logger              = require('morgan');
const cors              = require('cors');
const methodOverride    = require('method-override');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catwaysRouter = require('./routes/catways');
const mongodb = require('./db/mongo');

mongodb.initClientConnection();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && req.body._method){
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use('/catways/', catwaysRouter);

app.use(function(req, res, next){
    res.status(404).json({name: 'API_portrussell', version: '1.0.0', status: 404, message: 'not_found'});
});

module.exports = app;
