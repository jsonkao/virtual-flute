/* Canvas */
var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    W,H,
    key = [];
canvas.tabIndex = 0;
canvas.width = W = 300;
canvas.height = H = 240;
canvas.style.position = "relative";
canvas.style.left = "40%";
canvas.style.border = '1px solid #1abc9c';
ctx.font = 'normal 48px Open Sans';
ctx.textBaseline = 'top';
ctx.textAlign = 'center';
document.body.appendChild(canvas);
canvas.focus();
document.body.onmouseover = function(){
    canvas.focus();
}

var playing = []

/* 'keydown' and 'keyup' events */
canvas.onkeydown = canvas.onkeyup = function(e) {
    var e = e || event;
    key[e.keyCode] = e.type == 'keydown';
    if (e.type == 'keyup') {
        for (var x in playing) {
            pauseAudio(playing[x]);
        }
    }
};  

/* Play/Pause Audio  */
function playAudio(audio) { 
    if (!(playing[0] == audio)) {
        playing.push(audio);
    }
    for (var x in playing){
        if (playing[x] != audio) {
            pauseAudio(playing[x]);
        }
    }
    document.getElementById(audio).play(); 
    
} 
function pauseAudio(audio) {
    document.getElementById(audio).pause();
}   

/* Images */

/* innerHTML */
(function loop(){
    ctx.clearRect(0,0,W,H);
    var y = 0, l = key.length, i, t;
    for (i = 0; i < l; i ++) {
        function keyFingering(n) {
            /* elem's in n must be in the same order as keys in keys */
            var keys = {
                70:'key[70]', // left1 (F, 70) 
                68:'key[68]', // left2 (D, 68) 
                83:'key[83]', // left3 (S, 83) 
                65:'key[65]', // Ab key (A, 65) 
                74:'key[74]', // right1 (J, 74) 
                75:'key[75]', // right2 (K, 75) 
                76:'key[76]', // right3 (L, 76) 
                59: 'key[59]' // Eb key (;, 59) 
            }
            var output = '';
            for (var x in n) {
                output += keys[n[x]] + '&&'
            }
            return eval(output + 'true') && true;
        }
        var thumb = key[i] && i == 32;
        /* notes */
        if (thumb&&keyFingering([68,83,74,75,76])) { 
            t = 'm-D';
            playAudio(t);
            ctx.fillText(t,50,10);
        } else if (thumb&&keyFingering([70,68,83,74,75])) { 
            t = 'm-E';
            playAudio(t);
            ctx.fillText(t,50,10);
        } else if (thumb&&keyFingering([70,68,83,74])) { 
            t = 'm-F';
            playAudio(t);
            ctx.fillText(t,50,10);
        } else if (thumb&&keyFingering([70,68,83,76])) { 
            t = 'm-F#Gb';
            ctx.fillText(t,50,10);
        } else if (thumb&&keyFingering([70,68,83,65])) { 
            t = 'm-G#/Ab';
            ctx.fillText(t,50,10);
        } else if (thumb&&keyFingering([70,68,83])) { 
            t = 'm-G';
            playAudio(t);
            ctx.fillText(t,50,10);
        } else if (thumb&&keyFingering([70,68])) { 
            t = 'm-A';
            playAudio(t);
            ctx.fillText(t,50,10);
        } else if (thumb&&keyFingering([70,74])) { 
            t = 'm-A#Bb';
            ctx.fillText(t,50,10);
        } else if (thumb&&keyFingering([70])) { 
            t = 'm-B';
            ctx.fillText(t,50,10);
        }
    }
    setTimeout(loop,1000/24);
})();
