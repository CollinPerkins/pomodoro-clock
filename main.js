$(document).ready(function (){
  var minutes;
  var seconds;
  var audio = new Audio('Loud-Alarm.mp3');
  var sessionTimer;
  var breakTimer;
  var startToggle = false;
  var sessionToggle = true;
  var start;
  var breakTime = 60 * 5;
  var sessionTime = 60 * 25;
  var selected = true;

  // Sets the Session Time countDown
  sessionTimer = new timer(sessionTime - 1);

  // Sets the Break Time countDown
  breakTimer = new timer(breakTime - 1);

  // Sets the view for Break, Time, and Session Times
  breakTimeUpdate();
  sessionTimeUpdate();
  timerUpdate();

  // Allows the time of Session or Break to be changed on Click
  $('.time').click(function () {
    console.log(this.id);
    if(this.id === 'sessionTime'){
      selected = true;
      $('#sessionTime').addClass('borderBox');
      $('#breakTime').removeClass('borderBox');
    } else {
      selected = false;
      $('#sessionTime').removeClass('borderBox');
      $('#breakTime').addClass('borderBox');
    }
  });

  $('#minus').click(function () {
    if(selected){
      if(sessionTime > 59){
        sessionTime -= 60;
      }
      sessionTimeUpdate();
      timerUpdate();
    } else {
      if(breakTime > 59){
        breakTime -= 60;
      }
      breakTimeUpdate();
      timerUpdate();
    }
    sessionTimer = new timer(sessionTime - 1);
    breakTimer = new timer(breakTime - 1);
  });

  $('#plus').click(function () {
      if(selected){
        sessionTime += 60;
        sessionTimeUpdate();
        timerUpdate();
      } else {
        breakTime += 60;
        breakTimeUpdate();
        timerUpdate();
      }
    sessionTimer = new timer(sessionTime - 1);
    breakTimer = new timer(breakTime - 1);
  });

  $('#start').click(function () {
    startPause(sessionToggle);
    $('#sessionTime').removeClass('borderBox');
    $('#breakTime').removeClass('borderBox');
  });

  function timerUpdate(){
    if(sessionToggle) {
      $('#timer').html(timeDisplay(sessionTime));
    } else {
      $('#timer').html(timeDisplay(breakTime));
    }
  }

  function breakTimeUpdate(){
    $('#breakTime').html(timeDisplay(breakTime));
  }

  function sessionTimeUpdate(){
    $('#sessionTime').html(timeDisplay(sessionTime));
  }

  function timeDisplay(time){
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    if(minutes < 10) {
      minutes = "0" + minutes;
    }
    if(seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  }

  function timer(time){
    // starts the clock countDown()
    this.start = function(){
      startToggle = true;
      started = setInterval(function(){
        $('#timer').html(countDown());
        if(time < 1) {
          time = 0;
          audio.play();
          if(sessionToggle){
            breakTimer = new timer(breakTime - 1);
            $('#timer').html(timeDisplay(breakTime));
          } else {
            sessionTimer = new timer(sessionTime - 1);
            $('#timer').html(timeDisplay(sessionTime));
          }
          $('#start').html('STOP BEEPER');
          clearInterval(started);
          sessionToggle = !sessionToggle;
        }
        time--;
      }, 1000);
    }

    // Pauses the countDown
    this.pause = function(){
      time = time;
      startToggle = false;
      audio.pause();
      clearInterval(started);
    }

    // Is the countDown
    function countDown(){
      minutes = Math.floor(time / 60);
      seconds = time - minutes * 60;
      if(minutes < 10) {
        minutes = "0" + minutes;
      }
      if(seconds < 10) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    }
  }

  function startPause(sessionToggle){
    if(startToggle){
      $('#minus').show();
      $('#plus').show();
      $('#start').html('Start');
      if(sessionToggle){
        sessionTimer.pause();
      } else {
        breakTimer.pause();
      }
    } else {
      $('#minus').hide();
      $('#plus').hide();
      $('#start').html('Pause');
      if(sessionToggle){
        sessionTimer.start();
      } else {
        breakTimer.start();
      }
    }
  }
})
