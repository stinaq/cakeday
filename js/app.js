$(function(){

  "use strict";

  var $result = $('#result');
  var $message = $('#message');
  var $form = $('#cakeday-form');
  var $cakedayDate = $('#cakeday-date');
  var $response = $('#response');
  var $userNameInput = $('#user-name-input');

  var gotInput = function(userName) {
    var userUrl = createUserUrl(userName);

    

    $.ajax({
      url: userUrl,
      dataType: "jsonp",
      timeout: 1000,
      success: function(data){

        var createdDate = moment.unix(data.data.created);
        var nextCakeday = calculateNextCakeday(createdDate);

        var daysLeft = nextCakeday.diff(moment(), 'days');

        emptyAllElements();
        displayNextCakeday(nextCakeday);
        displayDaysLeft(daysLeft);
        displayMessage(daysLeft);
      },
      error: function(){
        emptyAllElements();
        $($message).text("No. Could not find this one. Don't want to, either");
        $($message).after('<img src="css/img/cat.png" id="cat" />')
      }});
  };

  var calculateNextCakeday = function(createdDate){
    var currentYear = moment().format('YYYY');
    var nextCakeday = createdDate.year(currentYear);

    if(nextCakeday < moment()){
      nextCakeday = nextCakeday.add('years', 1)
    }
    return nextCakeday;
  }

  var displayNextCakeday = function(nextCakeday) {
    $($cakedayDate).text(nextCakeday.format("MMMM Do YYYY"));
  };

  var displayDaysLeft = function(daysLeft) {
    $($result).text(daysLeft);
  };

  var displayMessage = function(daysLeft) {
    var message = " ";

    var myList = [
      {max: 363, text: "Oh, man.. That has got to hurt. It was, like, yesterday"}, 
      {min: 15, text: "It's creeping closer. No long now until you have spent a whole year on reddit"},
      {min: 5, text: "Soon. Very soon"},
      {min: 2, text: "That's like, tomorrow. Better go find a cat to take pictures of"},
      {min: 1, text: "Go post something funny now, and reap the benefits"}
    ];

    $.each(myList, function (index, value) {
      if('max' in value && value.max < daysLeft) {
        message = value.text;
      } else if ('min' in value && value.min > daysLeft) {
        message = value.text;
      }

    });

    $($message).html("days left<br />" + message);
  };

  var createUserUrl = function(userName){
    return "http://www.reddit.com/user/" + userName + 
      "/about.json?jsonp=?";
  };

  var emptyAllElements = function(){
    $($cakedayDate).empty();
    $($message).empty();
    $($result).empty();
    $('#cat').remove();
    $($message).removeClass('colored-background');
  };

  var noInput = function(){
    emptyAllElements();
    $($message).html("You forgot to type a user name");
    $($message).addClass('colored-background');
  };

  $(document).on("submit", $form, function(event) {
    event.preventDefault();
    var userName = $userNameInput.val();

    if(userName) {
      gotInput(userName);
    } else {
      noInput();
    }

  });


});
