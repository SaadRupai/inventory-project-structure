const express = require('express');
const app = express();
const helmet = require('helmet');
const momngoose = require('mongoose');
require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const { readdirSync } = require('fs');
const { default: mongoose } = require('mongoose');


// middlewares
app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());


// DB connection
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("DB connected successfully!"))
    .catch((err) => console.log("DB error : ", err));


// routes middleware
readdirSync('./routes').map(r => app.use('/api/v1', require(`./routes/${r}`)));


// server
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App is running on port :  ${port}`);
});