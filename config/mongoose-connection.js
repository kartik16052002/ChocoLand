const mongoose = require('mongoose');
const dbgr = require('debug')("development:mongoose");

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/scatch";

mongoose
.connect(mongoUri)
.then(function(){
    dbgr("Connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;
