import razorpayInstance from "../config/razorpay.js";

const createOrder = async () => {
  const { amount, currency } = req.body;

  try {
    const options = {
      amount: amount * 100, // Convert amount to smallest currency unit
      currency: currency || "INR",
      // receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating RazorPay order");
  }
};

export { createOrder };
