var express = require('express');
var	bodyParser = require('body-parser')
var partials = require('express-partials');
var path = require('path');

var app = express(); 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router(); 
var routes = require('./routes/index.js');
var login = require('./routes/login.js');
var forums = require('./routes/forums.js');
var data = require('./routes/data.js')


app.use(router);
router.use(function(req, res, next) {
  // do logging
  console.log('Realizando petición');
  next(); // make sure we go to the next routes and don't stop here
});
router.get('/',routes.index);
router.get('/index',routes.index);
router.post('/connect', login.getToken);
router.post('/forums', forums.getForums);
router.post('/rapid', data.sendData);

module.exports = app;
