var $form = $('#dealForm');
var $dropdown = $('#dropdown');
var $location = $('#location');
var $deal = $('#deal');
var $buttons = $('.dayButton');

var url = '/create'

$(document).ready(function() {

  $form.submit(function(event) {
    console.log('in form submit')
    var json_data = {
      'day': $dropdown.val(),
      'location': $location.val(),
      'deal': $deal.val()
    };
    console.log(json_data);
    $.ajax({
      type: 'POST',
      url: url,
      // JSON.stringify is a hack, why doesn't it work without it?
      data: JSON.stringify(json_data),
      contentType: "application/json"
    })
    .done(function() {
      console.log('Success!');
    })
    .fail(function() {
      console.log('failure');
    })
    .always(function() {
      $form[0].reset();
    });
    event.preventDefault();
  });

  $buttons.on('click', function() {
    day = $(this).text();
    window.location = '/' + day
  });

});
