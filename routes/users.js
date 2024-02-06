const express = require("express");
const response = require("../helpers/response");
const users = express.Router();

const { getUserDetail } = require("../controllers/users");

users.route("").get(async (req, res) => {
  try {
    const result = "Ding-dong users - root";
    response.success(result, "data fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

users.route("/detail-user").get(async (req, res) => {
  try {
    const data = req.query.email;
    if (data == undefined) response.error("Email is required");
    const result = await getUserDetail(data);
    response.success(result, "data fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

module.exports = users;
