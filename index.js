const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const accountRouter = require('./src/router/accountRouter.js');
const requestRouter = require('./src/router/requestRouter.js');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//ROUTES-

app.use('/account', accountRouter);
app.use('/request', requestRouter);

//-ROUTES

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGO_DB_URI;

app.use(express.static(path.join(__dirname ,'/client/build')));
 app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname + '/client/build/index.html'))
 });

 mongoose.connect(CONNECTION_URL)
 .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
 .catch((error) => console.log(`${error} did not connect`));