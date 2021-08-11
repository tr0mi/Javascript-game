var batPos = 0; // vertical position of bat relative to starting pos of 320px
var safe = false;
var puckLeft = 0;
var puckTop = 0;
var level = 1;
var touches = 0;
var devToggle = false;
var upToggle = false;
var downToggle = false;




bat.innerHTML = ("|");
puck.innerHTML = (".");


function batUp() {
    batPos = batPos + 2;
    bat.style.top = 320 + batPos + "px";
}
function batDown() {
    batPos = batPos - 2;
    bat.style.top = 320 + batPos + "px";
}


//////////////////////////////////////// Release Key ///////////////////////////////////////////////
document.addEventListener('keyup', function(event) {
    if(event.key == "ArrowUp") {	 
        upToggle = false;		
    }
    else if(event.key == "ArrowDown") {   
        downToggle = false;
    }
})
//////////////////////////////////////// Press Key ///////////////////////////////////////////////
document.addEventListener('keydown', function(event) {
    if(event.key == "ArrowUp" && batPos > -340) {	 
        // batPos = batPos - 10;
        // bat.style.top = 320 + batPos + "px";
        upToggle = true;		
    }
    else if(event.key == "ArrowDown" && batPos < 360) {   
        // batPos = batPos + 10;
        // bat.style.top = 320 + batPos + "px";
        downToggle = true;
    }
// dev info
    else if(event.key == "d" && devToggle == false) {
        touchInfo.style.opacity = "1";
        batInfo.style.opacity = "1";
        puckInfo.style.opacity = "1";
        safeInfo.style.opacity = "1";
        puckTopInfo.style.opacity = "1";
        speedInfo.style.opacity = "1";
        upInfo.style.opacity = "1";
        downInfo.style.opacity = "1";
        devToggle = true;
    }
    else if(event.key == "d" && devToggle == true) {
        touchInfo.style.opacity = "0";
        batInfo.style.opacity = "0";
        puckInfo.style.opacity = "0";
        safeInfo.style.opacity = "0";
        puckTopInfo.style.opacity = "0";
        speedInfo.style.opacity = "0";
        upInfo.style.opacity = "0";
        downInfo.style.opacity = "0";
        devToggle = false;
    }
})


//////////////////////////////////////////////// Game Loop //////////////////////////////////////////////////


var i = 0;  // i is current puckPos, x is previous puckPos, compare i and x for new puckPos
var x = -1;
var upAmount = 0; //vertical translation of puck
var puckInt = 0; // value to determine if puck within bat (puckTop to the nearest 10)
var speed = 5; // speed of puck



function myLoop() {         //  create a loop function
    setTimeout(function() {  

        puck.style.left = i + "px";
        puck.style.top = puckTop + 300 + "px";
        puckInt = Math.round(puckTop / 10) * 10;

        if (touches == 10) {
            level++;
            touches = 0;
            speed++;
        } else

        //////////////////////////////////////// Level Up ///////////////////////////////////////////////
        switch(level) {
            case 2: bgcolor.style.backgroundColor = "rgb(105, 112, 0)"; break;
            case 3: bgcolor.style.backgroundColor = "rgb(7, 0, 48)"; break;
            case 4: bgcolor.style.backgroundColor = "black"; break;
            case 5: bgcolor.style.backgroundColor = "azure"; levelInfo.style.color = "black"; break;
        }


        // if puck is within 100px radius of bat, safe = true

        if (batPos >= (puckInt - 50) && batPos <= (puckInt + 50)) {
            safe = true;
        } else {
            safe = false;
        }
        safeInfo.innerHTML = ("safe state: " + safe);
        batInfo.innerHTML = ("Bat position: " + batPos + "px");
        touchInfo.innerHTML = ("Touches: " + touches);
        levelInfo.innerHTML = ("Level: " + level);
        speedInfo.innerHTML = ("Speed: " + speed);
        upInfo.innerHTML = ("upToggle: " + upToggle);
        downInfo.innerHTML = ("downToggle: " + downToggle);
        var puckOnBat = puckInt - batPos;


        if (upToggle == true && batPos > -340) {
            batDown();
        } else {
            //clearInterval(upInt);
        }
        if (downToggle == true && batPos < 360) {
            batUp();
        } else {
            //clearInterval();
        }

        // if travelling right
        switch(i > x && i < 1380) {  
            case true: if (puckInt > 400 || puckInt < -380) { // if collide with top/bottom border
                            upAmount = upAmount * -1; x = i; i = i + speed; puckTop = puckTop + upAmount; myLoop(); puckInfo.innerHTML = (i + " puckLeft"); puckTopInfo.innerHTML = (puckInt + " puckTop"); break;
                        } else { // standard travel right
                            x = i; i = i + speed; puckTop = puckTop + upAmount; myLoop(); puckInfo.innerHTML = (i + " puckLeft"); puckTopInfo.innerHTML = (puckInt + " puckTop"); break;
                        }
        // if travelling left or at right-hand border
            case false: if (safe == true && i <= 0) { // if collide with bat
                            x = i; i = i + speed; puckTop = puckTop + upAmount; myLoop(); puckInfo.innerHTML = (i + " puckLeft"); puckTopInfo.innerHTML = (puckInt + " puckTop");
                            switch(true) { // set new vertical translation
                                case puckOnBat >= -50 && puckOnBat <= -40: upAmount = -1; touches++; break;
                                case puckOnBat > -40 && puckOnBat <= -30: upAmount = -0.8; touches++; break;
                                case puckOnBat > -30 && puckOnBat <= -20: upAmount = -0.6; touches++; break;
                                case puckOnBat > -20 && puckOnBat <= -10: upAmount = -0.4; touches++; break;
                                case puckOnBat > -10 && puckOnBat < 0: upAmount = -0.2; touches++; break;
                                case puckOnBat == 0: upAmount = 0.1; touches++; break;
                                case puckOnBat > 0 && puckOnBat <= 10: upAmount = 0.2; touches++; break;
                                case puckOnBat > 10 && puckOnBat <= 20: upAmount = 0.4; touches++; break;
                                case puckOnBat > 20 && puckOnBat <= 30: upAmount = 0.6; touches++; break;
                                case puckOnBat > 30 && puckOnBat <= 40: upAmount = 0.8; touches++; break;
                                case puckOnBat > 40 && puckOnBat <= 50: upAmount = 1; touches++; break;
                            } 
                        }
                        else if(puckInt > 400 || puckInt < -380) { // if collide with top/bottom border
                            upAmount = upAmount * -1; puckTop = puckTop + upAmount; x = i; i = i - speed; myLoop(); puckInfo.innerHTML = (i + " puckLeft"); puckTopInfo.innerHTML = (puckInt + " puckTop"); break;
                        }
                        else { // standard travel left
                            puckTop = puckTop + upAmount; x = i; i = i - speed; myLoop(); puckInfo.innerHTML = (i + " puckLeft"); puckTopInfo.innerHTML = (puckInt + " puckTop"); break;
                        }
        }
        if (i < -50) {
            alert("GAMEOVER! You made it to Level " + level);
        }
        else {
        }
        
    }, 5)
}

myLoop();