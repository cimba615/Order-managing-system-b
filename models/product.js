const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const productsSchema = new mongoose.Schema({
  number: {
    type: Number,
    default: 1
  },
  altnum: {
    type: Number,
    default: 1
  },
  name: {
    type: String,
    default:'$'
  },
  avatar: {
    type: String
  },
  origin: {
    type: String
  },
  amount: {
    type: String
  },
  price: {
    type: Number,
    default:0
  },
  saleprice: {
    type: Number,
    default:0
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  currency: {
    type: String,
    default:"$"
  }
});

module.exports = mongoose.model("Products", productsSchema);
