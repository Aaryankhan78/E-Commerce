import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { email, products, amount } = req.body;

    const order = new Order({ email, products, amount });
    await order.save();

    res.status(201).json({ message: "Order saved successfully", order });
  } catch (err) {
    res.status(500).json({ error: "Failed to save order" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
