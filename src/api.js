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
	
  function parser(elem) {
	  let parsed = elem.toString().substring(0, 9);
	  
	  return parsed;
  }	
	
  const dates = [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d
  })
  const datesParsed = dates.map(parser);
  res.json(datesParsed);
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
