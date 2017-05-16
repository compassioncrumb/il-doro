$(document).ready(function() {
var stopTime = 0; 
var paused = false;

function getPomoDuration() {
  var pomoDuration = parseInt($("select").val())  * 60 * 1000;
  return pomoDuration; 
}

function getEndTime(timerDuration) {
  var endTime = Date.parse(new Date()) + timerDuration;
  return endTime; 
}
var timeObject;
$(".start").on('click', function () {
  clockMechanism();
} );

function clockMechanism(timer) {
  
  if (paused == false) {
    stopTime = getEndTime(getPomoDuration());
    // var pomoDurationMins = pomoDuration/1000/60;
    // $(".circle-text").text(pomoDurationMins); 
  } else {
    console.log("in: " + timeObject.total);
    stopTime = timeObject.total + Date.parse(new Date());
  }
    console.log("set: " + stopTime);
    var pomoDuration = getPomoDuration();
  
    $(".pause").removeClass("hide");
    $(".clear").removeClass("hide");
    $(".start").addClass("hide");
    $(".set-length").addClass("hide");
  
  //updates clock values and visual display
   var interval = setInterval(function() {
     timeObject = updateClock(stopTime);
     updateTimerDisplay(timeObject.minutes, timeObject.seconds); 
     updateVisualDisplay(pomoDuration, timeObject.total, timeObject.minutes, timeObject.seconds);

     if(timeObject.total <= 0) {
       clearInterval(interval);
       paused = false;
       $(".clear").addClass("hide");
       $(".pause").addClass("hide");
       $(".set-length").removeClass("hide");
       $(".start").removeClass("hide");
       $(".t-box").css("background-color", "lighten(yellow< 10%)");
       timeObject = {};
     };
    
     //visualControl

    $(".pause").on('click', function () {
      clearInterval(interval);
      paused = true;
      $(".pause").addClass("hide");
      $(".start").removeClass("hide");
    });

    $(".clear").on('click', function () {
       clearInterval(interval);
       paused = false;
       $(".clear").addClass("hide");
       $(".pause").addClass("hide");
       $(".set-length").removeClass("hide");
       $(".start").removeClass("hide");
       $(".t-box").css("background-color", "purple");
       $(".circle").css("margin-top", "0px");
       timeObject = {};
    });                           
   },1000);
  
     /// pretty much, everything here needs to be defined

      
//    $(".clear").on('click', function () {
//      clearInterval(interval);
//      resetPauseTime();
//      resetTimerDisplay();
//      resetVisualDisplay(); 
//    }); 
};
               
function updateClock(time) {             
  var t = time - Date.parse(new Date());
  console.log("time remaining: " + t);
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60 );
  
  console.log ( {
    'total': t,
    'minutes': minutes,
    'seconds': seconds,
  } );
  
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds,
  };
};

$(".update").on('click', function() {
  var deadline = updateClock(stopTime);
  var mins = deadline.minutes;
  var secs = deadline.seconds;
  updateTimerDisplay(mins, secs);
  return null;
});

function updateTimerDisplay(mins, secs) {
  $(".minutes").text("M: " + mins);
  $(".seconds").text("S: " + secs);
}

function updateVisualDisplay(end, total, mins, secs) {
  var totalPadding = parseInt($(".t-box").css("padding-top") + $(".t-box").css("padding-bottom"));
  var height = parseInt($(".t-box").css("height")) - totalPadding; 
  var circleDiameter = parseInt($(".circle").css("width"));
  var timeLength = height - circleDiameter;
  var liveMarginVal = Math.round( ( (end-total)/end ) * timeLength * 100) / 100; 
   $(".circle").css("margin-top", liveMarginVal);
  if ( mins <= 0) {
    $(".circle-text").text(":" + secs);
    $(".t-box").css("background-color", "#F87C4D");
  } else {
    $(".circle-text").text(mins);
    $(".t-box").css("background-color", "purple");
  }
  console.log(liveMarginVal);
}
  
});