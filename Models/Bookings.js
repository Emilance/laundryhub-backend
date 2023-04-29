const mongoose = require('mongoose');
const Schema = mongoose.Schema

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  service: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
  },
  status: {
    type: String,
    default: "not Paid"
},
  paymentId: {
    type: String,
  }
},
{ timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Booking };