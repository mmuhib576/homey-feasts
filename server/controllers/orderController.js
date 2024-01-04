const orderModel = require("../models/OrderModel");

const createOrder = async (req, res) => {
  try {
    const { user, meals, totalPrice } = req.body;

    // Validate the request body
    if (!user || !meals || !totalPrice) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Create a new order
    const newOrder = new orderModel({
      user,
      meals,
      totalPrice,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json("Error in fetching order");
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderModel.find({ user: req.params.userid });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json("Could not fetch your order");
    console.log(error);
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await orderModel.findOneAndUpdate(
      req.params.orderId,
      req.body
    );
    res.status(200).json("Order Status Updated");
  } catch (error) {
    res.status(500).json("Error Occoured");
  }
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder };
