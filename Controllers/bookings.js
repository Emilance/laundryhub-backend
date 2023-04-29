const {Booking}  = require("../Models/Bookings");


 const createBooking = async (req, res) => {
   const { service, date, time  } =  req.body
   if(!service | !date | !time ) {
     res.status(400).send(" input all required details")
   }else{

     try {
       const newBooking = await Booking.create({
          service,
          date,
          time,
          user:  req.user.user_id
       });
       console.log(newBooking)
       res.status(201).json(newBooking);
     } catch (error) {
       res.status(400).send(error);
     }
   }
}

// Get all bookings for a 
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', '-password');
    res.send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all bookings for a user
 const getBookings = async (req, res) => {
   const userId = req.user.user_id
  try {
    const bookings = await Booking.find({ user: userId }).populate('user', '-password');
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a booking
 const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.bookingsId, req.body, { new: true });
    if (!booking) {
      res.status(404).send('no booking found')
    }else {
      res.status(400).send(booking);

    }
  } catch (error) {
    res.status(400).send(error);
  }
}

// Delete a booking
 const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.bookingsId);
    if(!booking) {
      res.status(404).send("no booking found")
    }else{
      res.status(200).send(booking);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}


module.exports = { createBooking, getBookings, updateBooking, deleteBooking, getAllBookings}