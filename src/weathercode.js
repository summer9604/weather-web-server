var request = require('request');

var getWeather = ({latitude, longitude, location, short_code}, func) => {

    var urlWeather = 'https://api.darksky.net/forecast/e0d668365d3b49a1d1499499c9b122ff/' +
        latitude + ',' + longitude + '?units=si&lang=pt';

    request({ url: urlWeather, json: true }, (error, response) => {

        if (error) return func('Weather service not available', response);

        var info = {
            location: location,
            time: new Date(response.body.currently.time * 1000).toUTCString(),
            temperature: response.body.currently.temperature,
            short_code: short_code
        };

        func(error, info);
    });
};

module.exports.getWeather = getWeather;