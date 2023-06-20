const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const casheirSchema = new mongoose.Schema({
  total: {
    type: Number,
    default: true,
  }
});

module.exports = mongoose.model("Casheirs", casheirSchema);
