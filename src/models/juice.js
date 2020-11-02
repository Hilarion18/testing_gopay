const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var juiceSchema = new Schema(
  {
    name: {
      type: String,
    },
    picture: {
      type: String
    },
    price: {
        type: Number
    },
    quantity: {
      type: Number
    },
    paid: {
      type: Boolean
    },
  },
  {
    timestamps: true
  }
);

const Juice = mongoose.model("Juice", juiceSchema);

module.exports = Juice;
