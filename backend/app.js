const express = require('express');
const bodyParser = require('body-parser'); //Parse Request Body
const cors = require('cors'); // For Cross-Origin-request
const helmet = require('helmet'); //Secure express headers

const path = require('path');
require('dotenv').config();

// App Configuration Module
const router = require('./routes');
const db = require('./helpers/database');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json())

router.initialize(app);
const listeningPort = process.env.PORT ? process.env.PORT : 8080;

const server = app.listen(listeningPort, () => {
    console.log(`Server Listening on ${listeningPort}.!`);
});