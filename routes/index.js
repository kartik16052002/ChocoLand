const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const router = express.Router();


router.get("/",function(req,res){
    let error = req.flash("error");
    res.render("index",{error, loggedin : false});
})

router.get("/shop",isLoggedIn,async function(req,res){
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop",{products, success});
})


router.get("/cart", isLoggedIn, async function(req, res){
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");

    if (!user || !user.cart || user.cart.length === 0) {
        req.flash("error", "No items in cart");
        return res.redirect("/shop");
    }

    let itemsWithBill = user.cart.map(item => {
        const bill = Number(item.price) - Number(item.discount) + 20; // assuming 20 is the platform fee for each item
        return { ...item.toObject(), bill }; // `toObject` converts mongoose document to plain JS object
    });

    res.render("cart", { user: { ...user.toObject(), cart: itemsWithBill } });
});



router.get("/addtocart/:id",isLoggedIn,async function(req,res){
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
})

router.get("/profile", isLoggedIn, async function(req, res) {
    try {
        const user = await userModel.findOne({ email: req.user.email });

        if (!user) return res.status(404).send('User not found');

        res.render("my-account", { user });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/profile/update-account", isLoggedIn, async function(req, res) {
    try {
        const { fullname, contact } = req.body;
        
        console.log("Updating user with:", { fullname, contact });

        const updateData = { fullname, contact };

        const user = await userModel.findOneAndUpdate(
            { email: req.user.email },
            updateData,
            { new: true }
        );

        if (!user) return res.status(404).send('User not found');

        res.redirect("/profile"); // Redirect to the account page to see updates
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;