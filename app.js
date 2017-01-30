var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var moment = require('moment');
var pg = require('pg');
var pgp = require('pg-promise');

//conexion a mongo
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

//puerto 27017
//mongoose.connect('mongodb://:@http://ec2-34-198-193-118.compute-1.amazonaws.com/:27017/prueba1');
//var db = mongoose.connection;
//cpnexion postgress
var config = {
  user: 'devopsopti', //env var: PGUSER
  database: 'SHOptimisa', //env var: PGDATABASE
  password: 'eksiopco', //env var: PGPASSWORD
  host: 'shoptimisa.cxddakjgf8mw.us-west-2.rds.amazonaws.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
    //call `done()` to release the client back to the pool
  //client.query('INSERT INTO "Area" VALUES (4, 'Desarrollo4')')

//var post  = {id_area: 6, Descripcion: 'Hello MySQL'};
//console.log(post);
//var query = client.query('INSERT INTO "Area" (id_area, "Descripcion") VALUES ($1,$2)', [6, 'hola'], function(error, result) {
  // if (error) {
  //           console.log(error.message);
  //       } else {
  //           console.log('success');    
  //       }
  // // Neat!
});
//console.log(query); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
  // client.query('SELECT * FROM "Area";', function(err, result) {

    
  //   done();

  //   if(err) {
  //     return console.error('Error al ejecutar la consulta', err);
  //   // }else{
  //   //   return(result);
  //    }
  //   console.log(result);
  //   //output: 1
  // });
//});

var routes = require('./routes/index');
var users = require('./routes/users');

//init app

var app = express();

//view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// connect Flash
app.use(flash());

//Global Vars
// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Servidor en el puerto '+app.get('port'));
});
