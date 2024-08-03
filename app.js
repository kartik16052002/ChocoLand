const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

const db = require('./config/mongoose-connection');

const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index');

const expressSession = require('express-session');
const flash = require('connect-flash');

const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash());

app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));

app.use("/",indexRouter);
app.use("/owners",ownersRouter);
app.use("/products",productsRouter);
app.use("/users",usersRouter);

//  $env:NODE_ENV="development"
// OZRM1j1qcwDChTWm
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
