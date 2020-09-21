const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



app.get("/", function(req, res) {
  res.render("index", {weather: null, error: null});
})


app.post("/", function(req, res) {
  const city = req.body.cityName;
  const country = req.body.country;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&units=imperial&appid=5be9ba9e2229562e4a7488716c6356ad#";


  request(url, function (err, response, body){
    if(err) {
      res.render('index', {weather:null, error:'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if (weather.main == undefined) {
        res.render('index', {weather:null, error: 'Error, please try again'});
      } else {
        const temp = Math.round(weather.main.temp);
        const weatherIcon = weather.weather[0].icon;
        const iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        res.render("index", {weather: temp, icon: iconURL, error: null});
        console.log("body:", body)
      }
    }
  });
})



app.listen(process.env.PORT || 3000, function() {
  console.log("app is listening on port 3000");
})
