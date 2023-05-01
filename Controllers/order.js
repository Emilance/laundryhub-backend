const { Order } = require("../Models/Order")


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
    console.log(orderId)
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, {rating, feedback , orderStatus : "completed"})
        res.status(201).send(updatedOrder)
    } catch (error) {
        res.status(400).send(error)  
    }
}



module.exports = { createOrder, getAllOrder, updateOrder, getMyOrders, getAllActiveOrders}