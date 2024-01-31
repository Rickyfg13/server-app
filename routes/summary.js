const express = require("express");
const response = require("../helpers/response");
const summary = express.Router();

const {
  getUserByDay,
  addProduct,
  getSumUser,
  getNewUserAndReturningByDay,
  getSumNewUserAndReturning,
} = require("../controllers/summary");

//Swagger get Product
/**
 * @swagger
 * /products:
 *   get:
 *     summary: product fetcher
 *     tags: [products]
 *     responses:
 *       200:
 *         description: product fetched
 *       403:
 *         description: failed to fetch product
 */

/* A. Summary 
 1. User Yang aktif setiap Hari
 */
summary.route("/").get(async (req, res) => {
  try {
    const result = "Ding-dong Summary - root";
    response.success(result, "data fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

// 2. User yang aktif secara Keseluruhan
summary.route("/user-aktif-by-day").get(async (req, res) => {
  try {
    const result = await getUserByDay();
    response.success(result, "user fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

summary.route("/sum-user").get(async (req, res) => {
  try {
    const result = await getSumUser();
    response.success(result, "user fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

summary.route("/new-user-and-returning-by-day").get(async (req, res) => {
  try {
    const result = await getNewUserAndReturningByDay();
    response.success(result, "data fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

summary.route("/sum-new-user-and-returning").get(async (req, res) => {
  try {
    const result = await getSumNewUserAndReturning();
    response.success(result, "data fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

summary.route("/").post(async (req, res) => {
  try {
    const result = await addProduct(req.body);
    response.success(result, "product created!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

module.exports = summary;
