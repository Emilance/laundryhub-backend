const {Booking}  = require("../Models/Bookings");
const {transporter} = require("../utils/nodemailer.config")

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
       const emailParam = {
         email :req.user.email,
         Id : req.user.user_id,
         newBooking
       }
       const sentEmail = await sendEmail(emailParam)
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


const sendEmail = async({email, Id, newBooking}) =>{
  try {
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Thank you For Scheduling',
      html: ` <p> You have just successfully add a new service to your schedules<p>
        <p>below are the details<p>
        <h3> service : ${newBooking.service} <h3>
        <h3> date : ${newBooking.date} <h3>
        <h3> time : ${newBooking.time} <h3>
        <p> Note : No service will be render without payment</p>
        <button> make Payment </button>  
      `
   }
   
   await transporter.sendMail(mailOptions);
   return {
      message: " Service booking confirmation  email sent",
      data: {
         userId: Id,
         email
      }}
  } catch (error) {
    res.status(500).send(error);

  }
}

module.exports = { createBooking, getBookings, updateBooking, deleteBooking, getAllBookings}