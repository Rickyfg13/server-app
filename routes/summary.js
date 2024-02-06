const express = require("express");
const response = require("../helpers/response");
const summary = express.Router();

const {
  getUserByDay,
  getSumUser,
  getNewUserAndReturningByDay,
  getSumNewUserAndReturning,
  getBusyTime,
  getBusyDay,
  getSumAllData,
} = require("../controllers/summary");

/* A. Summary 
 1. User Yang aktif setiap Hari
 */
summary.route("").get(async (req, res) => {
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

summary.route("/busy-day").get(async (req, res) => {
  try {
    const result = await getBusyDay();
    response.success(result, "data fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

summary.route("/busy-time").get(async (req, res) => {
  try {
    const result = await getBusyTime();
    response.success(result, "data fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

summary.route("/sum-all-data").get(async (req, res) => {
  try {
    const result = await getSumAllData();
    response.success(result, "data fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

module.exports = summary;
