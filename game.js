// // arrays
// var gamePattern=[];
// var buttonColours =["red","blue","green","yellow"];
// //empty array with the user clicked pattern
// var userClickedPattern=[];

// //jQuery to detect when buttons are clicked
// $(".btn").click(function(){
// userChosenColour=$(this).attr("id");
// userClickedPattern.push(userChosenColour);
// playSound(userChosenColour);
// animatePress(userChosenColour);
// });

// //step 7
// //You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
// var started = false;

// //2. Create a new variable called level and start at level 0.
// var level = 0;

// //1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
// $(document).keypress(function() {
//   if (!started) {

//     //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });

// // defined a function to return a number from 0 to 3
// function nextSequence(){

//   //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
//   level++;

//   //5. Inside nextSequence(), update the h1 with this change in the value of level.
//   $("#level-title").text("Level " + level);


//   var randomNumber=Math.floor(Math.random()*4);
//   var randomChosenColour = buttonColours[randomNumber];
//   gamePattern.push(randomChosenColour);
  
//   //to flash out
//   $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//   //to add an audio 
//  playSound(randomChosenColour);

//  animatePress(randomChosenColour);

// }
// //add sounds to button clicks
// function playSound(name){
//   var audio = new Audio("sounds/"+name+".mp3");
//   audio.play();
// };
// //Add Animations to USer Clicks
// function animatePress(currentColour){
// $("#"+currentColour).addClass("pressed");
// setTimeout(function() {
//   $("#"+currentColour).removeClass("pressed");
// }, 100);
// };

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//1. Create a new function called startOver().
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
