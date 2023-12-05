const express = require('express');
const router = express.Router();
const products = require('../services/products');

router.get('/', async function(req, res, next) {
  try {
    res.json(await products.getAllProducts());
  } catch (err) {
    console.error(`Error while getting products`, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await products.createNewProduct(req.body));
  } catch (err) {
    console.error(`Error while creating product`, err.message);
    next(err);
  }
});

router.delete('/', async function(req, res, next) {
  try {
    res.json(await products.removeSelectedProducts(req.body.data));
  } catch (err) {
    console.error(`Error while deleting selected products`, err.message);
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    res.json(await products.getProduct(req.params.id));
  } catch (err) {
    console.error(`Error while getting product`, err.message);
    next(err);
  }
});

router.patch('/:id', async function(req, res, next) {
  try {
    res.json(await products.updateProduct(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating product`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await products.removeProduct(req.params.id));
  } catch (err) {
    console.error(`Error while deleting product`, err.message);
    next(err);
  }
});

module.exports = router;