const { Order } = require("../Models/Order")
const { Rating } = require("../Models/ratings")
const { transporter } = require("../utils/nodemailer.config")


const createOrder = async (req, res) => {
 
    try {
        const newOrder =  await Order.create({
            user : req.user.user_id,
            booking : booking,
            service: service,
            time :  time ,
            amount : amount
             
        })

        res.status(201).status(newOrder)

    } catch (error) {
        res.status(400).send(error)
    }
}

const getAllOrder = async (req, res) => {
    try {
      const orders = await Order.find().populate('user', '-password').populate("booking");
      res.send(orders);
    } catch (error) {
      res.status(500).send(error);
    }
  };


const getMyOrders = async (req, res) => {
    try {
        const myOrders = await Order.find({user : req.user.user_id})
        if (myOrders) {
            res.status(200).send(myOrders)
        } else {
            res.status(404).send("You have No Order Open")
        }
    } catch (error) {
        res.status(400).send(error)

    }
}
const getAllActiveOrders = async (req, res) => {
    try {
        const myOrders = await Order.find({orderStatus : "active"})
        if (myOrders) {
            res.status(200).send(myOrders)
        } else {
            res.status(404).send("No order active order")
        }
    } catch (error) {
        res.status(400).send(error)

    }
}

const updateOrder = async (req, res ) =>{
    const orderId = req.params.id
    const {rating, feedback} = req.body
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, {rating, feedback , orderStatus : "completed"})
        
        const newRating = await Rating.create({
            rating, feedback, user : req.user.user_id,
            service : updatedOrder.service
        })
        const  review ={
            rating, feedback
        }
        const emailResp = await  sendEmail(review)
        res.status(201).send(updatedOrder)
    } catch (error) {
        res.status(400).send(error)  
    }
}


const sendEmail = async( review ) =>{
    try {
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: process.env.AUTH_EMAIL,
        subject: 'User leave a Review',
        html: ` <p> A laundryHub user just left a ${review.rating} star rating<p>
         <h3>Feedback : ${review.feedback} </h3>
  
        `
     }
     
     await transporter.sendMail(mailOptions);
     return {
        message: " review   email sent",
      }
    } catch (error) {
      console.log(error);
  
    }
  }
  

module.exports = { createOrder, getAllOrder, updateOrder, getMyOrders, getAllActiveOrders}