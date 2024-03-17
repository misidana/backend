const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
