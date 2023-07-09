const express = require("express");
const mongoose = require("mongoose");
const { productModel } = require("../models/product.js");
const { userModel1 } = require("../models/user.js");

const router = express.Router();

// controller for products and users

// get all products and specific documents///////////////////////////////////////////////////////////////////////

router.get("/products", async (req, res) => {
  try {
    const body = req.body;
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    const minRating = req.query.minRating;
    const maxRating = req.query.maxRating;

    const query = {};
    if (req.query.genre) {
      query.genre = { $in: req.query.genre };
    }

    const projection = { _id: 1, title: 1, price: 1, category: 1, rating: 1 };
    const data = await productModel
      .find(query, projection)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});
//post product 
router.post("/products/", async (req, res) => {
  try {
    const newProduct = new productModel({
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      rating: req.body.rating,
    });
    const data = await newProduct.save().catch((err) => {
      console.log(err);
      res.sendError(err);
    });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});
// update product
router.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const data = await productModel
      .updateOne({ _id: id }, body)
      .catch((err) => {
        console.log(err);
        res.sendError(err);
      });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// delete product by id
router.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await productModel.deleteOne({ _id: id }).catch((err) => {
      console.log(err);
      res.sendError(err);
    });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});


// get all users and the specific documents
router.get("/users", async (req, res) => {
  try {
    const body = req.body;
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 2;
    const minRating = req.query.minRating;
    const maxRating = req.query.maxRating;

    const query = {};
    if (req.query.genre) {
      query.genre = { $in: req.query.genre };
    }

    const projection = {
      _id: 1,
      name: 1,
      age: 1,
      address: 1,
      cart: 1,
      rating: 1,
    };
    const data = await userModel1
      .find(query, projection)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

// post user
router.post("/users", async (req, res) => {
  try {
    const newUser = new userModel1({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      address: req.body.address,
      cart: req.body.cart,
    });
    const data = await newUser.save().catch((err) => {
      console.log(err);
      res.sendError(err);
    });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// update user by id 
router.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const data = await userModel1.updateOne({ _id: id }, body).catch((err) => {
      console.log(err);
      res.sendError(err);
    });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// delete  user by id
router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await userModel1.deleteOne({ _id: id }).catch((err) => {
      console.log(err);
      res.sendError(err);
    });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// the user add products to the cart 
router.put("/users/:userid/:productid", async (req, res) => {
  try {
    const userId = req.params.userid;
    const productId = req.params.productid;

    const updatedUser = await userModel1
      .findOneAndUpdate(
        { _id: userId, "cart._id": { $ne: productId } },
        { $push: { cart: { _id: productId } } },
        { new: true }
      )
      .populate("cart._id", "title");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ error: "User not found or product already in cart" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

module.exports = router;
