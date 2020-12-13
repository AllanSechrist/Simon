

userClickedPattern = [];
gamePattern = [];
buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

function nextSequence() {
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  console.log(gamePattern);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  $("#level-title").text("Level " + level);


}


$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.indexOf(userChosenColor));
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {

    $("#" + currentColor).removeClass("pressed");

  }, 100)

}

$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();

  }


}

function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  started = false;
}
