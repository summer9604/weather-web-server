var express = require('express');
var path = require('path');
var app = express();
var hbs = require('hbs');
var geocode = require('./geocode.js');
var weathercode = require('./weathercode.js');

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

app.get('', (req, res) => {
    res.render('index', { name: 'Ricardo', location: 'Mundo', temperature: 21 })
});

app.get('/about', (req, res) => {
    res.render('about', { name: 'Aimar', location: 'Porto', temperature: 21 });
});

app.get('/help', (req, res) => {
    res.render('help', { name: 'Cardozo', location: 'Lisboa', temperature: 24 });
});

app.get('/weather', (req, res) => { //PERCEBIDO!!   ONE PAGE MODE

    // if (!req.query.address) return res.render('error', { error: 'Please, provide an address' });
    if (!req.query.address) return res.send({ error: 'Please, provide an address' });
    
    geocodeUpdates(req.query.address, (error, data) => {
         
        // if (error) return res.render('error', {error});
        if (error) return res.send({error});   

        // if (data == undefined) return res.render('error', {error});
        if (data == undefined) return res.send({error});

        getWeather(data, (error, {location, temperature, time, short_code}) => {
            
            return error ? /*res.render('error', {error})*/res.send({error}) :
            //  res.render('weather', {location, temperature, time})
            res.send({location, temperature, time, short_code});
        });
    });
});

app.get('/weather/portugal', (req, res) => { 
    res.render('portugal', { name: 'Portugal', location: 'Tuga', temperature: 28 });
});

app.get('/help/*', (req, res) => {
    res.render('error', { error: 'Help article not found' })
});

app.get('*', (req, res) => {
    res.render('error', { error: 'Page not Found' })
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});