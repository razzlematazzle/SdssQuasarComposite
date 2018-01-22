const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let url = `http://skyserver.sdss.org/dr12/SkyserverWS/SearchTools/SqlSearch?cmd=select%20top%2010%20ra,dec%20from%20Frame&format=json`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
    	let spectra = JSON.parse(body);
    	res.render('index', {weather: spectra, error: 'Error, please try again'});
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})