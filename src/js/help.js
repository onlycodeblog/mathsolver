
function initialize() {    
    clicks = new Audio();
    clicks.src = 'assets/sounds/button.wav';
    document.getElementById('main_menu').addEventListener('click', menu);
}

var menu = async function() {
    clicks.play();
    await sleep(500);
    window.location = "index.html";
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

window.onload = function() {
    initialize();
};