// load up the express framework and body-parser helper
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();


const app = express();


const fs = require('fs');



// configure our express instance with some body-parser settings 
// including handling JSON data
app.use(cors(
  {
  // origin: process.env.WFAPI_CORS
  origin:[
    process.env.CORSWFLOCAL, 
    process.env.CORSWFWEB, 
    process.env.WFAPI_CORS,
    process.env.CORSPORTFOLIO]
}
));
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is where we'll handle our various routes from
const routes = require('./routes/routes.js')(app, fs);


const server = app.listen(process.env.PORT, () => {
  console.log('listening on port %s...', server.address().port);
});

