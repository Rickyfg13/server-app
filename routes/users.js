const express = require("express");
const response = require("../helpers/response");
const user = express.Router();

const {} = require("../controllers/users");

user.route("").get(async (req, res) => {
  try {
    const result = "Ding-dong users - root";
    response.success(result, "data fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

module.exports = user;
