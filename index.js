const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/userRoute");
const historyRoute = require("./routes/historyRoute");
const verifyToken = require("./middlewares/verifyToken");

const connectDB = mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("• Auth Features is Complete", "• Refferarl System is Complete");
});

app.use(userRoute);
app.use("/history", verifyToken, historyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
