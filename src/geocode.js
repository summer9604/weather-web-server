var request = require('request');

var getWeatherUpdates = (location, func) => {

    var urlGeocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(location) + '.json?access_token=pk.eyJ1Ijoic3VtbWVy' +
        'OTYwNCIsImEiOiJjazhhZHBlZTAwMWVvM21tajA3enIwaDU0In0.vL87W84wCLZY-fM5MlrNpw&language=pt';

    request({ url: urlGeocoding, json: true }, (error, response) => {

        var info = response.body.features[0];

        if (error) return func('Location service not available', response);

        if (!info) return func('Location not found (' + location + ')', response);

        var shortCode;

        if (info['place_type'][0] == 'country') {
            shortCode = info.properties['short_code'];
        } else {
            info.context.forEach(element => {
                if (element['short_code']) {
                    shortCode = element['short_code'];
                    return
                }
            })
        }

        shortCode = shortCode.substring(0, 2);

        func(error, {
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0]['place_name'],
            shortCode
        });
    });
};

module.exports.getWeatherUpdates = getWeatherUpdates;