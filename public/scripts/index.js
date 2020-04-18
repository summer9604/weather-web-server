var infoPlaceholders = [$('#location'), $('#temperature'), $('#time')];
var gif = 'https://media0.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif?cid=ecf05e4714223db933ff48ea74ac87d46eb0d627e56e685e&rid=giphy.gif';

$('form').on('submit', e => {

    e.preventDefault();

    var location = $('#input-address');

    loading();

    fetch('/weather?address=' + location.val()).then(response => {

        location.val('');

        response.json().then(data => data.error || data.length == 0 ? renderError(data) : renderInfo(data))
            .catch(error => $('#location').text(error))
            .catch(error => $('#location').text(error));
    });
});

var loading = () => {
    $('#nation-flag').attr('src', gif);
    infoPlaceholders.forEach(info => info.text(''));
};

var renderError = data => {
    $('#location').text(data.error);
    $('#nation-flag').attr('src', '');
};

var renderInfo = ({shortCode, location, temperature, time}) => {
    $('#nation-flag').attr('src', 'https://www.countryflags.io/' + shortCode + '/shiny/64.png');
    $('#location').text(location);
    $('#temperature').text(temperature + 'ºC');
    $('#time').text(time);
};