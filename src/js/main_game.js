var GameAreaWidth = window.outerWidth * 0.30; // setting the game area dimensions based on screen dimensions;
var GameAreaHeight = window.outerHeight * 0.85;
var coordinate_factor = 11.0; // use to align game elements
var maxValChangerConst = 2;   // use to increase the difficulty level of game
var mathOperationMap = {1: 'plus', 2: 'subtract', 3: 'multiply', 4: 'divide'};
var operatorsCount = 4;
var score = 0;   // current score
var final_score; // score after game is over
var answer = 0;  // answer provided by the player
var scoreText;
var displayText;
var clicks;


var mainState = {
    
    preload: function() {
        game.load.image('coin', 'assets/coin.svg');
        game.load.image('plus', 'assets/plus.svg');
        game.load.image('subtract', 'assets/subtract.svg');
        game.load.image('multiply', 'assets/multiply.svg');
        game.load.image('divide', 'assets/divide.svg');
        game.load.image('zero', 'assets/zero.svg');
        game.load.image('one', 'assets/one.svg');
        game.load.image('two', 'assets/two.svg');
        game.load.image('three', 'assets/three.svg');
        game.load.image('four', 'assets/four.svg');
        game.load.image('five', 'assets/five.svg');
        game.load.image('six', 'assets/six.svg');
        game.load.image('seven', 'assets/seven.svg');
        game.load.image('eight', 'assets/eight.svg');
        game.load.image('nine', 'assets/nine.svg');
        game.load.image('enter', 'assets/enter.svg');
        game.load.image('display', 'assets/display.svg');
        game.load.image('delete', 'assets/delete.svg');
        game.load.image('score_display', 'assets/score_display.svg');

        game.load.audio('click', 'assets/sounds/click.mp3');
        game.load.audio('delete', 'assets/sounds/delete.mp3');
        game.load.audio('enter', 'assets/sounds/coin_drop.mp3');
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        game.stage.backgroundColor = '#000000';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.createUI();
    },

    createUI: function(){
        var gameObjects = this.getGameAssetsHelper();
        var buttons= [];

        answer = 0;

        // Score Display
        var scoreDisplay =  game.add.sprite(0, 0, 'score_display');
        scoreDisplay.width = GameAreaWidth;
        scoreText = game.add.text(GameAreaWidth/coordinate_factor - 25, 5, "US $" + score.toString(), 
        {font: "25px Arial", fill: "#000000"});

        // Answer Display
        game.add.sprite(GameAreaWidth/coordinate_factor + (GameAreaWidth*0.09), 2*(GameAreaHeight/3) - 20, 'display');
        displayText = game.add.text(GameAreaWidth/coordinate_factor + (GameAreaWidth*0.65), 
            2*(GameAreaHeight/3) - 15, answer.toString(), {font: "25px Arial", fill: "#000000"});

        // Input Numerals Buttons
        game.add.button(GameAreaWidth/coordinate_factor + 1.0*(GameAreaWidth*0.07), 
        2*(GameAreaHeight/3) + (GameAreaHeight*0.028), 'zero', this.calculate, {key: 0});
        game.add.button(GameAreaWidth/coordinate_factor + 3.0*(GameAreaWidth*0.07), 
        2*(GameAreaHeight/3) + (GameAreaHeight*0.028), 'one', this.calculate, {key: 1});
        game.add.button(GameAreaWidth/coordinate_factor + 5.0*(GameAreaWidth*0.07), 
        2*(GameAreaHeight/3) + (GameAreaHeight*0.028), 'two', this.calculate, {key: 2});
        game.add.button(GameAreaWidth/coordinate_factor + 7.0*(GameAreaWidth*0.07), 
        2*(GameAreaHeight/3) + (GameAreaHeight*0.028), 'three', this.calculate, {key: 3});
        game.add.button(GameAreaWidth/coordinate_factor + 9.0*(GameAreaWidth*0.07), 
        2*(GameAreaHeight/3) + (GameAreaHeight*0.028), 'four', this.calculate, {key: 4});
        game.add.button(GameAreaWidth/coordinate_factor + 1.0*(GameAreaWidth*0.07), 
        2*(GameAreaHeight/3) + (GameAreaHeight*0.10), 'five', this.calculate, {key: 5});
        game.add.button(GameAreaWidth/coordinate_factor + 3.0*(GameAreaWidth*0.07), 
        2*(GameAreaHeight/3) + (GameAreaHeight*0.10), 'six', this.calculate, {key: 6});
        game.add.button(GameAreaWidth/coordinate_factor + 5.0*(GameAreaWidth*0.07), 
        2*(GameAreaHeight/3) + (GameAreaHeight*0.10), 'seven', this.calculate, {key: 7});
        game.add.button(GameAreaWidth/coordinate_factor + 7.0*(GameAreaWidth*0.07), 
        2*(GameAreaHeight/3) + (GameAreaHeight*0.10), 'eight', this.calculate, {key: 8});
        game.add.button(GameAreaWidth/coordinate_factor + 9.0*(GameAreaWidth*0.07), 
        2*(GameAreaHeight/3) + (GameAreaHeight*0.10), 'nine', this.calculate, {key: 9});


        // Binding keyboard keys to the game actions
        buttons[0] = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
        buttons[0].onDown.add(this.calculate, {key: 0});
        buttons[1] = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        buttons[1].onDown.add(this.calculate, {key: 1});
        buttons[2] = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        buttons[2].onDown.add(this.calculate, {key: 2});
        buttons[3] = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        buttons[3].onDown.add(this.calculate, {key: 3});
        buttons[4] = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        buttons[4].onDown.add(this.calculate, {key: 4});
        buttons[5] = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        buttons[5].onDown.add(this.calculate, {key: 5});
        buttons[6] = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
        buttons[6].onDown.add(this.calculate, {key: 6});
        buttons[7] = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
        buttons[7].onDown.add(this.calculate, {key: 7});
        buttons[8] = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
        buttons[8].onDown.add(this.calculate, {key: 8});
        buttons[9] = game.input.keyboard.addKey(Phaser.Keyboard.NINE);
        buttons[9].onDown.add(this.calculate, {key: 9});


        // Enter Button
        game.add.button(GameAreaWidth/coordinate_factor + (GameAreaWidth*0.175), 2*(GameAreaHeight/3) + (GameAreaHeight*0.22), 
        'enter', this.update_score, {first: gameObjects[0], second: gameObjects[1], operator_number: gameObjects[2]});
        buttons[10] =  game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        buttons[10].onDown.add(this.update_score, {first: gameObjects[0], second: gameObjects[1],
            operator_number: gameObjects[2]});


        // Delete Button
        game.add.button(GameAreaWidth/coordinate_factor + (GameAreaWidth*0.75), 2*(GameAreaHeight/3) - 20, 
        'delete', this.delete, this);
        buttons[11] =  game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        buttons[11].onDown.add(this.delete, this);


        // Sounds
        clicks = game.add.audio('click');
        clicks.volume = 1.5;
        deletes = game.add.audio('delete');
        deletes.volume = 0.5;
        enters = game.add.audio('enter');
        enters.volume = 0.5;
    },

    getCoin: function (x, y, speed, value) {
        this.coin = game.add.sprite(x, y, 'coin');
        game.physics.arcade.enable(this.coin);

        // Add ‘gravity’ to the coin to make it fall
        this.coin.body.gravity.y = speed;
        var coinValue = value;

        var textXCoord = 34 - (coinValue.toString().length - 1)*4;
        var textYCoord = 125;
        var text = game.add.text(textXCoord, textYCoord, coinValue, {font: "25px Arial", fill: "#FFFFFF"});
        
        this.coin.addChild(text);
        return coinValue;
    },

    getGameAssetsHelper: function() {
        var speed = 2.5;
        var maxCoinValue = 10;
        var coinFirstX = GameAreaWidth/coordinate_factor + GameAreaWidth*0.07;
        var mathOperatorX = GameAreaWidth/coordinate_factor + GameAreaWidth*0.34;
        var coinSecondX = GameAreaWidth/coordinate_factor + GameAreaWidth*0.55;
        var coinY = 10;
        var mathOperatorY = 25;

        // Increases the difficulty level of game
        if (score >= 10 && score <= 30) {
            maxValChangerConst = 3;
        } else if (score >= 30 && score <= 60) {
            maxValChangerConst = 4;
        } else if (score > 60){
            maxValChangerConst = 5;
        }

        maxCoinValue = maxCoinValue*maxValChangerConst;
        var valueFirst = Math.floor(Math.random()*maxCoinValue);
        var valueSecond = Math.floor(Math.random()*maxCoinValue);
        
        if (valueFirst < valueSecond) {            // For non-negative subtraction
            valueFirst = valueFirst + valueSecond
            valueSecond = valueFirst - valueSecond;
            valueFirst = valueFirst - valueSecond;
        }
        
        var valueFirst = this.getCoin(coinFirstX, coinY, speed, valueFirst);
        var valueSecond = this.getCoin(coinSecondX, coinY, speed, valueSecond);
        var operator = this.getOperator(mathOperatorX, mathOperatorY, speed, valueFirst, valueSecond);
        return [valueFirst, valueSecond, operator];
    },

    getOperator: function (x, y, speed, valueFirst, valueSecond) {
        var operatorNumber = Math.floor(Math.random()*operatorsCount)+1;
        var iterator = 0;

        // For perfect Division ie. Division only by a factor
        while (((valueFirst >= 10 || valueSecond >= 10) && (operatorNumber == 3)) ||
        ((valueFirst % valueSecond != 0)  && operatorNumber == 4)) {
            iterator++;
            operatorNumber = Math.floor(Math.random() * operatorsCount) + 1;
            if (iterator > 5) {
                operatorNumber = 1;
                break;
            }
        }

        this.mathOperator = game.add.sprite(x, y, mathOperationMap[operatorNumber]);
        game.physics.arcade.enable(this.mathOperator);
        this.mathOperator.body.gravity.y = speed;
        return operatorNumber;
    },

    // This function is called as many times as the framework can execute it.
    // Default frame rate in Phaser games is usually set to 60 frames per second (fps)
    update: function() {
        // End the game if no answer is provided until 
        // coin was inside the gameplay window 
        // (adjust the window size using, GameAreaHeight * 0.30)
        if (this.coin && (this.coin.y < 0 || this.coin.y > GameAreaHeight * 0.30)) {
            answer = 0;
            window.location = "game_over.html?score="+score;
        }

    },

    calculate: function() {
        clicks.play();
        answer = 10*answer + this.key;
        var displayX = GameAreaWidth/coordinate_factor + GameAreaWidth*0.65 - (answer.toString().length - 1)*13;
        displayText.x = displayX;   // used to set the x-coordinate of displayText
        displayText.setText(answer.toString());
    },

    update_score: function() {
        enters.play();
        var result = false;

        if (this.operator_number == 1 && (this.first+this.second == answer)) {
            result = true;
        } else if (this.operator_number == 2 && (Math.abs(this.first-this.second) == answer)) {
            result = true;
        } else if (this.operator_number == 3 && (this.first*this.second == answer)) {
            result = true;
        } else if (this.operator_number == 4 && (this.first/this.second == answer)) {
            result = true;
        }

        if (result) {
            score += 1;
        } else {
            final_score = score;
            score = 0;
        }

        scoreText.setText("US $" + score.toString());
        answer = 0;

        if (score == 0) {
            window.location = "game_over.html?score="+final_score;
        }

        game.state.start('main');
    },

    delete: function () {
        answer = Math.floor(answer/10);
        var displayX = GameAreaWidth/coordinate_factor + GameAreaWidth*0.65 - (answer.toString().length - 1)*13  ;
        displayText.x = displayX;   // used to set the x-coordinate of displayText
        displayText.setText(answer.toString());
        deletes.play();
    }

};

var game = null;

// returns the value of input parameter 'parameter' in URL,
// window.location.search returns 'parameter part' of current url
function getQueryParam(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}

window.onload = function() {
    // Initialize game only if main_game.html has been loaded
    const startGame = getQueryParam('start') === 'true';
    if (startGame) {
        initializeGame();
    }
}


// All initialization code for the game
function initializeGame() {
        // Initialize Phaser, and create a GameAreaWidth px by GameAreaHeight px game view
        game = new Phaser.Game(GameAreaWidth, GameAreaHeight, Phaser.AUTO, 'game-container');
        
        // Add the 'mainState' and call it 'main'
        game.state.add('main', mainState);

        // Start the state to actually start the game
        game.state.start('main');
}
