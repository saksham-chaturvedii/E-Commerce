const { query } = require("express");
const express = require("express");
const router = require("express").Router();
const productModel = require("../models/products");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    const page = parseInt(req.query.page) || 1; // Paage Number to be displayed.
    const count = parseInt(req.query.count) || 10; // No. of items to be displayed on a page.
    const after = parseInt(req.query.after); // No. of items (rows) to be skipped while displaying all the products.
    let sql = {};
    if (after) {
      sql = { where: { id: { [Op.gt]: [{ after }] } } };
    } else {
      sql = { offset: count * (page - 1) };
    }

    console.log("...sql-> ", sql);
    const products = await productModel.findAll({
      ...sql,
      attributes: ["id", "title", "price", "description", "image"],
      limit: count,
    });
    res.status(200).send({ count: products.length, items: products });
  } catch (err) {
    console.warn(err);
    res.status(500).send({ error: err, message: `Invalid Request.` });
  }
});

module.exports = router;
