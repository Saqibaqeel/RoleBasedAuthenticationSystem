const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://www.hindustantimes.com/ht-img/img/2024/02/02/550x309/Tokyo_real_estate_1706165119787_1706860137374.jpg"

  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
