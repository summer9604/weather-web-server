var express = require('express');
var path = require('path');
var app = express();
var hbs = require('hbs');
var geocode = require('./geocode.js');
var weathercode = require('./weathercode.js');

var port = process.env.PORT || 3000;

var geocodeUpdates = geocode.getWeatherUpdates;
var getWeather = weathercode.getWeather;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlears engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => res.render('index', { pageTitle: 'Fetch the weather!' }));

app.get('/about', (req, res) => res.render('about', { pageTitle: 'About' }));

app.get('/help', (req, res) => res.render('help', { pageTitle: 'Help' }));

app.get('/weather', (req, res) => {

    if (!req.query.address) return res.send({ error: 'Please, provide an address' });

    geocodeUpdates(req.query.address, (error, data) => {

        if(error || !data) return res.send({ error });
        
        getWeather(data, (error, { location, temperature, time }) => {

            return error ? res.send({ error }) : res.send({ location, temperature, time });
        });
    });
});

app.get('*', (req, res) => res.render('error', { error: 'Page not Found' }));

app.listen(port, () => console.log('Server running on port 3000'));