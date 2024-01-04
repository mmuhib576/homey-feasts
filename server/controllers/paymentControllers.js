const paymentModel = require("../models/paymentModel");

const createPayment = async (req, res) => {
  try {
    const newPayment = new paymentModel(req.body);

    await newPayment.save();
    res.status(201).json({
      success: true,
      newPayment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentModel.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createPayment, getAllPayments };
