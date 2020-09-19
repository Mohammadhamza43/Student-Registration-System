const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('./db/db');

const usersRouter = require('./routes/users');
const studentsRouter = require('./routes/student');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/students', studentsRouter);


const sectionRouter = require('./routes/section');
app.use('/section', sectionRouter);

const courseRouter = require('./routes/course');
app.use('/course', courseRouter);

const studentRouter = require('./routes/student');
app.use('/student', studentRouter);

const infoRouter = require('./routes/studentMaster');
app.use('/info', infoRouter);

module.exports = app;
