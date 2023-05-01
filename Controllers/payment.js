const { Booking } = require("../Models/Bookings");
const { Order } = require("../Models/Order");

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
     if(session){
         await Booking.findByIdAndUpdate(Id, { status:"Paid"})
         await Order.create({
             booking : Id,
             user :req.user.user_id,
             paymentId: session.id,
             service :description,
             amount,
         })
         res.send({url : session.url});
         
     } else {
         res.status(400).send("something went wrong")
    }
   
     
 } catch (error) {
   console.log(error)
     res.status(400).send(error)
 }
}
module.exports = { makePayment };

