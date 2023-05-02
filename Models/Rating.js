const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RatingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  
  service: {
    type: String,
    required: true
  },
  date: {
    type: Date,
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

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = { Rating };