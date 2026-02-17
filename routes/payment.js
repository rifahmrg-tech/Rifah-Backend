const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

// 1. Initialize Razorpay (Get these keys from your Razorpay Dashboard)
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "YOUR_TEST_KEY_ID",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "YOUR_TEST_KEY_SECRET",
});

// 2. Route to Create an Order
router.post("/orders", async (req, res) => {
    try {
        const { amount } = req.body; // Amount should be passed from frontend

        const options = {
            amount: amount * 100, // Razorpay takes amount in paise (₹1 = 100 paise)
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        };

        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

// 3. Route to Verify Payment (Success)
router.post("/verify", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Create the expected signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "YOUR_TEST_KEY_SECRET")
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Payment Success! Here you should save the subscription to your DB
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;