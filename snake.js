const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');





// --------------------------------
//          VARIABLES   
// --------------------------------

let isGameStarted = false;

// ----- Text messages
let message = "";
let gameOverMessage = "";
let pressEnter = "";
let gameTitle = "SNAKE"
let startMessage = 'Press "S" to start'
let score = 0;

// ----- Animation & movements
let speed = 7;
let xVelocity = 0;
let yVelocity = 0;

// ----- Positions 
let headX = 10;
let headY = 10;
let appleX = 5;
let appleY = 5;
let appleX2 = 15;
let appleY2 = 15;

// ----- Dev console
let borderCollision = "Ouch";
let snakeCollision = "ARrrrrg"

// ----- Snake Body
class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let tailLength = 2;
const snakeParts = [];

// ----- Game grid
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;





// --------------------------------
//          GAME LOOP  
// --------------------------------
function drawGame(){

    startScreen();
    if (gameTitle === "SNAKE" && startMessage === 'Press "S" to start') {
        return;
    }

    changeSnakePosition();

    let result = isGameOver();
    if (result) {
        return;
    }

    clearScreen();

    checkBorderCollision();
    checkSnakeCollision();
    checkAppleCollision();

    drawApple(); 
    // drawCircle()
    drawSnake();

    drawScore();

    setTimeout(drawGame, 1000 / speed);
}





// --------------------------------
//          FUNCTIONS LIB  
// --------------------------------

// ----- Canvas base design

function clearScreen(){
    ctx.fillStyle = '#68815c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ----- Score displaying

function drawScore(){
    ctx.font = "13px gameplayregular";
    ctx.textAlign = "right"; 
    ctx.fillText("Score : " + score, 19 * tileCount, 1.5 * tileCount);
}

// ----- Drawings

function drawSnake(){
    ctx.fillStyle = '#6C6E51'; //draw snake body parts
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = '#303121'; //draw snake head
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    
}

function drawApple() {
    ctx.fillStyle = '#303121';
    ctx.beginPath();
    void ctx.arc(appleX * tileCount + 10, appleY * tileCount + 10, tileSize / 2, 0, 2 * Math.PI);
    ctx.fill();
} 


// ----- Snake movement

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

// ----- Collisions checking

function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        console.log("You ate " + (tailLength - 2) + " apple(s)");
        return true;
    }
}

function checkBorderCollision() {
    if (headX === 20 || headY === 20 || headX === -1 || headY === -1) {
        console.log(borderCollision);
        return true;
    }
}

function checkSnakeCollision() {

    if (xVelocity === 0 && yVelocity === 0) {
        return false;
    }

    for (let i = 0; i < snakeParts.length; i++) {
        
        let part = snakeParts[i]; 

        if (part.x === headX  && part.y === headY) {
            console.log(snakeCollision);
            return true;
        }
    }

}

// ----- Game Over

function isGameOver() {
    let gameOver = false;

    if (yVelocity === 0 && xVelocity === 0) {
        return false;
      }

    let snakeBumped = checkSnakeCollision() 
    let borderBumped = checkBorderCollision() 

    if (snakeBumped === true || borderBumped === true) {
        console.log("isGameOver = true");
        gameOver = true;
    }

    if (gameOver) {
        gameOverMessage = "GAME OVER";
        pressEnter = "Press ENTER to restart";
        drawGameOverMessage();
    }

    return gameOver;
}

// ----- Reset, Start & Restart

function reStart() {
    let result = isGameOver();
    result = false;
    speed = 7;
    headX = 10;
    headY = 10;
    appleX = 5;
    appleY = 5;
    message = "";
    gameOverMessage = "";
    pressEnter = "";
    score = 0;
    speed = 7;
    tailLength = 2;
    snakeParts.splice(0,snakeParts.length)
    xVelocity = 0;
    yVelocity = 0;
    gameTitle = "";
    startMessage = "";
    drawGame();
    console.log("Restart reset executed");
}

// ----- Messages displaying

