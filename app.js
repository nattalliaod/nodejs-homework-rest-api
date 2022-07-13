const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { rateLimit } = require('./middlewares');

const app = express();

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');

const { HTTP_STATUS_CODE } = require('./libs/constants');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// Apply the rate limiting middleware to all requests
app.use(rateLimit(15 * 60 * 100, 100));

app.use(helmet());
app.use(logger(formatsLogger));
app.use(express.static(process.env.STATIC_FOLDER));
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
    status: 'error',
    code: HTTP_STATUS_CODE.NOT_FOUND,
    message: "Use routes: '/api/contacts' or '/api/auth/' or '/api/users'",
    payload: 'Not found',
  });
})

app.use((err, req, res, next) => {
  res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    message: err.message
  });
})

module.exports = app;
