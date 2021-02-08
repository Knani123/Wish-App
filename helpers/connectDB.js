  
const mongoose = require("mongoose");
require("dotenv").config();
const mongoURL =
  process.env.URL ||
  "mongodb+srv://yosri:yosri@astrolab.dgjti.mongodb.net/<dbname>?retryWrites=true&w=majority";
module.exports = connectDB = () => {
  mongoose.connect(
    mongoURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        throw err.message;
      } else {
        console.log("You are  well connected ");
      }
    }
  );
};