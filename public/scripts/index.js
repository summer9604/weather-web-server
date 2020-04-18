var infoPlaceholders = [$('#location'), $('#temperature'), $('#time')];
var gif = 'https://media0.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif?cid=ecf05e4714223db933ff48ea74ac87d46eb0d627e56e685e&rid=giphy.gif';
var ptFlag = 'https://www.countryflags.io/pt/shiny/64.png';
var location = $('#input-address').val();;

$('form').on('submit', e => {

    e.preventDefault();

    loading();

    fetch('/weather?address=' + location).then(response => {

        clearTextBox();

        response.json().then(data => data.error || data.length == 0 ? renderError(data) : renderInfo(data))
            .catch(error => $('#location').text(error))
            .catch(error => $('#location').text(error));
    });
});

var loading = () => {
    $('#nation-flag').attr('src', gif);
    infoPlaceholders.forEach(info => info.text(''));
};

var clearTextBox = () => locationInput.val('');

var renderError = data => {
    $('#location').text(data.error);
    $('#nation-flag').attr('src', '');
};

var renderInfo = data => {
    $('#nation-flag').attr('src', ptFlag);
    $('#location').text(data.location);
    $('#temperature').text(data.temperature + 'ºC');
    $('#time').text(data.time);
};