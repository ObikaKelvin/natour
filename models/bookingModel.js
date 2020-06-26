const mongoose = require('mongoose');
// const Tour = require('./tourModel');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must have a tour!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user!']
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a price!']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  },
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

bookingSchema.pre(/^find/, function(next){
  this.populate('user').populate({
    path: 'tour',
    select: 'name'
  });

  next()
});

// bookingSchema.virtual('users', {
//   ref: "User",
//   foreignField: '_id',
//   localField: 'user'  
// });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
