const express = require("express")
const { createOrder, getMyOrders, getAllActiveOrders, updateOrder, getAllOrder } = require("../Controllers/order")
const { verifyToken } = require("../Middleware/auth")
const { getAllRatings } = require("../Controllers/Ratings")

const router = express.Router()


router.post("/", verifyToken,   createOrder )
router.get("/myorders", verifyToken,   getMyOrders )
router.get("/active", verifyToken,   getAllActiveOrders )
router.get("/", getAllOrder)
router.patch("/:id", verifyToken,   updateOrder )
router.get("/rating",    getAllRatings )





module.exports= {router}