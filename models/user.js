const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number },
  address: { type: String, required: true },
  cart: [productSchema],
});
const userModel1 = mongoose.model("users", userSchema, "usersdb");
module.exports = {
  userModel1,
};
