require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const { errors } = require('celebrate');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
    '/songs',
    express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);
app.use(routes);
app.use(errors());

app.listen(process.env.PORT || 3333);
