$(function(){

	$(document).on("submit", '#cakedayForm', function(event) {
		event.preventDefault();
		var user = $("#userName").val();
		displayDaysLeft(user);
	});

	var displayDaysLeft = function(user) {
		user = $("#userName").val();
		var userUrl = "http://www.reddit.com/user/" + user + "/about.json?jsonp=?";

		$.getJSON(userUrl, function(data){
 	 		var createdDate = moment.unix(data.data.created);
			var daysLeft = caluclateDaysLeft(createdDate);
			$('#result').text(daysLeft);
		});
	};

	var caluclateDaysLeft = function(createdDate) {
		var currentYear = moment().format('YYYY');
		var nextCakeday = createdDate.year(currentYear);

		if(nextCakeday < moment()){
			nextCakeday = nextCakeday.add('years', 1)
		}
		return nextCakeday.diff(moment(), 'days');
	};
});