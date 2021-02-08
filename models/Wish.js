  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: "user" },
  products: { type: [], required: false },
  create_date: { type: Date, default: Date.now },
});

module.exports = User = mongoose.model("wish", WishSchema);