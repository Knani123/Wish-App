const express = require("express");
const app = express();
require("dotenv").config();

////connect to database
const connectDB = require("./helpers/connectDB");
connectDB();
//body parser Middleware
app.use(express.json());
//register
app.use("/register", require("./routes/register"));
//login
app.use("/login", require("./routes/login"));
//wish
app.use("/wish", require("./routes/wish"));
//wish
app.use("/product", require("./routes/product"));

const Port = process.env.PORT || 8000;
app.listen(Port, (err) => {
  if (err) {
    throw err.message;
  } else {
    console.log(`Server is running on port ${Port}`);
  }
});