const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

router.get("/get-date-time", (req, res) => {
  var datetime = new Date();
  var hours = datetime.getHours();
  var date = datetime.getFullYear()+''+(datetime.getMonth()+1)+''+datetime.getDate();
  res.json({"hours": hours, "date": date});
});

router.get("/get-last-seven-days", (req, res) => {
  const dates = [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate((d.getFullYear() - i) + (d.getMonth - i) + (d.getDay - i))
    return d
  })
  res.json(dates);
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
