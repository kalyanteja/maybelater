
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');
  
  
var mongo = require('mongojs');
var monk = require('monk');
var db =  mongo.connect('kalyanteja:adlabs18@ds45107.mongolab.com:45107/laterdb1'); //monk('localhost:27017/laterdb1');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
    app.locals.pretty = true;
});

app.get('/', routes.index(db));
app.post('/', routes.post);
app.post('/addProc', routes.addProc(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

