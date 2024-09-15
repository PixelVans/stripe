const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

// Initialize the Stripe object with your secret key
const stripe = Stripe('sk_test_51Pz6WERoTuW6EzfZjwFKlUmITeYkGdUZvivuvJGYhgQrdkbpHf5d828JqDADSgUEqgQWdmZkkFxNdb5xt3yXavFi004Vt844yM'); // Test secret key


const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json



















// // Endpoint to create a payment intent
// app.post('/create-payment-intent', async (req, res) => {
//   const { amount } = req.body; // Amount should be passed in cents
  
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount, // Amount in cents (100 means $1)
//       currency: 'usd',
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

















app.post('/create-checkout-session', async (req, res) => {
    const { products } = req.body;
  
    // Map products to line items
    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
        //   images: [product.image],
        },
        unit_amount: product.price * 100, // Stripe uses cents
      },
      quantity: 1,
    }));
  
    try {
      // Create a checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success', // Replace with your success URL
        cancel_url: 'http://localhost:3000/failure', // Replace with your cancel URL
      });
  
      res.json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  































// Start server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



