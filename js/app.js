$(function(){

	var $result = $('#result');
	var $message = $('#message');
	var $form = $('#cakedayForm');
	var $cakedayDate = $('#cakedayDate');
	var userUrl = null;
	var daysLeft = null;

	var getDaysLeft = function() {
		$.getJSON(userUrl,
			function(data){

				var createdDate = moment.unix(data.data.created);

				var currentYear = moment().format('YYYY');
				var nextCakeday = createdDate.year(currentYear);

				if(nextCakeday < moment()){
					nextCakeday = nextCakeday.add('years', 1)
				}

				daysLeft = nextCakeday.diff(moment(), 'days');
				console.log(daysLeft);

				displayDaysLeft();
				displayNextCakeday(nextCakeday);
			});
	}

	var displayNextCakeday = function(nextCakeday) {
		$($cakedayDate).text(nextCakeday.format("MMMM Do YYYY"));
	}

	var displayDaysLeft = function() {
		$($result).empty();
		$($result).text(daysLeft);
		displayMessage();
	}

	var displayMessage = function() {
		var message = null;
		if (daysLeft === 0) {
			message = 'Go post something funny now, and reap the benefits';
		} else if (daysLeft === 1) {
			message = "That's like, tomorrow. Better go find a cat to take pictures of";
		} else if (daysLeft < 5) {
			message = "Soon. Very soon";
		} else if (daysLeft < 15) {
			message = "It's creeping closer. No long now until you have spent a whole year on reddit";
		} else if (daysLeft > 363) {
			message = "Oh, man.. That has got to hurt. It was, like, yesterday";
		} else {
			message = " ";
		}

		$($message).text("days left");
		$($message).append("<br />");
		$($message).append(message);
	}

	var getUser = function(){
		return $("#userName").val();
	}

	var createUserUrl = function(userName){

		userUrl = "http://www.reddit.com/user/" + userName + 
			"/about.json?jsonp=?";
	}

	var noInput = function(){
		$($result).empty();

	}

	$($form).on("submit", function(event) {
		event.preventDefault();
		var userName = getUser();
		if(userName) {
			createUserUrl(userName);
    		getDaysLeft();
		} else {
			noInput();
		}

		
  	});


});
