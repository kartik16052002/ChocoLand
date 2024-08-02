const mongoose = require('mongoose');
const dbgr = require('debug')("development:mongoose");

const mongoUri = process.env.MONGODB_URI;

mongoose
.connect(mongoUri)
.then(function(){
    dbgr("Connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;
