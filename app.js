require('dotenv').config();
const express = require('express');
const { use } = require('./routes/userRouter');
const app = express();
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');

mongoose.connect('mongodb://localhost/client', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => { console.log('DB is running!') });


app.use('/user', express.json(), userRouter);

app.use('/admin', express.json(), adminRouter);

app.listen(process.env.PORT, () => { console.log('Server running') });
