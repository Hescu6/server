const req = require("request");
const fetch = require('node-fetch');
const wakeDyno = require("./wakeDyno");
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();


const app = express();


const fs = require('fs');

const dynoURL = 'https://hescu6server.herokuapp.com/';

// configure express instance & body-parser settings 
// handle JSON data
app.use(cors(
  {
  origin:[
    process.env.CORSWFLOCAL, 
    process.env.CORSWFWEB, 
    process.env.WFAPI_CORS,
    process.env.CORSPORTFOLIO,
    process.env.CORS_YAH]
}
));
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes handler feeds to all other routes
const routes = require('./routes/routes.js')(app, fs, fetch, req);


const server = app.listen(process.env.PORT, () => {
  wakeDyno(dynoURL);
  console.log('listening on port %s...', server.address().port);
});

