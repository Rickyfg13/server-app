const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// swagger;
const options = {
  definition: {
    swagger: "2.0",
    title: "Server API DOCS",
    openapi: "3.1.0",
    info: {
      title: "Server API DOCS",
      description: "SERVER API Documentation For gavut",
    },
    schemes: ["dev-sandbox"],
  },
  apis: ["./routers/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use(bodyParser.json());
app.use(cors());

//test
app.get("/", (req, res) => {
  res.send("API Ready To GO!");
});

const summary = require("./routes/summary");
const segmentation = require("./routes/segmentation");
// const transactions = require("./routers/transactions");

app.use("/summarys", summary);
app.use("/segmentation", segmentation);
// app.use("/transactions", transactions);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
