const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const posts = require('./routes/api/posts');

//bodyparser middleware
app.use(bodyParser.json());

//database config
const db = require('./config/keys').mongoURI;

//connect mongoose
//connect to mongo
mongoose
    .connect(db)
    .then(() => console.log('Database connected..'))
    .catch(err => console.log(err));

//use routes
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));