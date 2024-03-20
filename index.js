const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/userRoute");
const historyRoute = require("./routes/historyRoute");
const verifyToken = require("./middlewares/verifyToken");

dotenv.config();

// Connect to MongoDB using async/await
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dana:fowrQ2yqc3L3QJk7@clone-p.xz9q17j.mongodb.net/Clone-p?retryWrites=true&w=majority&appName=Clone-p"
    );
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err);
  }
};

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("• Auth Features is Complete", "• Refferarl System is Complete");
});

app.use(userRoute);
app.use("/history", verifyToken, historyRoute);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
