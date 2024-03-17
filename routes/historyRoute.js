const router = require("express").Router();
const History = require("../models/historyModel");

router.get("/list", async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const history = await History.find({ username: user.username });
    res.status(200).json({ result: history });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
