const express = require("express");
const serverless = require("serverless-http");
const moment = require("moment");

const app = express();
const router = express.Router();

router.get("/get-date-time", (req, res) => {
  var datetime = new Date();
  var hours = datetime.getHours();
  var date = datetime.setDate(d.getDate())
  res.json({"hours": hours, "date": moment(date).format('YYYYMMDD')});
});

router.get("/get-last-seven-days", (req, res) => {
  let dates = [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return moment(d).format('YYYYMMDD')
  })
  res.json({"lastSevenDays": dates.reverse()});
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);