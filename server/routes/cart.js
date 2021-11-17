const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const Cart = require('../models/Cart');

// CREATE
router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart({ ...req.body, userId: req.user.id });
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/update', verifyToken, async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate({ userId: req.user.id }, {
      $set: req.body
    }, { new: true });
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// REMOVE - Product from array
router.put('/remove/:id', verifyToken, async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate({ userId: req.user.id }, {
      $pull: { products: { productId: req.params.id } }
    }, { new: true });
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete('/', verifyToken, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.status(200).json('Cart has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER CART
router.get('/', verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get('/all', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;