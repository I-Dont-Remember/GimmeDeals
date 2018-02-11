/*
	Intensify by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/
var dealsData;


(function($) {
	var apiUrl = "https://ayukpzvbmd.execute-api.us-east-2.amazonaws.com/prod/search";

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

				
	$(document).ready(function() {
		$.getJSON(apiUrl, function(data, status) {
			console.log("Data: " + data + "\nStatus: " + status);
			console.log(data[0]);
			dealsData = data;
		});
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly').scrolly({
				offset: function() {
					return $header.height();
				}
			});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});



			$('#deals-dropdown').on('change', function() {
				var table = $('#deals-table');
				var allRows = $('#deals-table tbody tr');
				var day = $(this).val();

				allRows.remove();
				var i;
				for (i = 0; i < dealsData.length; i++) {
					var deal = dealsData[i];
					if (deal.Day == day) {
						console.log(deal);
						table.append('<tr><td>' + deal.Location +
									'</td><td>' + deal.Deal +
									'</td></tr>');
					}
				}
			});
	});

})(jQuery);
