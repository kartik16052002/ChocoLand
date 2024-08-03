const mongoose = require('mongoose');
const dbgr = require('debug')("development:mongoose");



mongoose
.connect("mongodb+srv://kartikchoudhary1605:kartik@chocoland.e388uu8.mongodb.net/?retryWrites=true&w=majority&appName=chocoland")
.then(function(){
    dbgr("Connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;
