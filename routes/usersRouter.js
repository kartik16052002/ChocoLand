const express = require('express');
const router = express.Router();
const {registerUser,loginUser,logoutUser} = require('../controller/authControllers');

router.get('/',function(req,res){
    res.send("Hey its Working userRouter!");
})

router.post("/register", registerUser);

router.post("/login",loginUser);

router.get("/logout",logoutUser);

module.exports = router;