const { Booking } = require("../Models/Bookings");
const { Order } = require("../Models/Order");
const { transporter } = require("../utils/nodemailer.config");

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
         const userDetails ={
          name, country, postalCode, service :description,
           addressLine1 , amount ,
         }
         const emailResp = await sendEmail( userDetails)
         res.send({url : session.url});
         
     } else {
         res.status(400).send("something went wrong")
    }
   
     
 } catch (error) {
   console.log(error)
     res.status(400).send(error)
 }
}

const sendEmail = async(userDetails) =>{
  try {
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: process.env.AUTH_EMAIL,
      subject: 'Laundryhub customer made Payment',
      html: ` <p>${userDetails.name} just made a payment for  ${userDetails.service}<p>
      <h3>Amount :${userDetails.amount} </h3>
      <h3>Address : ${userDetails.addressLine1} </h3>
      <h3>Postalcode : ${userDetails.postalCode} </h3>
      <h3>Country : ${userDetails.country} </h3>

      `
   }
   
   await transporter.sendMail(mailOptions);
   return {
      message: " Payment confirmation  email sent",
     }
  } catch (error) {
       console.log(error);

  }
}

module.exports = { makePayment };

