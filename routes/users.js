var express = require("express");
var router = express.Router();
const pool = require("../database/onlyPostgres");

/* GET users listing. */
router.get("/", function (req, res, next) {
  /** Wrong way of including clauses and attributes. Prone to SQL injection.
   *Avoid string concatenation
   *  pool.query('Select * from "User" where id={req.query.id}', (err, result) => {}
   *
   *
   *To handle sql injection,
   * pool.query('Select * from "User" where id=$1 and emai$2',[req.query.id, req.query.email] ,(err, result) => {}
   *
   */
  pool.query('Select * from "User"', (err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
