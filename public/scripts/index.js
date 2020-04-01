$('h1').on('click', () => $('body').toggleClass('cenas'));

$('#photo').attr('src', 'https://www.abola.pt//img/fotos/ABOLA2015/NNH/jjbenfica.JPG');

$('form').on('submit', (e) => {

    e.preventDefault();

    var location = $('#input-address').val();

    $('#location').text('Loading...');
    $('#temperature').text('');
    $('#time').text('');
        
    fetch('/weather?address=' + location).then(response => {

        response.json().then(data => {
     
            if(data.error){
                console.log(data.error);
                $('#location').text(data.error);
            } else if (data.length == 0) {
                $('#location').text(data.error);
            } else {
                console.log(data);
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