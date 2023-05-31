require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const parser = require('cookie-parser');
const { errors } = require('celebrate');
const route = require('./routes');
const cors = require('./middlewares/cors');
const limiter = require('./utils/limiter');
const { InternalServerError } = require('./customErrors/InternalServerError');
const { requestLogger, errorLogger } = require('./middlewares/loggers');

const { PORT = 3000, BIT_FILM_DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();
mongoose.connect(BIT_FILM_DB);
app.use(bodyParser.json());
app.use(parser());
app.use(helmet());
app.use(requestLogger);
app.use(cors);
app.use(limiter);
app.use(route);
app.use(errorLogger);
app.use(errors());
app.use(InternalServerError);

app.listen(PORT);
