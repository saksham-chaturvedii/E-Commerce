const router = require("express").Router();
const path = require("path");

const stripe = require("stripe")(
  "sk_test_51J0S6WSA1T61xlcfEt25rFDQhudiiNECU9UhMJ6PQ8EkffluqVVC5VlA6zxaa5rjrFdcprsb59zJke9LApzLRdAu00qvoKzdJb"
); //Key required to start a Stripe session.

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/HTML/payment.html"));
});
router.post("/payment", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          amount: req.body.price * 100,
          currency: "inr",
          name: "Shopping",
          quantity: 1,
        },
      ],
      payment_method_types: ["card"],
      success_url: `${req.headers.origin}?success=true&sesion_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}?cancelled=true`,
    });
    res.redirect(303, session.url);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
module.exports = router;
