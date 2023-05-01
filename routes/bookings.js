const express = require("express")
const { getBookings, createBooking, updateBooking , deleteBooking,getAllBookings } = require("../Controllers/bookings")
const { verifyToken } = require("../Middleware/auth")

const router = express.Router()

router.post("/", verifyToken,  createBooking)
router.get("/",  getAllBookings)

router.get('/mybookings', verifyToken, getBookings)
router.patch('/:bookingsId',verifyToken, updateBooking)
router.delete('/:bookingsId',verifyToken, deleteBooking)


module.exports= {router}