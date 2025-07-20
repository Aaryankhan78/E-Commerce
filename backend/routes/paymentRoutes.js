import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import Order from "../models/Order.js";

dotenv.config();

const router = express.Router();

const CASHFREE_BASE_URL = "https://sandbox.cashfree.com/pg";
const headers = {
  "Content-Type": "application/json",
  "x-api-version": "2022-09-01",
  "x-client-id": process.env.CASHFREE_APP_ID,
  "x-client-secret": process.env.CASHFREE_SECRET_KEY,
};

// @route   POST /api/payment/create-order
router.post("/create-order", async (req, res) => {
  try {
    const {
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      amount,
      cartItems,
    } = req.body;

    // Validate input
    if (!name || !email || !phone || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Create Cashfree Payment Link
    const linkPayload = {
      customer_details: {
        customer_id: email,
        customer_email: email,
        customer_phone: phone,
        customer_name: name,
      },
      link_amount: amount,
      link_currency: "INR",
      link_purpose: "E-Commerce Payment",
      link_notify: {
        send_sms: true,
        send_email: true,
      },
    };

    const { data } = await axios.post(
      `${CASHFREE_BASE_URL}/links`,
      linkPayload,
      { headers }
    );

    // ✅ Correct key: `link_url`
    const paymentLink = data?.link_url;
    if (!paymentLink) {
      return res.status(500).json({ error: "Payment link not returned by Cashfree", raw: data });
    }

    // Save Order to DB
    const order = new Order({
      name,
      email,
      phone,
      amount,
      cartItems,
      orderId: data.link_id,
      paymentLink,
    });

    await order.save();

    res.json({ payment_link: paymentLink });
  } catch (err) {
    console.error("❌ Payment API Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Payment creation failed",
      details: err.response?.data || err.message,
    });
  }
});

export default router;
