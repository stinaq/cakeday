$(function(){

	var user = null;
	var $result = $('#result');
	var $form = $('#cakedayForm');
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
				

			}).error(function(){console.log("GAH")});
	}

	var displayDaysLeft = function() {
		$($result).empty();
		$($result).append(daysLeft);
	}

	var getUser = function(){
		user = $("#userName").val();
	}

	var createUserUrl = function(){
		userUrl = "http://www.reddit.com/user/" + user + 
			"/about.json?jsonp=?";
	}

	$($form).on("submit", function(event) {
		event.preventDefault();
		getUser();
		createUserUrl();

    	getDaysLeft();
  	});


});