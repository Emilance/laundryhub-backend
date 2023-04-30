const { Booking } = require("../Models/Bookings");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const makePayment = async (req, res) => {
  const { name, addressLine1, city, postalCode, state, country, description, amount, Id } = req.body;

 try {
     const session = await stripe.checkout.sessions.create({
       line_items: [
         {
           price_data: {
             currency: 'usd',
             product_data: {
               name: description,
             },
             unit_amount: amount * 100,
           },
           quantity: 1,
         },
       ],
       mode: 'payment',
       success_url: `${process.env.CLIENT_URL}/payment-success`,
       cancel_url: `${process.env.CLIENT_URL}/myschedules`,
     });
     
     await Booking.findByIdAndUpdate(Id, { status:"Paid"})
     res.send({url : session.url});
   
     
 } catch (error) {
     res.status(400).send(error)
 }
}
module.exports = { makePayment };

// try {
//   // Create a customer
//   const customer = await stripe.customers.create({
//     email: req.user.email,
//     name,
//     source:req.body.stripeToken,
//     address: {
//       line1: addressLine1,
//       city,
//       postal_code: postalCode,
//       state,
//       country
//     }
//   });

//   // // Add a payment source to the customer
//   // const card = await stripe.customers.createSource(customer.id, { source: stripeToken });

//   // Charge the customer
//   const charge = await stripe.charges.create({
//     amount,
//     description,
//     currency: "USD",
//     customer: customer.id,
//   });

//   console.log(charge);
//   res.send("Success");

// } catch (error) {
//   console.log(error);
//   res.status(400).send(error);
// }