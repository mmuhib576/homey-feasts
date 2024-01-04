const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    debitPayment: {
        cardNumber: Number,
        cvv: Number,
      },
      creditPayment: {
        cardNumber: Number,
        cvv: Number,
      },
      interactPayment: {
        interactId: String,
      },
      paymentDate: {
        type: Date,
        default: Date.now,
      },
  },
  
);

const paymentModel = mongoose.model("Payment", paymentSchema);

module.exports = paymentModel;
