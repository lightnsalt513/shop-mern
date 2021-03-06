const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true},
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    sizes: [
      {
        name: {
          type: String
        },
        productId: {
          type: String
        }
      }
    ],
    price: { type: Number, required: true },
    inStock: { type: Boolean }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema );