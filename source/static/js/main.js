// Main JS
function formatDate(date) {
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	return monthNames[monthIndex] + ' ' + day + ' ' + year;
}

function initializeSite() {

	"use strict";

	//OUTLINE DIMENSION AND CENTER
	(function() {
	    function centerInit(){

			var sphereContent = $('.sphere'),
				sphereHeight = sphereContent.height(),
				parentHeight = $(window).height(),
				topMargin = (parentHeight - sphereHeight) / 2;

			sphereContent.css({
				"margin-top" : topMargin+"px"
			});

			var heroContent = $('.hero'),
				heroHeight = heroContent.height(),
				heroTopMargin = (parentHeight - heroHeight) / 2;

			heroContent.css({
				"margin-top" : heroTopMargin+"px"
			});

	    }

	    $(document).ready(centerInit);
		$(window).resize(centerInit);
	})();

	// Init effect 
	$('#scene').parallax();

};

$(window).load(function () {
	$('.preloader').fadeOut('slow');
});

$(window).load(function(){

	initializeSite();
	(function() {
		setTimeout(function(){window.scrollTo(0,0);},0);
	})();

});

$(document).ready(function() {
    // Get the current date
    var now = new Date();

    // Create a target date for market opening at 9:15 AM
	var targetDate;

	var marketOpen = new Date();
	marketOpen.setHours(9);
	marketOpen.setMinutes(15);
	marketOpen.setSeconds(0);

	var marketClose = new Date();
	marketClose.setHours(15);
	marketClose.setMinutes(30);
	marketClose.setSeconds(0);

	
	// Market Countdown on Landing Page
	if (now.getHours() < 9 || (now.getHours() === 15 && now.getMinutes() > 30) || now.getHours() > 15) {
		// Post Market Hours
		marketOpen.setDate(marketOpen.getDate() + 1);
		targetDate = marketOpen
	}
	else if ((now.getHours() === 9 && now.getMinutes() < 15)) {
		// Pre Market Hours
		marketOpen.setDate(marketOpen.getDate())
		targetDate = marketOpen
	}
	else if ((now.getHours() > 9 && now.getHours() < 15) || (now.getHours() === 9 && now.getMinutes() >= 15) || (now.getHours() === 15 && now.getMinutes() < 30)) {
		// During Market Hours
		marketClose.setDate(marketClose.getDate());
		targetDate = marketClose
	}
	else {
		// Year To Date
		var currentDate = new Date();
		var lastDateOfYear = new Date(currentDate.getFullYear(), 11, 31);
		targetDate = formatDate(lastDateOfYear);
	}

    // Pass the calculated target date to the countdown plugin
    $('#countdown').countdown({
		date: targetDate,
        render: function(data) {
            var el = $(this.el);
            el.empty()
                .append("<div>" + this.leadingZeros(data.days, 2) + " <span>days</span></div>")
                .append("<div>" + this.leadingZeros(data.hours, 2) + " <span>hrs</span></div>")
                .append("<div>" + this.leadingZeros(data.min, 2) + " <span>min</span></div>")
                .append("<div>" + this.leadingZeros(data.sec, 2) + " <span>sec</span></div>");
        }
    });
});