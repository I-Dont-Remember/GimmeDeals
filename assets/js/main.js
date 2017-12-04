/*
	Intensify by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/
var deals = {
	"1": {
		"day": "Thursday",
		"location": "Jordan's Pub",
		"desc": "Rock-n-Roll Bingo",
		"added": "12 / 2 / 17" },
	"2": {
		"day": "Wednesday",
		"location": "Red Rock",
		"desc": "$1 burgers",
		"added": "12 /3 / 17" },
	"3": {
		"day": "Monday",
		"location": "Chaser's",
		"desc": "Wings for $0.25 apiece",
		"added": "12 / 2 / 17" },
	"4": {
		"day": "Thursday",
		"location": "Whiskey Jacks",
		"desc": "Mixed drinks and beer $0.25",
		"added": "12 / 2 / 17" },
};

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
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
				for (key in deals) {
					var deal = deals[key];
					if (deal.day == day) {
						console.log(deal);
						table.append('<tr><td>' + deal.location +
									'</td><td>' + deal.desc +
									'</td><td>' + deal.added +
									'</td></tr>');
					}
				}
			});
	});

})(jQuery);
