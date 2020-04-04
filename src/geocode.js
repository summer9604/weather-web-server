var request = require('request');

var getWeatherUpdates = (location, func) => {

    var urlGeocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(location) + '.json?access_token=pk.eyJ1Ijoic3VtbWVy' +
        'OTYwNCIsImEiOiJjazhhZHBlZTAwMWVvM21tajA3enIwaDU0In0.vL87W84wCLZY-fM5MlrNpw&language=pt';

    request({ url: urlGeocoding, json: true }, (error, response) => {

        if (error) return func('Location service not available', response);

        if (response.body.features[0] == undefined) return func('Location not found (' + location + ')', response);
        // TA A CAUSAR TUMULTOS! NEM TODOS TEM O SHORT CODE NO MESMO SITIO WTF -.-

        func(error, {
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0]['place_name']
        });
    });
};

module.exports.getWeatherUpdates = getWeatherUpdates;