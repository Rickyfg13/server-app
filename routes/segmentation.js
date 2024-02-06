const express = require("express");
const response = require("../helpers/response");
const segmentation = express.Router();

const {
  getSegmentationByAge,
  getSegmentationByGender,
  getSegmentationByMerkHP,
  getSegmentationByDigitalInterest,
} = require("../controllers/segmentation");

segmentation.route("").get(async (req, res) => {
  try {
    const result = "Ding-dong segmentation - root";
    response.success(result, "data fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

// -- Segmentasi Age Group percentase
segmentation.route("/age-group-percentase").get(async (req, res) => {
  try {
    const result = await getSegmentationByAge();
    response.success(result, "Data fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

// --Segmentation Gender dalam persentase
segmentation.route("/gender-percentase").get(async (req, res) => {
  try {
    const result = await getSegmentationByGender();
    response.success(result, "Data fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

// --Segmentation Merk dalam persentase
segmentation.route("/merk-percentase").get(async (req, res) => {
  try {
    const result = await getSegmentationByMerkHP();
    response.success(result, "Data fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

// --Segmentation Digital Interest dalam persentase
segmentation.route("/digital-interest-percentase").get(async (req, res) => {
  try {
    const result = await getSegmentationByDigitalInterest();
    response.success(result, "Data fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

module.exports = segmentation;
