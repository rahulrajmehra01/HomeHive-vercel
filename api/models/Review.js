const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Property',
    },
  },
  {
    timestamps: true,
  }
);


const ReviewModel = mongoose.model('Review', reviewSchema);

module.exports = ReviewModel;
