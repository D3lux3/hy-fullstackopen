const config = require('./utils/config');
const express = require('express');
require('express-async-errors')
const app = express();
const blogsRouter = require('./controllers/blogs');
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
mongoose.set('useCreateIndex', true);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter);

module.exports = app;