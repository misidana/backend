const mongoose = require("mongoose");

// Skema untuk model pengguna
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Pastikan setiap username adalah unik
  },
  email: {
    type: String,
    required: true,
    unique: true, // Pastikan setiap email adalah unik
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: null, // Nilai default adalah null
  },
  country: {
    type: String,
    default: null, // Nilai default adalah null
  },
});

// Membuat model pengguna dari skema
const User = mongoose.model("User", userSchema);

module.exports = User;
