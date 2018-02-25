/*
	Intensify by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/
var dealsData;
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];


function dealsSearch() {
	var input;
	input = $("#searchInput");
	filter = input.val().toUpperCase();
	table = $("#deals-table");
	trs = $("tr");

	for (i=1; i < trs.length; i++) {
		if (trs[i].innerText.toUpperCase().indexOf(filter) > -1) {
			trs[i].style.display = "";
		} else {
			trs[i].style.display = "none";
		}
	}
}

function suggestedSearch() {
	var input;
	input = $("#searchSuggested");
	filter = input.val().toUpperCase();
	table = $("#suggested-deals-table");
	trs = $("tr");

	for (i=0; i < trs.length; i++) {
		if (trs[i].innerText.toUpperCase().indexOf(filter) > -1) {
			trs[i].style.display = "";
		} else {
			trs[i].style.display = "none";
		}
	}
}

function allSearch() {
	var input;
	input = $("#searchAll");
	filter = input.val().toUpperCase();
	table = $("#all-deals-table");
	trs = $("tr");

	for (i=0; i < trs.length; i++) {
		if (trs[i].innerText.toUpperCase().indexOf(filter) > -1) {
			trs[i].style.display = "";
		} else {
			trs[i].style.display = "none";
		}
	}
}

function fillTable($table, rows, hasDay) {
	rows.remove();
	var i;
	for (i = 0; i < dealsData.length; i++) {
		var deal = dealsData[i];
		var htmlString = '<tr><td>';
		if (hasDay) {
			htmlString += deal.Day + '</td><td>'
		} 
		htmlString += deal.Location + '</td><td>';
		htmlString += deal.Deal + '</td></tr>';
			$table.append(htmlString);
	}
};

function fillCurrentTable() {
	now = new Date();
	var table = $('#deals-table');
	var allRows = $('#deals-table tbody tr');
	var day = days[now.getDay()];

	allRows.remove();
	var i;
	for (i = 0; i < dealsData.length; i++) {
		var deal = dealsData[i];
		if (deal.Day == day) {
			table.append('<tr><td>' + deal.Location +
						'</td><td>' + deal.Deal +
						'</td></tr>');
		}
	}
};

function updateClock() {
	var now = new Date();
	var day = days[now.getDay()];
	var hour = now.getHours();
	var minutes = now.getMinutes();

	// Handle 12 hr format
	var timeSuffix = ( hour < 12) ? "AM": "PM";
	hour = hour % 12;

	// Make sure minutes has two digits
	minutes = (minutes < 10 ? "0": "") + minutes;

	var time = hour + " : " + minutes + " " + timeSuffix;
	$('#day').text(day);
	$('#clock').text(time);
};

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
			dealsData = data;
			allTable = $("#all-deals-table");
			allTableRows = $("#all-deals-table tbody tr");
			fillTable(allTable, allTableRows, true);
			fillCurrentTable();
		});

		var oneMinute = 60*1000;
		updateClock();
		setInterval(updateClock, oneMinute);
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

			

			// $window.on('load', function() {
			// 	allTable = $("#all-deals-table");
			// 	allTableRows = $("#all-deals-table tbody tr");
			// 	fillTable(allTable, allTableRows, true);
			// });

			$('#deals-dropdown').on('change', function() {
				var table = $('#deals-table');
				var allRows = $('#deals-table tbody tr');
				var day = $(this).val();

				allRows.remove();
				var i;
				for (i = 0; i < dealsData.length; i++) {
					var deal = dealsData[i];
					if (deal.Day == day) {
						table.append('<tr><td>' + deal.Location +
									'</td><td>' + deal.Deal +
									'</td></tr>');
					}
				}
			});
	});

})(jQuery);
