const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },
  category: { type: String },
  rating: { type: Number },
});
const productModel = mongoose.model("Product", productSchema, "products");
module.exports = {
  productModel,
};
