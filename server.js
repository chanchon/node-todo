// set up ======================================================================
const express = require('express');
const app = express(); 						// create our app w/ express
const mongoose = require('mongoose'); 				// mongoose for mongod 				
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// configuration ===============================================================
// Connect to MongoDB



mongoose.Promise = global.Promise;
const promise = mongoose.connect('mongodb://mongo:27017/node-todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
promise.then(function(db) {
    console.log("Connected to database!!!");
}, function(err){
    console.log("Error in connecting database " + err);
});

app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


const port = 3000;

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);




