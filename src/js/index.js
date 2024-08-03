var clicks;

var app = {

    // Application Constructor
    app_constructor: function() {
        var object = this;
        object.initialize();
    },

    initialize: function() {
        if (document.getElementById('start') && document.getElementById('help')) {
            clicks = new Audio();
            clicks.src = 'assets/sounds/button.wav';
            document.getElementById('start').addEventListener('click', this.startGame);
            document.getElementById('help').addEventListener('click', this.help);
        }
    },

    startGame: async function() {
        clicks.play();
        await sleep(500);
        window.location = "main_game.html?start=true";
    },

    help: async function() {
        clicks.play();
        await sleep(500);
        window.location = "help.html";
    }
    
};

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// Add event listener to call app constructor when the window finishes loading
window.onload = function() {
    app.app_constructor();
};