function startScreen() {
    if (gameTitle === "" && startMessage === '') {
        return;
    }

    clearScreen();
    console.log("Clear Screen OK");

    drawStartMessage();
    console.log("Start Message OK");

    return;
}

function drawStartMessage() {

    ctx.fillStyle = '#303121';
    ctx.font = "italic 50px gameplayregular";
    ctx.textAlign = "center"; 
    ctx.fillText(gameTitle, 200, 11 * tileCount); 

    ctx.font = "20px gameplayregular";
    ctx.fillText(startMessage, 200, 12.5 * tileCount);

    } 


function drawGameOverMessage() {
    ctx.font = "50px gameplayregular";
    ctx.textAlign = "center"; 
    ctx.fillText(gameOverMessage, 200, 11 * tileCount); 
    ctx.font = "20px gameplayregular";
    ctx.textAlign = "center"; 
    ctx.fillText(pressEnter, 200, 12.5 * tileCount); 
}

function drawMessage() {
    ctx.font = "50px gameplayregular";
    ctx.textAlign = "center"; 
    ctx.fillText(message, 200, 11 * tileCount);
}





// --------------------------------
//          GAME CONTROLS  
// --------------------------------

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    // up
    if(event.keyCode == 38) {
        if(yVelocity == 1){
            return;
        }
        xVelocity = 0;
        yVelocity = -1;
        message = "";
        gameTitle = "";
        startMessage = "";
    }

    // down
    if(event.keyCode == 40) {
        if(yVelocity == -1){
            return;
        }
        xVelocity = 0;
        yVelocity = 1;
        message = "";
        gameTitle = "";
        startMessage = "";        
    }

    // left
    if(event.keyCode == 37) {
        if(xVelocity == 1){
            return;
        }
        xVelocity = -1;
        yVelocity = 0;
        message = "";
        gameTitle = "";
        startMessage = "";        
    }

    // right
    if(event.keyCode == 39) {
        if(xVelocity == -1){
            return;
        }
        xVelocity = 1;
        yVelocity = 0;
        message = "";
        gameTitle = "";
        startMessage = "";
    }    

    // pause (space)
    if(event.keyCode == 32) {
        xVelocity = 0;
        yVelocity = 0;
        message = "PAUSE";
        gameTitle = "";
        startMessage = "";
    }  
   
    // reset (r) // dev tool
    if(event.keyCode == 82) {
        clearScreen();
        xVelocity = 0;
        yVelocity = 0;
        headX = 10;
        headY = 10;
        message = "RESET";   
        gameTitle = "";
        startMessage = "";     
    }    
    
    // restart (enter)
    while(gameOverMessage === "GAME OVER") { //security : "enter" can be pressed only while the game is over
        if(event.keyCode == 13) {
            console.log("enter pressed")
            reStart();
            return;
        }
    }

    // start (s)

    while(gameTitle === "SNAKE" && startMessage === 'Press "S" to start') { //security : "S" can be pressed only while the game is not started
        if(event.keyCode == 83) {
            console.log("S pressed");
            reStart();
            return;
        }
    }

} 





// --------------------------------
//          LAUNCH APP  
// --------------------------------

function gameLoading() { // to let the browser have the time to load the font
    ctx.fillStyle = '#68815c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#68815c'; // to use the font so the browser load it (invisible draw)
    ctx.font = "35px gameplayregular";
    ctx.textAlign = "center"; 
    ctx.fillText("GAME LOADING", 200, 5 * tileCount); 

    ctx.fillStyle = '#303121';
    ctx.font = "35px Helvetica Neue"; // to not have the default font
    ctx.textAlign = "center"; 
    ctx.fillText("GAME LOADING", 200, 11 * tileCount); 

    console.log("GAME LOADING");

    setTimeout(gameLoadOK, 3000);
    return;
}

function gameLoadOK() { // only to write on the console and call the final game loop function
    console.log("LOADED SUCCESSFULLY");
    drawGame();
}

gameLoading();

