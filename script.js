var batPos = 0; // vertical position of bat relative to starting pos of 320px
var safe = false;
var puckLeft = 0;
var puckTop = 0;
var level = 1;
var touches = 0;
var devToggle = false;



bat.innerHTML = ("|");
puck.innerHTML = (".");



//////////////////////////////////////// Up Arrow ///////////////////////////////////////////////
document.addEventListener('keydown', function(event) {
    if(event.key == "ArrowUp" && batPos > -340) {	 
        batPos = batPos - 10;
        bat.style.top = 320 + batPos + "px";		
    }
//////////////////////////////////////// Down Arrow ///////////////////////////////////////////////
    else if(event.key == "ArrowDown" && batPos < 360) {   
        batPos = batPos + 10;
        bat.style.top = 320 + batPos + "px";
    }
// dev info
    else if(event.key == "d" && devToggle == false) {
        touchInfo.style.opacity = "1";
        batInfo.style.opacity = "1";
        puckInfo.style.opacity = "1";
        safeInfo.style.opacity = "1";
        puckTopInfo.style.opacity = "1";
        speedInfo.style.opacity = "1";
        devToggle = true;
    }
    else if(event.key == "d" && devToggle == true) {
        touchInfo.style.opacity = "0";
        batInfo.style.opacity = "0";
        puckInfo.style.opacity = "0";
        safeInfo.style.opacity = "0";
        puckTopInfo.style.opacity = "0";
        speedInfo.style.opacity = "0";
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
                            switch(puckInt - batPos) { // set new vertical translation
                                case -50: upAmount = -1; touches++; break;
                                case -40: upAmount = -0.8; touches++; break;
                                case -30: upAmount = -0.6; touches++; break;
                                case -20: upAmount = -0.4; touches++; break;
                                case -10: upAmount = -0.2; touches++; break;
                                case 0: upAmount = 0.1; touches++; break;
                                case 10: upAmount = 0.2; touches++; break;
                                case 20: upAmount = 0.4; touches++; break;
                                case 30: upAmount = 0.6; touches++; break;
                                case 40: upAmount = 0.8; touches++; break;
                                case 50: upAmount = 1; touches++; break;
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