const stripe = require("stripe")(
  "sk_test_51PQ941HHkcsi40rJZBFV1EPksfiaLxZgBZm1nPc0s9Zw6dS36e90HE1LNr2pEGJDXo0YhoNJQcPbcdKqkKd3TZhl00NTeVWyAk"
);

const asyncHandler = require("express-async-handler");

const buyProduct = asyncHandler(async (req, res) => {
  const { name, price, imgSrc } = req.body;

  let lineItems = [
    {
      price_data: {
        currency: "USD",
        product_data: {
          name: name,
          images: [imgSrc],
        },
        unit_amount: price * 100,
      },
      quantity: 1,
    },
  ];

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/marketplace",
    cancel_url: "http://localhost:3000/marketplace",
  });

  res.send(
    JSON.stringify({
      url: stripeSession,
    })
  );
});

module.exports = {
  buyProduct,
};
