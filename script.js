window.addEventListener('load', function() {
    const breakIncrement = document.querySelector('#break-increment')
    const breakDecrement = document.querySelector('#break-decrement')
    const sessionIncrement = document.querySelector('#session-increment')
    const sessionDecrement = document.querySelector('#session-decrement')
    const breakDisplay = document.querySelector('#breakDisplay')
    const sessionDisplay = document.querySelector('#sessionDisplay')
    const resetButton = document.querySelector('#reset')
    const timeLeft = document.querySelector('#time-left')
    const timerButton = document.querySelector('#start_stop')
    const timerLabel = document.querySelector('#timer-label')

    let currentSession = parseInt(sessionDisplay.innerHTML)
    let currentBreakMinutes = parseInt(breakDisplay.innerHTML);
    let breakTime = currentBreakMinutes * 60;
    let currentMinutes = parseInt(sessionDisplay.innerHTML);
    let time = currentMinutes * 60;
    var paused = true;
    
    var breakCount = 0;
    let initialStart;
    let timer;
    let timerRunning = false;

    function playAudio() {
       var audio = document.getElementById('beep')
       audio.play()
  
    }
    

    function handleBreak() {
        
        console.log("current minutes = " + currentMinutes, "time = " + time, "breakTime = " + breakTime)
        breakCount = 1;
      
        if (breakTime > 0) {
            timerRunning = true;
            breakCount = 1;
            timerLabel.innerHTML = "Break Started"
            let minutes = Math.floor(breakTime / 60);
            let seconds = breakTime % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
       
        timeLeft.innerHTML = `${minutes}`+":"+`${seconds}`
        breakTime--;
        
        } else if (breakTime == 0) {
            
                let minutes = Math.floor(breakTime / 60);
                let seconds = breakTime % 60;
                seconds = seconds < 10 ? '0' + seconds : seconds;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                console.log("break over")
                clearInterval(timer);
                currentMinutes = parseInt(sessionDisplay.innerHTML);
                time = (currentMinutes * 60);
                timer = setInterval(countDown, 1000)
                paused = false;
                timeLeft.innerHTML = `${minutes}`+":"+`${seconds}`
                playAudio();
             
                }
            
        }
      
        
    
    function countDown() {
            console.log("current minutes = " + currentMinutes, "time = " + time, "breakTime = " + breakTime)
            breakCount = 0;
          
        if (time > 0) {
            timerRunning = true;
            timerLabel.innerHTML = "Session"
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        timeLeft.innerHTML = `${minutes}`+":"+`${seconds}`
        time--;
       
        
        } else if (time == 0) {
            
                clearInterval(timer);
                paused = false;
                let minutes = Math.floor(time / 60);
                let seconds = time % 60;
                seconds = seconds < 10 ? '0' + seconds : seconds;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                currentBreakMinutes = parseInt(breakDisplay.innerHTML);
                breakTime = (currentBreakMinutes * 60);
                timer = setInterval(handleBreak, 1000)
                timeLeft.innerHTML = `${minutes}`+":"+`${seconds}`
                playAudio();
                }
           
        }
        
     
    

function incrementBreak() {
    if (breakDisplay.textContent < 60 && timerRunning === false) {
        currentBreakMinutes++
        breakDisplay.textContent = currentBreakMinutes;
        breakTime = currentBreakMinutes * 60;
    }
}
function decrementBreak() {
    if (breakDisplay.textContent > 1 && timerRunning === false) {
   
    currentBreakMinutes--
    breakDisplay.textContent = currentBreakMinutes;
        breakTime = currentBreakMinutes * 60;
    
    } 
}
    function incrementSession() {
        
        if (sessionDisplay.textContent < 60 && timerRunning === false) {
             currentSession = parseInt(sessionDisplay.textContent);
        currentSession++;

        sessionDisplay.textContent = currentSession;
        currentMinutes = currentSession;
        currentMinutes = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes;
       timeLeft.innerHTML = currentMinutes+":00";
        time = currentSession * 60;
        } 
        
    }

    function decrementSession() {
        
        if (sessionDisplay.textContent > 1 && timerRunning === false) {
             currentSession = parseInt(sessionDisplay.textContent);
        currentSession--;
        
        sessionDisplay.textContent = currentSession;
        currentMinutes = currentSession;
        currentMinutes = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes;
       timeLeft.innerHTML = currentMinutes+":00";
        time = currentSession * 60;
        } 
        
    }
    
    function reset() {
        document.getElementById('beep').pause();
        document.getElementById('beep').currentTime = 0;

        timer = clearInterval(timer);
        timerRunning = false;
        paused = true;
        timerLabel.innerHTML = "Session"
        breakDisplay.textContent = 5;
        currentBreakMinutes = parseInt(breakDisplay.innerHTML);
        
        
        breakTime = currentBreakMinutes * 60;
        breakCount = 0;

        sessionDisplay.textContent = 25;
        currentSession = parseInt(sessionDisplay.innerHTML)
        currentMinutes = parseInt(sessionDisplay.innerHTML)
        timeLeft.innerHTML = "25:00"
        time = currentSession * 60;
        console.log("current minutes = " + currentMinutes, "time = " + time, "breakTime = " + breakTime)
    }

    function playPlause() {
    
        if (paused == true && breakCount == 0) {
            initialStart = setTimeout(countDown, 0)
            timer = setInterval(countDown, 1000)
            paused = false;
        }
        else if (paused == false && breakCount == 0) {
            initialStart = clearTimeout(initialStart)
            timer = clearInterval(timer)
            paused = true;
        }
        else if (paused == false && breakCount === 1) {
            timer = clearInterval(timer)
            paused = true;
        }
        else if (paused == true && breakCount === 1) {
            timer = setInterval(handleBreak, 1000)
            paused = false;
        }
        return

    }

    timerButton.addEventListener('click', function(event) {
        console.log(time)
        
        playPlause()
        if (time < 0 && breakTime < 0) {
            return
        }
    })

    resetButton.addEventListener('click', function(event) {
        reset();
    })
    breakIncrement.addEventListener('click', function(event) {
        incrementBreak()
    })
    breakDecrement.addEventListener('click', function(event) {
        
        decrementBreak();
    })
    sessionIncrement.addEventListener('click', function(event) {
        incrementSession();
    })
    sessionDecrement.addEventListener('click', function(event) {
      decrementSession();
    })
})
    


