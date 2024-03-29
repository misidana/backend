const router = require("express").Router();
const User = require("../models/userModel");
const History = require("../models/historyModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;
    const refferer = req.query.refferer;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    if (refferer) {
      const existingRefferer = await User.findOne({ username: refferer });

      if (existingRefferer) {
        await User.updateOne(
          { username: refferer },
          { $push: { reffereers: username } }
        );

        await History.create({
          username: refferer,
          title: "Refferal",
          description: `User ${username} uses your referral link`,
        });
      }
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = {
      username,
      email,
      phoneNumber,
      password: hashedPassword,
      refferer: refferer ? refferer : null, //pengirim undangan
    };

    // Save the user using user.create()
    const newUser = await User.create(user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Find the user by username or email
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { password: userPassword, ...rest } = user._doc;

    // Create a JWT token without expiry
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );

    // Send the token to the client
    res.status(200).json({
      token: token,
      result: rest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
