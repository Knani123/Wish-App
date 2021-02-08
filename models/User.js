  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  avatar: { type: String, required: false },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  adress: { type: String, required: false },
  create_date: { type: Date, default: Date.now },
});

module.exports = User = mongoose.model("user", UserSchema);