$('h1').on('click', () => $('body').toggleClass('cenas'));

$('form').on('submit', (e) => {

    e.preventDefault();

    var location = $('#input-address').val();

    $('#location').text('');
    $('#temperature').text('');
    $('#time').text('');
    $('#nation-flag').attr('src', 'https://media0.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif?cid=ecf05e4714223db933ff48ea74ac87d46eb0d627e56e685e&rid=giphy.gif');
        
    fetch('/weather?address=' + location).then(response => {

        $('#input-address').val('');

        response.json().then(data => {
            if(data.error){
                console.log(data.error);
                $('#nation-flag').attr('src', '');
            } else if (data.length == 0) {
                $('#location').text(data.error);
                $('#nation-flag').attr('src', '');
            } else {
                $('#nation-flag').attr('src', 'https://www.countryflags.io/pt/shiny/64.png');
                $('#location').text(data.location);
                $('#temperature').text(data.temperature + 'ºC');
                $('#time').text(data.time);
            }
        }).catch((error) => {
            $('#location').text(error);
        });
    }).catch((error) => {
        $('#location').text(error);
    });
});