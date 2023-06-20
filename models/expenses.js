const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const expensesSchema = new mongoose.Schema({
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
    required:true
  },
  currency: {
    type: String,
    default: "$"
  },
  total: {
    type: Number,
    required:true
  },
  payment: {
    type: Number,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Expenses", expensesSchema);
