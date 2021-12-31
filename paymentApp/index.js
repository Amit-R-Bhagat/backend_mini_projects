const express = require("express");
const Razorpay = require("razorpay");
const app = express();

const PORT = process.env.port || 3000;

// app.get("/", (req, res) => {
//   res.send("hi");
// });
app.use(express.static("./public"));
app.use(express.json());

app.post("/order", async (req, res) => {
  try {
    const amount = req.body.amount;

    let instance = new Razorpay({
      key_id: "rzp_test_FejWmqDtmuW3Pv",
      key_secret: "NgDeoCWwyXjjG1mHvXC9Skva",
    });

    const myOrder = await instance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt#1",
    });

    res.json({
      success: true,
      amount,
      order: myOrder,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
