var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []

var userChosenColour

var level = 0;
var started = false

$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  play(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1)

});

$(document).keydown(function () {
  if (!started) {
    var level = 0
    $("#level-title").text("Level " + level)
    nextSequence()
    started = true
  }
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence()
      }, 1000);
    }
  } else {
    play("wrong")
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver()
  }
}

function nextSequence() {
  userClickedPattern = []
  level++
  $("#level-title").text("Level " + level)
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(e) {
  $("#" + e).addClass("pressed")
  setTimeout(() => {
    $("#" + e).removeClass("pressed")
  }, 100);
}

function play(name) {
  var audio = new Audio('sounds/' + name + ".mp3")
  audio.play()
}

function startOver() {
  level = 0
  gamePattern = 0
  started = false
}


