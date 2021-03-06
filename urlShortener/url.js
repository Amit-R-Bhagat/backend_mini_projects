const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  long_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Url", urlSchema);
