const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  booking: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Booking'
  },
  service: {
    type: String,
    required: true
  },
  date: {
    type: Date,
  },
  amount :{
      type: Number
  },
  paymentId: {
    type: String,
  },
  orderStatus :{
      type :String, 
      default: "active"
  },
  feedback:{
    type:String
  },
  rating : {
    type:Number
  }
},
{ timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = { Order };