const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')("developement:mongoose");

mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function(){
    dbgr("Connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;