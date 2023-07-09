const mongoose = require("mongoose");

const buyRequest = new mongoose.Schema({
  prodID: {
    type: String,
    required: [true, "Please Provide ID"],
  },
  Iname: {
    type: String,
    required: [true, "Please Provide Name"],
  },
  amount: {
    type: Number,
    required: [true, "Please Provide amount"],
  },
  price: {
    type: Number,
    required: [true, "Please Provide Price"],
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  rejected: {
    type: Boolean,
    default: false,
  },
  buyerName: {
    type: String,
    required: [true, "Please Provide Name"],
  },
  contact: {
    type: Number,
    required: [true, "Please Provide contact no."],
  },
  seller: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide seller"],
  },
  buyerAccount: {
    type: String,
    required: [true, "Please provide buyer account"],
  },
  buyer: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide buyer"],
  },
});

module.exports = mongoose.model("BuyReq", buyRequest);
